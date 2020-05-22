from django.shortcuts import render


def index(request):
    return render(request, 'frontend/index.html')



# def default_map(request):
#     # TODO: move this token to Django settings from an environment variable
#     # found in the Mapbox account settings and getting started instructions
#     # see https://www.mapbox.com/account/ under the "Access tokens" section
#     mapbox_access_token = 'pk.eyJ1IjoiaGV5YWJpcmQiLCJhIjoiY2s5ZWl0c3M0MDJzdDNnbzE2dXB5bDRhdSJ9.bNbukgXKDz5ZbTc9gQ4-bQ';
#     return render(request, 'default.html', 
#                   { 'mapbox_access_token': mapbox_access_token })