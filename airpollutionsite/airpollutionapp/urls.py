from django.urls import path

from . import views

urlpatterns = [
    # lets try this again
    path('', views.get_air_quality, name='getAirQuality'),
    # path('', views.index, name='index'),
    path('', views.receive_data_la, name='retrieveDataLA'),
    path('', views.receive_data_sd, name='retrieveDataSD'),
    path('', views.receive_data_ny, name='retrieveDataNY'),
    path('', views.receive_data_sf, name='retrieveDataSF'),
    path('', views.receive_data_nd, name='retrieveDataND'),
    path('', views.receive_data_bj, name='retrieveDataBJ'),
    path('', views.receive_data_ho, name='retrieveDataHO'),
    path('', views.receive_data_ch, name='retrieveDataCH'),
    path('<int:question_id>/', views.detail, name='detail'),


]