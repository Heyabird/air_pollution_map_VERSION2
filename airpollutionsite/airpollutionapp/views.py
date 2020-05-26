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
    # each city is matched with two id numbers (single and double digit numbers)
    # the single digit numbers give path to db for time-series chart
    # the double digit numbers give path to db for average pm2.5 values table
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
        # define what columns and data we need
    needed_info = [({'city':i.city, 'year':i.year, 'month':i.month, 'day':i.day, 'hour':i.hour, 'pm':i.PM25}) for i in filtered]

    # getting the averages
    avgs = MonthlyAvg.objects.filter(
        city__contains=city, 
        month__range=(3,5), 
        year__range=(2018,2020)
        )
    needed_avg = [({'city':city, 'year':i.year, 'month':i.month, 'average_pm':i.PM25}) for i in avgs]

    # respond with a different data depending on whether the id is single or double digits
    if id==1 or id==2 or id==3 or id==4 or id==5 or id==6 or id==7 or id==8:
        return Response({"data": needed_info})
    elif id==11 or id==22 or id==33 or id==44 or id==55 or id==66 or id==77 or id==88:
        # print([(i.year,i.month,i.PM25) for i in avgs])
        return Response({"avgs": needed_avg})

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