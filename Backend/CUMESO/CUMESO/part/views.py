from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from ..core.permissions import IsAdmin
from rest_framework import viewsets
from .serializers import PartSerializer

class PartList(viewsets.ViewSet):
    permission_classes = [IsAdmin]

    def create(self, request):
        part_data = request.data
        part_serializer = PartSerializer(data=part_data)

        if part_serializer.is_valid():
            part_serializer.save()
            return Response(part_serializer.data, status=status.HTTP_201_CREATED)
        return Response(part_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

