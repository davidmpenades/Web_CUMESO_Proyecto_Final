from django.db import models
from django.forms import ValidationError
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
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        # Verificar si existe un nombre duplicado
        if Providers.objects.filter(name=self.name).exclude(pk=self.pk).exists():
            raise ValidationError(f"Ya existe un proveedor con el nombre '{self.name}'.")

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
        while Providers.objects.filter(slug=unique_slug).exclude(pk=self.pk).exists():
            unique_slug = f"{new_slug}-{counter}"
            counter += 1

        return unique_slug


    def get_parts_list(self):
    # Verifica si hay partes asociadas a través del campo 'providers'
        if hasattr(self, 'providers'):
            # Accede a las partes asociadas y devuelve una lista de ellas
            return list(self.providers.all())
        else:
            # Si no hay partes asociadas, devuelve una lista vacía
            return []
