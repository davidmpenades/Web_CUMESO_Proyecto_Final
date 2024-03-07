from rest_framework import serializers
from django.core.exceptions import ValidationError
from .models import Part, Machine

class PartSerializer(serializers.ModelSerializer):
    machines = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Machine.objects.all(),
        write_only=True
    )
    img = serializers.ImageField(required=True)
    cad_file = serializers.FileField(required=True)
    pdf_file = serializers.FileField(required=True)

    class Meta:
        model = Part
        fields = ['id', 'slug', 'name', 'description', 'quantity', 'price','status', 'img', 'cad_file', 'pdf_file', 'machines','updated_at','created_at']

    def to_internal_value(self, data):
        # Llama primero a la implementación de la superclase para obtener un diccionario de datos validados
        data = super().to_internal_value(data)
        machine_data = data.get('machines')

        # Verifica si machine_data es una lista que contiene cadenas que representan números
        if isinstance(machine_data, list):
            new_machine_list = []
            for machine_id in machine_data:
                if isinstance(machine_id, str) and machine_id.isdigit():
                    new_machine_list.append(int(machine_id))
                elif isinstance(machine_id, int):
                    new_machine_list.append(machine_id)
                else:
                    raise ValidationError({'machines': 'Todos los IDs de máquinas deben ser enteros.'})
            data['machines'] = new_machine_list

        return data
    
    def update(self, instance, validated_data):
        # Actualiza los campos normales
        instance.slug = validated_data.get('slug', instance.slug)
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.quantity = validated_data.get('quantity', instance.quantity)
        instance.price = validated_data.get('price', instance.price)
        instance.img = validated_data.get('img', instance.img)
        instance.status = validated_data.get('status', instance.status)
        instance.cad_file = validated_data.get('cad_file', instance.cad_file)
        instance.pdf_file = validated_data.get('pdf_file', instance.pdf_file)
        
        # Guarda los cambios en el objeto 'Part'
        instance.save()

        # Actualiza la relación ManyToMany 'machines'
        if 'machines' in validated_data:
            machines_ids = validated_data['machines']
            instance.machines.set(machines_ids)

        return instance
