from rest_framework import serializers
from django.core.exceptions import ValidationError
from .models import Part, Machine

class PartSerializer(serializers.ModelSerializer):
    machines = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Machine.objects.all(),
        write_only=True
    )
    img = serializers.ImageField(required=False, allow_null=True)
    cad_file = serializers.FileField(required=False, allow_null=True)
    pdf_file = serializers.FileField(required=False, allow_null=True)
    
    def to_part_image(self, instance):
        request = self.context.get('request')
        if instance.img and hasattr(instance.img, 'url'):
            return request.build_absolute_uri(instance.img.url)
        return None

    class Meta:
        model = Part
        fields = ['id', 'slug', 'name', 'description', 'quantity', 'price','status', 'img', 'cad_file', 'pdf_file', 'machines','updated_at','created_at']

    def to_internal_value(self, data):
        data = super().to_internal_value(data)
        machine_data = data.get('machines')

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
        instance.slug = validated_data.get('slug', instance.slug)
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.quantity = validated_data.get('quantity', instance.quantity)
        instance.price = validated_data.get('price', instance.price)
        instance.img = validated_data.get('img', instance.img)
        instance.status = validated_data.get('status', instance.status)
        instance.cad_file = validated_data.get('cad_file', instance.cad_file)
        instance.pdf_file = validated_data.get('pdf_file', instance.pdf_file)
        
        for attr, value in validated_data.items():
            if attr in ['cad_file', 'pdf_file']:
                old_file = getattr(instance, attr)
                if old_file:
                    old_file.delete(save=False)

            setattr(instance, attr, value)

        instance.save()

        if 'machines' in validated_data:
            machines_ids = validated_data['machines']
            instance.machines.set(machines_ids)

        return instance
    def create(self, validated_data):
        machines_data = validated_data.pop('machines', None)

        part = Part.objects.create(**validated_data)

        if machines_data is not None:
            part.machines.set(machines_data)

        return part