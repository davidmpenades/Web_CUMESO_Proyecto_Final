from django.db import models

class Part(models.Model):
    name = models.CharField(max_length=100, null=False)
    description = models.CharField(max_length=100, null=True)
    price = models.DecimalField(max_digits=15, decimal_places=2, null=True)
    img = models.ImageField(upload_to='part_images/', null=True, blank=True)
    machines = models.ManyToManyField('machine.Machine', through='PartMachineRelation', related_name='related_parts')
    cad_file = models.FileField(upload_to='part_cad/', null=True, blank=True)
    pdf_file = models.FileField(upload_to='part_pdf/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class PartMachineRelation(models.Model):
    part = models.ForeignKey('Part', on_delete=models.CASCADE)
    machine = models.ForeignKey('machine.Machine', on_delete=models.CASCADE)

    class Meta:
        unique_together = ('part', 'machine')
