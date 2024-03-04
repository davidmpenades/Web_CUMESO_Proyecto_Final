from django.apps import AppConfig


class ProvidersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'CUMESO.CUMESO.providers'
    
    def ready(self):
                import CUMESO.CUMESO.providers.signals
