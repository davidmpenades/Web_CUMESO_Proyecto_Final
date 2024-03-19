from rest_framework import serializers
from .models import Machine
from ..users.models import Users
from ..part.models import Part
from rest_framework import serializers
from .models import Machine
from django.utils.text import slugify
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['uuid', 'username', 'email', 'company','type']
        extra_kwargs = {
            'parts': {'read_only': False},
        }
    
    pdf_machine = serializers.FileField(required=False)
    
class MachineSerializer(serializers.ModelSerializer):
    users = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Users.objects.all(),  
        required=False
    )
    
    parts = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Part.objects.all(),  
        required=False
    )
    characteristics = serializers.ListField(
        child=serializers.CharField(),
        required=False
    )
    def to_machine_image(self, instance):
        request = self.context.get('request')
        if instance.img and hasattr(instance.img, 'url'):
            return request.build_absolute_uri(instance.img.url)
        return None

    class Meta:
        model = Machine
        fields = ['id', 'slug', 'name', 'description', 'characteristics', 'price', 'visibility', 'img','pdf_machine', 'users','parts']
    
    def validate_name(self, value):
        if self.instance is None:
            if Machine.objects.filter(name=value).exists():
                raise serializers.ValidationError("Ya existe una máquina con este nombre.")
        else:
            if Machine.objects.filter(name=value).exclude(pk=self.instance.pk).exists():
                raise serializers.ValidationError("Ya existe una máquina con este nombre.")
        return value
    
    def create(self, validated_data):
        parts_data = validated_data.pop('parts', [])
        users_data = validated_data.pop('users', [])
        characteristics_data = validated_data.get('characteristics', [])
        name = validated_data.get('name')
        
        if Machine.objects.filter(name=name).exists():
            raise serializers.ValidationError("Ya existe una máquina con este nombre.")

        machine = Machine.objects.create(**validated_data)
        machine.characteristics = characteristics_data
        machine.save()

        machine.users.set(users_data)

        machine.parts.set(parts_data)
        
        return machine

    
    def update(self, instance, validated_data):
        print("Actualizando máquina:", instance.name)

        user_ids = [user.id for user in validated_data.pop('users', [])]
        part_ids = [part.id for part in validated_data.pop('parts', [])]

        # Actualización de usuarios
        if user_ids is not None:
            print("IDs de usuarios para actualizar:", user_ids)
            if not user_ids:
                instance.users.clear()
            else:
                new_user_instances = Users.objects.filter(id__in=user_ids)
                instance.users.set(new_user_instances)
        
        # Actualización de partes
        if part_ids is not None:
            print("IDs de partes para actualizar:", part_ids)
            if not part_ids:
                instance.parts.clear()
            else:
                new_part_instances = Part.objects.filter(id__in=part_ids)
                instance.parts.set(new_part_instances)

        # Otros campos
        for attr, value in validated_data.items():
            print(f"Actualizando {attr} a {value}")
            setattr(instance, attr, value)
        
        instance.save()
        print("Actualización completada para:", instance.name)
        return instance


class MachineVisibilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Machine
        fields = ['visibility']   
   