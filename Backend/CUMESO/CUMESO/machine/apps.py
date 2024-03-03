from django.apps import AppConfig


class MachineConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'CUMESO.CUMESO.machine'
    
    def ready(self):
                import CUMESO.CUMESO.machine.signals