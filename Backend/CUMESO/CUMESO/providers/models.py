from django.db import models
from django.core.exceptions import ValidationError
from django.db import IntegrityError
from django.utils.text import slugify

class Providers(models.Model):
    slug = models.SlugField(max_length=200, unique=True, blank=True, null=True)
    name = models.CharField(max_length=100)
    direction = models.CharField(max_length=200, blank=True, null=True)
    CIF = models.CharField(max_length=30, blank=True, null=True)
    email = models.EmailField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    responsible = models.CharField(max_length=100, blank=True, null=True)
    parts = models.ManyToManyField('part.Part', through='PartProviderRelation', related_name='providers_parts')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        # Verificar si existe otro proveedor con el mismo nombre
        if Providers.objects.filter(name=self.name).exclude(pk=self.pk).exists():
            raise IntegrityError(f"Ya existe un proveedor con el nombre '{self.name}'.")

        # Verificar si existe otro proveedor con el mismo CIF, si el CIF está presente
        if self.CIF and Providers.objects.filter(CIF=self.CIF).exclude(pk=self.pk).exists():
            raise IntegrityError(f"Ya existe un proveedor con el CIF '{self.CIF}'.")

        # Si estamos creando un nuevo objeto o actualizando el nombre, generamos un nuevo slug
        if not self.pk or 'name' in kwargs.get('update_fields', []) or 'CIF' in kwargs.get('update_fields', []):
            self.slug = self._generate_unique_slug()

        super().save(*args, **kwargs)


    def _generate_unique_slug(self):
        new_slug = slugify(self.name)
        counter = 1
        unique_slug = new_slug
        while Providers.objects.filter(slug=unique_slug).exclude(pk=self.pk).exists():
            unique_slug = f"{new_slug}-{counter}"
            counter += 1
        return unique_slug

    def get_parts_list(self):
        # Devuelve una lista de partes asociadas a este proveedor
        return list(self.parts.all())

class PartProviderRelation(models.Model):
    provider = models.ForeignKey('Providers', on_delete=models.CASCADE, related_name='provider_relations')
    part = models.ForeignKey('part.Part', on_delete=models.CASCADE, related_name='part_relations') 

    class Meta:
        unique_together = ('provider', 'part')
