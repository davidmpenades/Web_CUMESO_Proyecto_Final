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

