from rest_framework import serializers
from .models import Providers

class ProvidersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Providers
        fields = ['slug', 'name', 'direction', 'CIF', 'email', 'city', 'phone', 'responsible', 'created_at', 'updated_at']
    
    def validate(self, attrs):
        # Si estás creando un nuevo proveedor, verifica si el CIF ya existe.
        if 'CIF' in attrs:
            if self.instance is None:
                # Estamos creando un nuevo proveedor, no actualizando uno existente.
                if Providers.objects.filter(CIF=attrs['CIF']).exists():
                    raise serializers.ValidationError({"CIF": "Ya existe un proveedor con este CIF."})
            else:
                # Estamos actualizando un proveedor existente.
                if Providers.objects.exclude(pk=self.instance.pk).filter(CIF=attrs['CIF']).exists():
                    raise serializers.ValidationError({"CIF": "Ya existe un proveedor con este CIF."})
        return attrs

    def create(self, validated_data):
        # Creación de un nuevo objeto ProvidersList
        return Providers.objects.create(**validated_data)

    def update(self, instance, validated_data):
        # Actualización de un objeto ProvidersList existente
        instance.name = validated_data.get('name', instance.name)
        instance.direction = validated_data.get('direction', instance.direction)
        instance.CIF = validated_data.get('CIF', instance.CIF)
        instance.email = validated_data.get('email', instance.email)
        instance.city = validated_data.get('city', instance.city)
        instance.phone = validated_data.get('phone', instance.phone)
        instance.responsible = validated_data.get('responsible', instance.responsible)
        # Asegúrate de actualizar todos los campos necesarios
        instance.save()
        return instance