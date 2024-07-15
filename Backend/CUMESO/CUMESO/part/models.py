from io import BytesIO
from django.db import models
from django.forms import ValidationError
from django.utils.text import slugify
from ..machine.models import Machine
from ..providers.models import Providers
from PIL import Image
import os
from django.core.files.base import ContentFile

class Part(models.Model):
    slug = models.SlugField(max_length=200, unique=True, blank=True, null=True)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=100, blank=True, null=True)
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True)
    status = models.CharField(max_length=100, blank=True, null=True)
    img = models.ImageField(upload_to='part_images/', null=True, blank=True)
    machines = models.ManyToManyField(Machine, through='PartMachineRelation', related_name='related_parts')
    providers = models.ManyToManyField(Providers, related_name='supplied_parts')
    cad_file = models.FileField(upload_to='part_cad/', null=True, blank=True)
    pdf_file = models.FileField(upload_to='part_pdf/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        # Verificar si el nombre ha cambiado (y no es una instancia nueva)
        if self.pk and self.name != Part.objects.get(pk=self.pk).name:
            self.slug = self._generate_unique_slug()
        # Verificar si existe un nombre duplicado
        if Part.objects.filter(name=self.name).exclude(pk=self.pk).exists():
            raise ValidationError(f"Ya existe una pieza con el nombre '{self.name}'.")

        # Si estamos creando un nuevo objeto o actualizando el nombre
        if not self.pk or 'name' in kwargs.get('update_fields', []):
            self.slug = self._generate_unique_slug()

        if self.img:
            # Asegurarte de que estamos trabajando con una nueva imagen o una imagen actualizada
            if not self._state.adding and hasattr(self, '_original_img') and self._original_img != self.img.name:
                old_img_path = self._original_img
            else:
                old_img_path = None

            pil_img = Image.open(self.img)
            pil_img = pil_img.convert('RGB')
            new_img_io = BytesIO()
            pil_img.save(new_img_io, format='WEBP')

            # Temporalmente guardar la imagen original para luego eliminarla si es necesario
            if old_img_path:
                self._temp_old_img_path = old_img_path

            # Reiniciar el puntero al inicio del BytesIO
            new_img_io.seek(0)
            self.img.save(f'{self.name}.webp', content=ContentFile(new_img_io.read()), save=False)

        super().save(*args, **kwargs)

        # Eliminar la imagen antigua si existe y es diferente a la actual
        if hasattr(self, '_temp_old_img_path'):
            old_img_path = self._temp_old_img_path
            if old_img_path and old_img_path != self.img.path:
                try:
                    os.remove(old_img_path)
                except OSError:
                    pass
            del self._temp_old_img_path
        

    def convert_image(self, img_field, new_name):
        pil_img = Image.open(img_field)
        pil_img = pil_img.convert('RGB')  # Convertir a RGB en caso de que sea una imagen PNG
        new_img_path = f'part_images/{new_name}.webp'
        
        # Guardar la imagen convertida
        pil_img.save(new_img_path, format='WEBP')
        
        return new_img_path

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Guardar el estado original de la imagen para verificar cambios
        self.__original_img = self.img

    def _generate_unique_slug(self):
        new_slug = slugify(self.name)
        # Inicializa un contador para slugs duplicados
        counter = 1
        # Copia inicial del slug generado
        unique_slug = new_slug

        # Mientras exista un objeto con el mismo slug (excluyendo el actual si está siendo actualizado)
        while Part.objects.filter(slug=unique_slug).exclude(pk=self.pk).exists():
            unique_slug = f"{new_slug}-{counter}"
            counter += 1

        return unique_slug


    def get_providers_list(self):
        return list(self.providers.all())

class PartMachineRelation(models.Model):
    part = models.ForeignKey(Part, on_delete=models.CASCADE)
    machine = models.ForeignKey(Machine, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('part', 'machine')