from django.urls import path
from . import views

urlpatterns = [
    path('part/', views.PartList.as_view({'post': 'create'})), 
]