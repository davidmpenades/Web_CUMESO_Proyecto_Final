import json
from venv import logger
from django.shortcuts import get_object_or_404
from django.http.response import JsonResponse
from django.http import HttpResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets
from CUMESO.CUMESO.core.permissions import IsAdmin
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Machine
from .serializers import MachineSerializer, MachineVisibilitySerializer
from PIL import Image, ExifTags
from io import BytesIO
from django.core.files.base import ContentFile
from PIL.ExifTags import TAGS
from PIL import Image, ExifTags
from .models import MachineUserRelation
from CUMESO.CUMESO.users.models import Users
from django.db import transaction

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

class MachineList(viewsets.GenericViewSet):
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsAdmin]
        else:
            permission_classes = [IsAuthenticatedOrReadOnly]
        return [permission() for permission in permission_classes]

    def create(self, request):
        machine_data = {
            'name': request.data.get('name'),
            'description': request.data.get('description'),
            'characteristics': json.loads(request.data.get('characteristics', '[]')),
        }

        if 'img' in request.FILES:
            img = Image.open(request.FILES['img'])
            
            img = fix_image_orientation(img)
            
            img_converted = BytesIO()
            img.save(img_converted, format='WEBP', quality=90)
            img_converted.seek(0)

            filename = f"{machine_data.get('name', 'machine')}.webp"

            machine_data['img'] = ContentFile(img_converted.getvalue(), name=filename)

        machine_serializer = MachineSerializer(data=machine_data)

        if machine_serializer.is_valid():
            machine_serializer.save()
            return JsonResponse(machine_serializer.data, status=status.HTTP_201_CREATED)

        return JsonResponse(machine_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def getAll(self, request):
        machines = Machine.objects.all()
        machine_serializer = MachineSerializer(machines, many=True)
        return JsonResponse(machine_serializer.data, safe=False)
    
    def getBySlug(self, request, slug):
        machine = Machine.objects.get(slug=slug)
        machine_serializer = MachineSerializer(machine)
        return JsonResponse(machine_serializer.data, safe=False)
    
    def delete(self, request, slug):
        try:
            machine = Machine.objects.get(slug=slug)
            
            if machine.img:
                try:
                    machine.img.delete(save=False)
                except Exception as e:
                    print(f"No se pudo eliminar la imagen: {e}")

            if machine.pdf_machine:
                try:
                    machine.pdf_machine.delete(save=False)
                except Exception as e:
                    print(f"No se pudo eliminar el PDF: {e}")

            machine.delete()
            
            return HttpResponse(status=status.HTTP_204_NO_CONTENT)
        except Machine.DoesNotExist:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)

        
    def partial_update(self, request, slug=None):
        logger.info(f"Comenzando actualización de la máquina con slug: {slug}")

        try:
            machine = Machine.objects.get(slug=slug)
        except Machine.DoesNotExist:
            return JsonResponse({'message': 'La máquina no existe'}, status=status.HTTP_404_NOT_FOUND)

        logger.info(f"Instancia de máquina obtenida: {machine.name}")

        machine_serializer = MachineSerializer(machine, data=request.data, partial=True)
        if machine_serializer.is_valid():
            logger.info(f"Datos validados para: {machine.name}")
            updated_machine = machine_serializer.save() 
            logger.info(f"Máquina actualizada: {updated_machine.name}")
        if machine_serializer.is_valid():
            if 'img' in request.FILES:
                new_img = request.FILES['img']
                image = Image.open(new_img)
                image = fix_image_orientation(image) 
                image_io = BytesIO()
                image.save(image_io, format='WEBP', quality=90)
                image_io.seek(0)

                filename = f"{machine.name}.webp"

                if machine.img:
                    try:
                        machine.img.delete(save=False)
                    except Exception as e:
                        print(f"No se pudo eliminar la imagen anterior: {e}")

                machine.img.save(filename, ContentFile(image_io.getvalue()), save=False)

            if 'pdf' in request.FILES:
                new_pdf = request.FILES['pdf']
                
                if machine.pdf_machine:
                    try:
                        machine.pdf_machine.delete(save=False)
                    except Exception as e:
                        print(f"No se pudo eliminar el PDF anterior: {e}")
                
                pdf_filename = f"{machine.name}.pdf"
                
                machine.pdf_machine.save(pdf_filename, new_pdf)

            machine.save()
            return JsonResponse(machine_serializer.data)

        logger.error(f"Errores de validación: {machine_serializer.errors}")
        return JsonResponse(machine_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
    def getMachineImage(self, request, slug):
        try:
            machine = Machine.objects.get(slug=slug)
            machine_serializer = MachineSerializer(machine, context={'request': request})
            return JsonResponse(machine_serializer.to_machine_image(machine), safe=False)
        except Machine.DoesNotExist:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)
        
    @action(detail=True, methods=['patch'])
    def updateVisibility(self, request, slug=None):
        machine = get_object_or_404(Machine, slug=slug)
        serializer = MachineVisibilitySerializer(machine, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Visibilidad actualizada'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

