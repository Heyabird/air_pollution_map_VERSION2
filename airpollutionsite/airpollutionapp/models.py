from django.db import models
from django.utils import timezone
import datetime

class AirQuality(models.Model):
    class Meta:
        db_table = 'air_quality' # This tells Django where the SQL table is
        managed = False # Use this if table already exists
                        # and doesn't need to be managed by Django
    index = models.IntegerField(primary_key=True)
    year = models.TextField()
    month = models.TextField()
    day = models.TextField()
    hour = models.TextField()
    PM25 = models.TextField()
    PM10_mask = models.TextField()
    retrospective = models.TextField()
    city = models.TextField()

class MonthlyAvg(models.Model):
   class Meta:
       db_table = 'monthly_avg' # This tells Django where the SQL table is
       managed = False # Use this if table already exists
                       # and doesn't need to be managed by Django
   index = models.IntegerField(primary_key=True)
   year = models.IntegerField()
   month = models.IntegerField()
   city = models.TextField()
   PM25 = models.FloatField()


# Testing out Models, following Django tutorial (https://docs.djangoproject.com/en/3.0/intro/tutorial01/) - will delete and change these later
class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')
    def __str__(self):
        return self.question_text
    def was_published_recently(self):
        return self.pub_date >= timezone.now() - datetime.timedelta(days=1)


class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)
    def __str__(self):
        return self.choice_text