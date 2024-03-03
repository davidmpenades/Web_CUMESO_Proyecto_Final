from django.db.models.signals import pre_save

from django.dispatch import receiver

from django.utils.text import slugify

from CUMESO.CUMESO.core.utils import generate_random_string

from .models import Part

@receiver(pre_save, sender=Part)
def add_slug_to_bikes_if_not_exists(sender, instance, *args, **kwargs):
    MAXIMUM_SLUG_LENGTH = 255
    if instance and not instance.slug:
 
        slug = slugify(instance.name)
        unique = generate_random_string()

        if len(slug) > MAXIMUM_SLUG_LENGTH:
            slug = slug[:MAXIMUM_SLUG_LENGTH]

        while len(slug + '-' + unique) > MAXIMUM_SLUG_LENGTH:
            parts = slug.split('-')

            if len(parts) == 1:
                slug = slug[:MAXIMUM_SLUG_LENGTH - len(unique) - 1]
            else:
                slug = '-'.join(parts[:-1])

        instance.slug = slug + '-' + unique