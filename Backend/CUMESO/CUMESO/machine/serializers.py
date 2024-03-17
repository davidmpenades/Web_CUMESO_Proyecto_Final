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
            # Creación
            if Machine.objects.filter(name=value).exists():
                raise serializers.ValidationError("Ya existe una máquina con este nombre.")
        else:
            # Actualización
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

        # Asocia los usuarios a la máquina
        machine.users.set(users_data)

        # Asocia las partes a la máquina
        machine.parts.set(parts_data)
        
        return machine

    
    def update(self, instance, validated_data):
        user_ids = [user.id for user in validated_data.pop('users', [])]  # Obtener los IDs de usuarios
        part_ids = [part.id for part in validated_data.pop('parts', [])]  # Obtener los IDs de partes

        # Actualizar la relación ManyToMany para 'users'
        if user_ids is not None:
            if not user_ids:
                instance.users.clear()
            else:
                new_user_instances = Users.objects.filter(id__in=user_ids)
                instance.users.set(new_user_instances)
        
        # Actualizar la relación ManyToMany para 'parts'
        if part_ids is not None:
            if not part_ids:
                instance.parts.clear()
            else:
                new_part_instances = Part.objects.filter(id__in=part_ids)
                instance.parts.set(new_part_instances)    
        
        # Actualización de campos normales y slug si es necesario
        new_name = validated_data.get('name', instance.name)
        if new_name != instance.name:
            # Si el nombre ha cambiado, actualiza el nombre y genera un nuevo slug
            instance.name = new_name
            instance.slug = slugify(new_name)
            # No necesitas comprobar si el nombre ya existe aquí,
            # porque el método 'validate_name' ya lo hace.
        else:
            # Si el nombre no ha cambiado, actualiza solo los otros campos.
            for attr, value in validated_data.items():
                setattr(instance, attr, value)
                
        pdf_machine_file = validated_data.pop('pdf_machine', None)
        if pdf_machine_file is not None:
            instance.pdf_machine.save(pdf_machine_file.name, pdf_machine_file, save=False)
        # Guardar todos los cambios en la instancia
        instance.save()
        
        return instance

class MachineVisibilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Machine
        fields = ['visibility']   
   