from django.apps import AppConfig


class PartConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'CUMESO.CUMESO.part'
    
    def ready(self):
                import CUMESO.CUMESO.part.signals
