from django.db import models
from django.forms import ValidationError
from django.utils.text import slugify
from ..machine.models import Machine
from ..providers.models import Providers

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

        super().save(*args, **kwargs)

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