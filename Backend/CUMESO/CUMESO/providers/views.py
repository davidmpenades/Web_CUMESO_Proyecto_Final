from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.response import Response
from CUMESO.CUMESO.core.permissions import IsAdmin
from .models import Providers
from .serializers import ProvidersSerializer
from rest_framework.settings import api_settings

class ProvidersList(viewsets.GenericViewSet):
    serializer_class = ProvidersSerializer  # Define el serializador que se usará con este viewset
    permission_classes = [IsAdmin]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            provider = serializer.save()  # Usa el método save() del serializador, que a su vez llama a create() o update()
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Define get_success_headers si es necesario, como por ejemplo:
    def get_success_headers(self, data):
        try:
            return {'Location': str(data[api_settings.URL_FIELD_NAME])}
        except (TypeError, KeyError):
            return {}

    def list(self, request):
        queryset = Providers.objects.all()  # Corregido aquí
        serializer = ProvidersSerializer(queryset, many=True)
        return JsonResponse(serializer.data, safe=False)

    
    def getBySlug(self, request, slug=None):
        provider = get_object_or_404(Providers, slug=slug)  # Corregido aquí
        serializer = ProvidersSerializer(provider)
        return JsonResponse(serializer.data)

    
    def destroy(self, request, slug=None):
        provider = get_object_or_404(Providers, slug=slug)  # Corregido aquí
        provider.delete()
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)
    
    def partial_update(self, request, slug=None):
        print(request.data)
        provider = get_object_or_404(Providers, slug=slug)
        serializer = ProvidersSerializer(provider, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
