from rest_framework import serializers
from .models import Part
from ..machine.models import Machine

class PartSerializer(serializers.ModelSerializer):
    machines = serializers.PrimaryKeyRelatedField(many=True, queryset=Machine.objects.all())
    img = serializers.ImageField()
    cad_file = serializers.FileField()
    pdf_file = serializers.FileField()
    
    class Meta:
        model = Part
        fields = ['id', 'name', 'description', 'img', 'cad_file', 'pdf_file', 'machines']

    def validate_name(self, value):
        # Comprueba si ya existe una parte con el mismo nombre
        if Part.objects.filter(name=value).exists():
            raise serializers.ValidationError("Ya existe una parte con este nombre.")
        return value

    def create(self, validated_data):
        # Obtiene los datos de las máquinas asociadas (si las hay)
        machines_data = validated_data.pop('machines', [])
        # Crea la instancia de Part con los datos validados
        part = Part.objects.create(**validated_data)
        # Asocia las máquinas a la parte
        for machine_data in machines_data:
            # Crea una relación entre la parte y la máquina
            part.machines.add(machine_data)
        # Retorna la instancia de la parte creada
        return part
