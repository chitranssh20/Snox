from .views import RegisterUser, LogInUser, Check
from django.urls import path
urlpatterns = [
    path('register/', RegisterUser.as_view()),
    path('login/', LogInUser.as_view()),
    path('check/', Check.as_view()),
]
