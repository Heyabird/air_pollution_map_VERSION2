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
from airpollutionapp.models import AirQuality, MonthlyAvg

# https://www.django-rest-framework.org/api-guide/views/#api_view
@api_view(('GET',))
def get_air_quality_city(request, id, pk=None):
    city='San Diego'
    if id==1 or id==11:
        city='Beijing'
    elif id==2 or id==22:
        city='Chicago'
    elif id==3 or id==33:
        city='Houston' 
    elif id==4 or id==44:
        city='Los Angeles'
    elif id==5 or id==55:
        city='New Delhi'
    elif id==6 or id==66:
        city='New York'
    elif id==7 or id==77:
        city='San Diego'
    elif id==8 or id==88:
        city='San Francisco'   
    else:
        return HttpResponse("That's not a valid city...")
    filtered=AirQuality.objects.filter(
        year__range=(2010,2020), 
        # month__contains='3',
        city__contains=city
        )
    # March_avg = filtered.mean()
    # avg = filtered.mean(axis = 1, skipna = True)
    needed_info = [({'city':i.city, 'year':i.year, 'month':i.month.zfill(2), 'day':i.day.zfill(2), 'hour':i.hour.zfill(2), 'pm':i.PM25}) for i in filtered]

    # getting the averages
    avgs = MonthlyAvg.objects.filter(
        city__contains=city, 
        month__range=(3,5), 
        year__range=(2018,2020)
        )
    needed_avg = [({'city':city, 'year':i.year, 'month':i.month, 'average_pm':i.PM25}) for i in avgs]

    if id==1 or id==2 or id==3 or id==4 or id==5 or id==6 or id==7 or id==8:
        return Response({"data": needed_info})
    elif id==11 or id==22 or id==33 or id==44 or id==55 or id==66 or id==77 or id==88:
        # print([(i.year,i.month,i.PM25) for i in avgs])
        return Response({"avgs": needed_avg})


# A bit of a brute force way to have 8 methods for 8 cities, so definitely try to find a more graceful way to pull in urls in 1 method :/ but for now, it will do...
# LOS ANGELES
# def receive_data_la(req):
#     print(req)
#     city = 'Los Angeles'
#     url = 'http://berkeleyearth.lbl.gov/air-quality/maps/cities/United_States_of_America/California/Los_Angeles.txt' 
#     response = requests.get(url)
#     # save city name
#     data = pd.read_csv(url, header=9, sep='\t|,', engine='python')
#     data['Year'] = data['% Year'].replace('%', ' ', regex=True)
#     data = data.drop(data.columns[[1,2,3,5,6]], axis=1)
#     obj = data.to_json()

#     # For Average Table
#     data2 = pd.read_csv("http://berkeleyearth.lbl.gov/air-quality/maps/cities/United_States_of_America/California/San_Diego.txt", 
#                    header=9, 
#                    sep='\t|,', 
#                    names=['Year', 'Month', 'Day', 'UTC Hour', 'PM2.5', 'PM10_mask', 'Retrospective'])
#     Year_2020 = data2['Year'] == 2020
#     March = data2['Month'] == 3
#     April = data2['Month'] == 4
#     May = data2['Month'] == 5

#     # Getting the AVG value
#     Year2020_March_AVG = data.loc[Year_2020 & March]['PM2.5'].mean()
#     Year2020_April_AVG = data.loc[Year_2020 & April]['PM2.5'].mean()
#     Year2020_May_AVG = data.loc[Year_2020 & May]['PM2.5'].mean()
#     print (Year2020_March_AVG)
#     print (Year2020_April_AVG)
#     print (Year2020_May_AVG)
#     return HttpResponse(obj)

# Below is just a practice method; can delete later
def detail(request, question_id):
    return HttpResponse("You're looking at question %s." % question_id)
    
# Below is just a practice method; can delete later
def index(request):
    latest_question_list = Question.objects.order_by('-pub_date')[:5]
    template = loader.get_template('airpollutionapp/index.html')
    context = {
        'latest_question_list': latest_question_list,
    }
    return HttpResponse(template.render(context, request))