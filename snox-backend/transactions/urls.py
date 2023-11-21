from django.urls import path
from .views import Transact

urlpatterns = [
    path('verifyCart/',  Transact.as_view()),
]
