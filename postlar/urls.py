from django.urls import path
from .views import *

urlpatterns = [
    path('', home, name='home'),
    path('toplam/',toplam, name='toplam'),
    path('detail/<str:slug>/', postdetail, name='detail'),
]