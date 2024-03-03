from django.db import models
from django.utils.text import slugify
from ..machine.models import Machine

class Part(models.Model):
    slug = models.SlugField(max_length=200, unique=True, blank=True, null=True)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=100, blank=True, null=True)
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True)
    img = models.ImageField(upload_to='part_images/', null=True, blank=True)
    machines = models.ManyToManyField(Machine, through='PartMachineRelation', related_name='related_parts')
    cad_file = models.FileField(upload_to='part_cad/', null=True, blank=True)
    pdf_file = models.FileField(upload_to='part_pdf/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super(Part, self).save(*args, **kwargs)

class PartMachineRelation(models.Model):
    part = models.ForeignKey(Part, on_delete=models.CASCADE)
    machine = models.ForeignKey(Machine, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('part', 'machine')
