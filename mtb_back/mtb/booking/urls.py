from django.urls import path
from . import views

urlpatterns = [
    path('message/', views.message_view, name='message'),
]
