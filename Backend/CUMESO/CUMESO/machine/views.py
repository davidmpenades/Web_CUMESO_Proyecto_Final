from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework import status
from django.urls import reverse
from rest_framework import viewsets
from CUMESO.CUMESO.core.permissions import IsAdmin
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Machine
from .serializers import MachineSerializer

class MachineList(viewsets.GenericViewSet):
    permission_classes = [IsAdmin]

    def create(self, request):
        machine_data = request.data
        machine_serializer = MachineSerializer(data=machine_data)  # Aquí se pasa el contexto de la solicitud

        if machine_serializer.is_valid():
            machine_serializer.save()
            return JsonResponse(machine_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(machine_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
