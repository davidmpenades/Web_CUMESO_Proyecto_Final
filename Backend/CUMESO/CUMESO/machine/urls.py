from django.urls import path
from . import views

urlpatterns = [
    path('machine/', views.MachineList.as_view({'post': 'create'})), 
]
