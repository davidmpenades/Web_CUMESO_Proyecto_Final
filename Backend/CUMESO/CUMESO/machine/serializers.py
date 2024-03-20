from rest_framework import serializers
from .models import Machine
from ..users.models import Users
from ..part.models import Part
from rest_framework import serializers
from .models import Machine
from django.utils.text import slugify
from django.contrib.auth.models import User
import logging
logger = logging.getLogger(__name__)
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
        logger.info(f"Actualizando máquina: {instance.name}")

        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)

        characteristics = validated_data.get('characteristics')
        if characteristics is not None:
            instance.characteristics = characteristics 
        parts = validated_data.get('parts')
        if 'parts' not in validated_data:
            instance.parts.clear()
        elif parts:
            instance.parts.set(parts)

        pdf = validated_data.get('pdf_machine')
        if pdf:
            new_pdf_name = f"{instance.name}.pdf"
            instance.pdf_machine.delete(save=False)
            instance.pdf_machine.save(new_pdf_name, pdf, save=False)

        instance.save()
        logger.info(f"Actualización completada para: {instance.name}")
        return instance

class MachineVisibilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Machine
        fields = ['visibility']   
   