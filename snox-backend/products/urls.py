from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import AddProduct, GetProduct

urlpatterns = [
    path('getProduct/', GetProduct.as_view()),
    path('addProduct/', AddProduct.as_view()),  # Adjusted path without the leading slash
]   + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
