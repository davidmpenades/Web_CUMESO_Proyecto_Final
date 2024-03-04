from django.db.models.signals import pre_save

from django.dispatch import receiver

from django.utils.text import slugify

from CUMESO.CUMESO.core.utils import generate_random_string

from .models import Machine

@receiver(pre_save, sender=Machine)
def add_slug_to_machine(sender, instance, *args, **kwargs):
    MAXIMUM_SLUG_LENGTH = 255

    # Genera el slug desde el nombre cada vez, independientemente de si ya existe un slug
    slug = slugify(instance.name)
    unique = generate_random_string()

    if len(slug) > MAXIMUM_SLUG_LENGTH:
        slug = slug[:MAXIMUM_SLUG_LENGTH]

    # Asegúrate de que el slug total no exceda la longitud máxima
    while len(slug + '-' + unique) > MAXIMUM_SLUG_LENGTH:
        parts = slug.split('-')

        if len(parts) == 1:
            # Si no hay guiones, simplemente trunca los caracteres finales
            slug = slug[:MAXIMUM_SLUG_LENGTH - len(unique) - 1]
        else:
            # Si hay guiones, intenta quitar la última palabra
            slug = '-'.join(parts[:-1])

    # Asigna el nuevo slug, que incluye el string único
    instance.slug = slug + '-' + unique
