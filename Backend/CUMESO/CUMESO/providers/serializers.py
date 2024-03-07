from rest_framework import serializers
from .models import Providers
from CUMESO.CUMESO.part import models as part

class ProvidersSerializer(serializers.ModelSerializer):
    parts = serializers.PrimaryKeyRelatedField(
        many=True, 
        queryset=part.Part.objects.all(), 
        required=False, 
    )
    
    class Meta:
        model = Providers
        fields = ['slug', 'name', 'direction', 'CIF', 'email', 'city', 'phone', 'responsible','parts', 'created_at', 'updated_at']
    
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
        parts_data = validated_data.pop('parts', [])
        provider = Providers.objects.create(**validated_data)
        provider.parts.set(parts_data)
        
        return provider

    def update(self, instance, validated_data):
        # Actualiza campos normales
        instance.name = validated_data.get('name', instance.name)
        instance.direction = validated_data.get('direction', instance.direction)
        instance.CIF = validated_data.get('CIF', instance.CIF)
        instance.email = validated_data.get('email', instance.email)
        instance.city = validated_data.get('city', instance.city)
        instance.phone = validated_data.get('phone', instance.phone)
        instance.responsible = validated_data.get('responsible', instance.responsible)
        
        # Actualiza la instancia del proveedor
        instance.save()

        # Actualiza la relación ManyToMany 'parts'
        if 'parts' in validated_data:
            parts_ids = validated_data['parts']  # parts_ids ya es una lista de IDs debido a PrimaryKeyRelatedField
            instance.parts.set(parts_ids)

        return instance