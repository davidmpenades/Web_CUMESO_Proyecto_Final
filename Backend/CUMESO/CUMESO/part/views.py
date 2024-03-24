from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from .models import Part
from .serializers import PartSerializer
from rest_framework import status
from rest_framework.decorators import action
from rest_framework import viewsets
from CUMESO.CUMESO.core.permissions import IsAdmin
from django.core.files.base import ContentFile
from PIL import Image
from io import BytesIO
from PIL import ExifTags

def fix_image_orientation(img):
    try:
        for orientation in ExifTags.TAGS.keys():
            if ExifTags.TAGS[orientation] == 'Orientation':
                break
        exif = img._getexif()

        if exif is not None:
            exif = dict(exif.items())
            orientation_value = exif.get(orientation)
            if orientation_value == 3:
                img = img.rotate(180, expand=True)
            elif orientation_value == 6:
                img = img.rotate(270, expand=True)
            elif orientation_value == 8:
                img = img.rotate(90, expand=True)

        data = list(img.getdata())
        new_image = Image.new(img.mode, img.size)
        new_image.putdata(data)
        img = img.convert('RGB')
        return img

    except (AttributeError, KeyError, IndexError, TypeError):
        return img
class PartList(viewsets.GenericViewSet):
    permission_classes = [IsAdmin]

    @action(detail=False, methods=['GET'])
    def getAll(self, request):
        parts = Part.objects.all()
        serializer = PartSerializer(parts, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['GET'])
    def getBySlug(self, request, slug):
        part = get_object_or_404(Part, slug=slug)
        serializer = PartSerializer(part)
        return Response(serializer.data)

    def create(self, request):
        part_data = request.data
        part_serializer = PartSerializer(data=part_data)

        if part_serializer.is_valid():
            part = part_serializer.save()  
            
            if 'img' in request.FILES:
                new_img = request.FILES['img']
                image = Image.open(new_img)
                image = fix_image_orientation(image)  
                image_io = BytesIO()
                image.save(image_io, format='WEBP', quality=90)
                image_io.seek(0)

                filename = f"{part.name}.webp"
                part.img.save(filename, ContentFile(image_io.getvalue()))

            return Response(part_serializer.data, status=status.HTTP_201_CREATED)

        return Response(part_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        part = get_object_or_404(Part, pk=pk)
        serializer = PartSerializer(part)
        return Response(serializer.data)
    
    def delete(self, request, slug=None):
        part = get_object_or_404(Part, slug=slug)
        part.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def update(self, request, slug=None):
        part_instance = get_object_or_404(Part, slug=slug)
        serializer = PartSerializer(part_instance, data=request.data, partial=True)

        if serializer.is_valid():
            part = serializer.save()

            if 'img' in request.FILES:
                new_img = request.FILES['img']
                image = Image.open(new_img)
                image = fix_image_orientation(image)  
                image_io = BytesIO()
                image.save(image_io, format='WEBP', quality=90)
                image_io.seek(0)

                filename = f"{part.name}.webp"

                if part_instance.img:
                    part_instance.img.delete(save=False) 

                part_instance.img.save(filename, ContentFile(image_io.getvalue()), save=False)

            part_instance.save()

            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
    def getPartImage(self, request, slug):
        try:
            part = Part.objects.get(slug=slug)
            part_serializer = PartSerializer(part, context={'request': request})
            return JsonResponse(part_serializer.to_part_image(part), safe=False)
        except Part.DoesNotExist:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)