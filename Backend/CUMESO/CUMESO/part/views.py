from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from .models import Part
from .serializers import PartSerializer
from rest_framework import status
from rest_framework.decorators import action
from rest_framework import viewsets
from CUMESO.CUMESO.core.permissions import IsAdmin

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
            part_serializer.save()
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
        serializer = PartSerializer(part_instance, data=request.data, partial=True)  # El parámetro `partial=True` permite actualizaciones parciales
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)