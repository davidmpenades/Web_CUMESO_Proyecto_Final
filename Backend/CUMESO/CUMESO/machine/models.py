from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.forms import ValidationError
from django.utils.text import slugify


class Machine(models.Model):
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    name = models.CharField(max_length=150, unique=True)
    description = models.CharField(max_length=300, null=True)
    characteristics = ArrayField(models.CharField(max_length=200), default=list, blank=True, null=True)
    users = models.ManyToManyField('users.Users', through='MachineUserRelation', related_name='machines', blank=True)
    parts = models.ManyToManyField('part.Part', through='part.PartMachineRelation', related_name='related_machines', blank=True)
    price = models.DecimalField(max_digits=15, decimal_places=2, null=True)
    visibility = models.BooleanField(default=False)
    img = models.ImageField(upload_to='machine_image', null=True, blank=True)
    pdf_machine = models.FileField(upload_to='machine_pdf', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True)

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        # Verificar si existe un nombre duplicado
        if self.pk and Machine.objects.filter(name=self.name).exclude(pk=self.pk).exists():
            raise ValidationError(f"Ya existe una máquina con el nombre '{self.name}'.")

        # Si estamos creando un nuevo objeto o el nombre ha cambiado
        if not self.pk or (self.pk and self.name != Machine.objects.get(pk=self.pk).name):
            self.slug = self._generate_unique_slug()

        super().save(*args, **kwargs)

    def _generate_unique_slug(self, new_name=None):
        if new_name is None:
            new_name = self.name
        new_slug = slugify(new_name)
        unique_slug = new_slug

        # Inicializa un contador para slugs duplicados
        counter = 1
        while Machine.objects.filter(slug=unique_slug).exclude(pk=self.pk).exists():
            unique_slug = f"{new_slug}-{counter}"
            counter += 1

        return unique_slug

class MachineUserRelation(models.Model):
    machine = models.ForeignKey(Machine, on_delete=models.CASCADE, null=True)
    user = models.ForeignKey('users.Users', on_delete=models.CASCADE, null=True)

    class Meta:
        unique_together = ('machine', 'user')




