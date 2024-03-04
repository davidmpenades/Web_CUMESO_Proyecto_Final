from django.urls import path
from .models import Providers
from . import views

urlpatterns = [
    path('provider/', views.ProvidersList.as_view({'post': 'create'})),
    path('providers/', views.ProvidersList.as_view({'get': 'list'})),
    path('provider/<slug:slug>/', views.ProvidersList.as_view({'get': 'getBySlug'})),
    path('providerDel/<slug:slug>/', views.ProvidersList.as_view({'delete': 'destroy'})),
    path('providerUpd/<slug:slug>/', views.ProvidersList.as_view({'patch': 'partial_update'})),
]
