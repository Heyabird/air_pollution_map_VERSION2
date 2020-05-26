from django.urls import path

from . import views

urlpatterns = [
    # using one path for all database needed in this project
    path('<int:id>/', views.get_air_quality_city),
]