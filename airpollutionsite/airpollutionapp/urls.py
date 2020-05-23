from django.urls import path

from . import views

urlpatterns = [
    # lets try this again
    # path('', views.get_air_quality_city, name='air quality'),
    # path('bj/', views.get_air_quality_bj, name='BJ'),
    path('<int:id>/', views.get_air_quality_city),
    # path('average/<int:id>/', views.get_monthly_average),
    # path('<int:id>/', views.detail, name='detail'),
    # path('', views.index, name='index'),
    # path('', views.receive_data_la, name='retrieveDataLA'),
    # path('', views.receive_data_sd, name='retrieveDataSD'),
    # path('', views.receive_data_ny, name='retrieveDataNY'),
    # path('', views.receive_data_sf, name='retrieveDataSF'),
    # path('', views.receive_data_nd, name='retrieveDataND'),
    # path('', views.receive_data_bj, name='retrieveDataBJ'),
    # path('', views.receive_data_ho, name='retrieveDataHO'),
    # path('', views.receive_data_ch, name='retrieveDataCH'),



]