import random
from rest_framework import serializers
from .models import Machine
from ..users.models import Users
from rest_framework import serializers
from .models import Machine

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['uuid', 'username', 'email', 'company','type']

class MachineSerializer(serializers.ModelSerializer):
    users = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Machine
        fields = ['id', 'slug', 'name', 'description', 'characteristics', 'price', 'visibility', 'img', 'users','parts']
    def validate_name(self, value):
        if self.instance is None:
            # Creación
            if Machine.objects.filter(name=value).exists():
                raise serializers.ValidationError("Ya existe una máquina con este nombre.")
        else:
            # Actualización
            if Machine.objects.filter(name=value).exclude(pk=self.instance.pk).exists():
                raise serializers.ValidationError("Ya existe una máquina con este nombre.")
        return value
    
    def create(self, validated_data):
        # Obtiene los datos de los usuarios asociados (si los hay)
        users_data = validated_data.pop('users', [])
        # Obtiene el name del validated_data
        name = validated_data.get('name')
        # Verifica si ya existe una máquina con el mismo name
        if Machine.objects.filter(name=name).exists():
            raise serializers.ValidationError("Ya existe una máquina con este nombre.")
        # Crea la instancia de Machine con los datos validados
        machine = Machine.objects.create(**validated_data)
        # Asocia los usuarios a la máquina
        for user_data in users_data:
            # Crea una relación entre la máquina y el usuario
            machine.users.add(user_data)
        # Retorna la instancia de la máquina creada
        return machine
    
    def update(self, instance, validated_data):
        # Obtiene el nuevo nombre de la máquina desde los datos validados
        new_name = validated_data.get('name', instance.name)

        # Verifica si existe alguna otra máquina con el mismo nuevo nombre
        if new_name and Machine.objects.exclude(pk=instance.pk).filter(name=new_name).exists():
            raise serializers.ValidationError({"name": "Ya existe una máquina con este nombre."})

        # Si el nombre ha cambiado, actualiza el slug
        if new_name and instance.name != new_name:
            instance.slug = instance._generate_unique_slug(new_name)
            validated_data['slug'] = instance.slug  # Asegúrate de actualizar el slug en validated_data también
        
        if new_name != instance.name:
            instance.slug = instance._generate_unique_slug(new_name)
        
        # Actualiza la instancia de Machine con los datos validados
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance

