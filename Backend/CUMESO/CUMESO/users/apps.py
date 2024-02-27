from django.apps import AppConfig


class UsersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'CUMESO.CUMESO.users'
    
    def ready(self):
                import CUMESO.CUMESO.users.signals