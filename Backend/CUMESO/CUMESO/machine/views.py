from django.shortcuts import render
from django.http.response import JsonResponse
from django.http import HttpResponse
from rest_framework import status
from django.urls import reverse
from rest_framework import viewsets
from CUMESO.CUMESO.core.permissions import IsAdmin
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Machine
from .serializers import MachineSerializer

class MachineList(viewsets.GenericViewSet):
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsAdmin]
        else:
            permission_classes = [IsAuthenticatedOrReadOnly]
        return [permission() for permission in permission_classes]

    def create(self, request):
        machine_data = request.data
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