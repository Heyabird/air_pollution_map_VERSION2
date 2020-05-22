from django.http import HttpResponse
from django.template import loader
import requests
from .models import Question
# import Pandas
import pandas as pd 
import numpy as np 
# lets return the data as json !!
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from airpollutionapp.models import AirQuality

# Need to understand the line below better!
@api_view(['GET',])
# Let's define a new method to get the air quality value
def get_air_quality(request, pk=None):
    filtered=AirQuality.objects.filter(
        year__contains='2020', 
        month__contains='3',
        # city__contains='New York'
        )
    needed_info = [({'city':i.city, 'year':i.year, 'month':i.month.zfill(2), 'day':i.day.zfill(2), 'hour':i.hour.zfill(2), 'pm':i.PM25}) for i in filtered]
    return Response({"data": needed_info})

# Below is just a practice method; can delete later
def index(request):
    latest_question_list = Question.objects.order_by('-pub_date')[:5]
    template = loader.get_template('airpollutionapp/index.html')
    context = {
        'latest_question_list': latest_question_list,
    }
    return HttpResponse(template.render(context, request))

# Below is just a practice method; can delete later
def detail(request, question_id):
    return HttpResponse("You're looking at question %s." % question_id)

# Currently not using this function (using the 'brute force' way for now), but eventually want to so we can just use one method...
def receive_data(req):
    print(req.GET['city'])
    # url = ''
    # response = requests.get(url)
    # # save city name
    # data = pd.read_csv(url, header=9, sep='\t|,', engine='python')
    # data = data.drop(data.columns[[1,2,3,5,6]], axis=1)
    # html = data.to_html()
    # return HttpResponse(html)


# A bit of a brute force way to have 8 methods for 8 cities, so definitely try to find a more graceful way to pull in urls in 1 method :/ but for now, it will do...
# LOS ANGELES
def receive_data_la(req):
    print(req)
    city = 'Los Angeles'
    url = 'http://berkeleyearth.lbl.gov/air-quality/maps/cities/United_States_of_America/California/Los_Angeles.txt' 
    response = requests.get(url)
    # save city name
    data = pd.read_csv(url, header=9, sep='\t|,', engine='python')
    data['Year'] = data['% Year'].replace('%', ' ', regex=True)
    data = data.drop(data.columns[[1,2,3,5,6]], axis=1)
    obj = data.to_json()

    # For Average Table
    data2 = pd.read_csv("http://berkeleyearth.lbl.gov/air-quality/maps/cities/United_States_of_America/California/San_Diego.txt", 
                   header=9, 
                   sep='\t|,', 
                   names=['Year', 'Month', 'Day', 'UTC Hour', 'PM2.5', 'PM10_mask', 'Retrospective'])
    Year_2020 = data2['Year'] == 2020
    March = data2['Month'] == 3
    April = data2['Month'] == 4
    May = data2['Month'] == 5

    # Getting the AVG value
    Year2020_March_AVG = data.loc[Year_2020 & March]['PM2.5'].mean()
    Year2020_April_AVG = data.loc[Year_2020 & April]['PM2.5'].mean()
    Year2020_May_AVG = data.loc[Year_2020 & May]['PM2.5'].mean()
    print (Year2020_March_AVG)
    print (Year2020_April_AVG)
    print (Year2020_May_AVG)
    return HttpResponse(obj)

# SAN DIEGO
def receive_data_sd(req):
    print(req)
    response = requests.get('http://berkeleyearth.lbl.gov/air-quality/maps/cities/United_States_of_America/ California/San_Diego.txt')
    # save city name
    data = pd.read_csv(url, header=9, sep='\t|,')
    data = data.drop(data.columns[[1,2,3,5,6]], axis=1)
    obj = data.to_json()

    # For Average Table
    data2 = pd.read_csv("http://berkeleyearth.lbl.gov/air-quality/maps/cities/United_States_of_America/California/San_Diego.txt", 
                   header=9, 
                   sep='\t|,', 
                   names=['Year', 'Month', 'Day', 'UTC Hour', 'PM2.5', 'PM10_mask', 'Retrospective'])
    Year_2020 = data2['Year'] == 2020
    March = data2['Month'] == 3
    April = data2['Month'] == 4
    May = data2['Month'] == 5

    # Getting the AVG value
    Year2020_March_AVG = data.loc[Year_2020 & March]['PM2.5'].mean()
    Year2020_April_AVG = data.loc[Year_2020 & April]['PM2.5'].mean()
    Year2020_May_AVG = data.loc[Year_2020 & May]['PM2.5'].mean()
    print (Year2020_March_AVG)
    print (Year2020_April_AVG)
    print (Year2020_May_AVG)

    return HttpResponse(Year2020_March_AVG, obj)

# NEW YORK
def receive_data_ny(req):
    print(req)
    response = requests.get('http://berkeleyearth.lbl.gov/air-quality/maps/cities/United_States_of_ America/New_York/New_York_City.txt' )
    # save city name
    data = pd.read_csv(url, header=9, sep='\t|,')
    data = data.drop(data.columns[[1,2,3,5,6]], axis=1)
    obj = data.to_json()
    return HttpResponse(obj)

# SAN FRAN
def receive_data_sf(req):
    print(req)
    url = 'http://berkeleyearth.lbl.gov/air-quality/local/United_States_of_America/ California/San_Francisco'
    response = requests.get(url)
    # save city name
    data = pd.read_csv(url, header=9, sep='\t|,')
    data = data.drop(data.columns[[1,2,3,5,6]], axis=1)
    obj = data.to_json()
    return HttpResponse(obj)

# DELHI
def receive_data_nd(req):
    print(req)
    url = 'http://berkeleyearth.lbl.gov/air-quality/maps/cities/India/NCT/Delhi.txt'
    response = requests.get(url)
    # save city name
    data = pd.read_csv(url, header=9, sep='\t|,')
    data = data.drop(data.columns[[1,2,3,5,6]], axis=1)
    obj = data.to_json()
    return HttpResponse(obj)

# BEIJING
def receive_data_bj(req):
    print(req)
    url = 'http://berkeleyearth.lbl.gov/air-quality/maps/cities/China/Beijing/Beijing.txt'
    response = requests.get(url)
    # save city name
    data = pd.read_csv(url, header=9, sep='\t|,')
    data = data.drop(data.columns[[1,2,3,5,6]], axis=1)
    obj = data.to_json()
    return HttpResponse(obj)

# HOUSTON
def receive_data_ho(req):
    print(req)
    url = 'http://berkeleyearth.lbl.gov/air-quality/maps/cities/United_States_of_America/ Texas/Houston.txt'
    response = requests.get(url)
    # save city name
    data = pd.read_csv(url, header=9, sep='\t|,')
    data = data.drop(data.columns[[1,2,3,5,6]], axis=1)
    obj = data.to_json()
    return HttpResponse(obj)

# CHICAGO
def receive_data_ch(req):
    print(req)
    url = 'http://berkeleyearth.lbl.gov/air-quality/maps/cities/United_States_of_America/ Illinois/Chicago.txt'
    response = requests.get(url)
    # save city name
    data = pd.read_csv(url, header=9, sep='\t|,')
    data = data.drop(data.columns[[1,2,3,5,6]], axis=1)
    obj = data.to_json()
    return HttpResponse(obj)
