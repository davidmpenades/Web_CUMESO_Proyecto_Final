from django.db import models
from django.contrib.postgres.fields import ArrayField

class Machine(models.Model):
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    name = models.CharField(max_length=150, unique=True)
    description = models.CharField(max_length=300, null=True)
    characteristics = ArrayField(models.CharField(max_length=100), blank=True, null=True)
    users = models.ManyToManyField('users.Users', through='MachineUserRelation', related_name='machines', blank=True)
    parts = models.ManyToManyField('part.Part', through='part.PartMachineRelation', related_name='related_machines', blank=True)
    price = models.DecimalField(max_digits=15, decimal_places=2, null=True)
    visibility = models.BooleanField(default=False)
    img = models.ImageField(upload_to='image', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True)

    def __str__(self):
        return self.name

class MachineUserRelation(models.Model):
    machine = models.ForeignKey('Machine', on_delete=models.CASCADE)
    user = models.ForeignKey('users.Users', on_delete=models.CASCADE) 

    class Meta:
        unique_together = ('machine', 'user')




