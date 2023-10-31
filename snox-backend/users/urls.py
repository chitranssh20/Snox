from .views import RegisterUser, LogInUser
from django.urls import path
urlpatterns = [
    path('register/', RegisterUser.as_view()),
    path('login/', LogInUser.as_view()),
]
