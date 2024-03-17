import json
from django.shortcuts import get_object_or_404, render
from django.http.response import JsonResponse
from django.http import HttpResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.urls import reverse
from rest_framework import viewsets
from CUMESO.CUMESO.core.permissions import IsAdmin
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Machine
from .serializers import MachineSerializer, MachineVisibilitySerializer
from PIL import Image, ExifTags
from io import BytesIO
from django.core.files.base import ContentFile

def fix_image_orientation(img):
    try:
        for orientation in ExifTags.TAGS.keys():
            if ExifTags.TAGS[orientation] == 'Orientation':
                break
        exif = img._getexif()

        if exif is not None:
            exif = dict(exif.items())
            if exif[orientation] == 3:
                img = img.rotate(180, expand=True)
            elif exif[orientation] == 6:
                img = img.rotate(270, expand=True)
            elif exif[orientation] == 8:
                img = img.rotate(90, expand=True)
    except (AttributeError, KeyError, IndexError, TypeError):
        pass

    return img

class MachineList(viewsets.GenericViewSet):
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsAdmin]
        else:
            permission_classes = [IsAuthenticatedOrReadOnly]
        return [permission() for permission in permission_classes]

    def create(self, request):
        # Construye un nuevo diccionario con los datos del formulario
        machine_data = {
            'name': request.data.get('name'),
            'description': request.data.get('description'),
            # Asume que 'characteristics' se envía como un JSON en string
            'characteristics': json.loads(request.data.get('characteristics', '[]')),
        }

        # Agrega el archivo si está presente en la solicitud
        if 'img' in request.FILES:
            # Abre la imagen usando PIL
            img = Image.open(request.FILES['img'])
            
            # Corrige la orientación si es necesario
            img = fix_image_orientation(img)
            
            # Convierte y guarda la imagen en formato WEBP
            img_converted = BytesIO()
            img.save(img_converted, format='WEBP', quality=90)
            img_converted.seek(0)

            # Asigna el nombre basado en el nombre de la máquina
            filename = f"{machine_data.get('name', 'machine')}.webp"

            # Asigna el archivo convertido a 'img' en machine_data
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
            machine.delete()
            # Usar HttpResponse para enviar el código de estado sin contenido.
            return HttpResponse(status=status.HTTP_204_NO_CONTENT)
        except Machine.DoesNotExist:
            # Enviar una respuesta 404 si no se encuentra el objeto
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)
        
    def partial_update(self, request, slug=None):
        try:
            # Intenta obtener la instancia de Machine basada en el slug.
            machine = Machine.objects.get(slug=slug)
        except Machine.DoesNotExist:
            # Si no se encuentra la instancia, devuelve una respuesta 404.
            return JsonResponse({'message': 'La máquina no existe'}, status=status.HTTP_404_NOT_FOUND)

        # Utiliza el serializador para actualizar parcialmente la instancia con los datos proporcionados en la solicitud.
        # El argumento 'partial=True' permite la actualización parcial de campos.
        machine_serializer = MachineSerializer(machine, data=request.data, partial=True)
        if machine_serializer.is_valid():
            # Si los datos son válidos, guarda la instancia actualizada.
            machine_serializer.save()
            return JsonResponse(machine_serializer.data)
        # Si los datos no son válidos, devuelve los errores.
        return JsonResponse(machine_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def getMachineImage(self, request, slug):
        try:
            machine = Machine.objects.get(slug=slug)
            # Asegúrate de pasar el contexto con la solicitud al serializador.
            machine_serializer = MachineSerializer(machine, context={'request': request})
            return JsonResponse(machine_serializer.to_machine_image(machine), safe=False)
        except Machine.DoesNotExist:
            # Enviar una respuesta 404 si no se encuentra el objeto
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)
        
    @action(detail=True, methods=['patch'])
    def updateVisibility(self, request, slug=None):
        machine = get_object_or_404(Machine, slug=slug)
        serializer = MachineVisibilitySerializer(machine, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Visibilidad actualizada'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

