"""airpollutionsite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from airpollutionapp import views
from django.conf import settings


urlpatterns = [
    path('', include('frontend.urls')),
    path('testing/', include('airpollutionapp.urls')),
    # try 2
    path('getAirQuality/', include ('airpollutionapp.urls')),
    path('getAirQualityBJ/', include ('airpollutionapp.urls')),
    # path('retrieveDataLA/', include('airpollutionapp.urls')),
    # path('retrieveDataSD/', include('airpollutionapp.urls')),
    # path('retrieveDataNY/', include('airpollutionapp.urls')),
    # path('retrieveDataSF/', include('airpollutionapp.urls')),
    # path('retrieveDataND/', include('airpollutionapp.urls')),
    # path('retrieveDataBJ/', include('airpollutionapp.urls')),    
    # path('retrieveDataHO/', include('airpollutionapp.urls')),
    # path('retrieveDataCH/', include('airpollutionapp.urls')),

    # password for admin is 'djangoisfun1'
    path('admin/', admin.site.urls),
]
