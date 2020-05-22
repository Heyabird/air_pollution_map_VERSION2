import pandas as pd
from sqlalchemy import create_engine
from django.conf import settings
# database connection config
database_name = settings.DATABASES['default']['NAME']
database_url = 'sqlite:///{}'.format(database_name)
engine = create_engine(database_url, echo=False)


# get the data from url
url="http://berkeleyearth.lbl.gov/air-quality/maps/cities/China/Beijing/Beijing.txt"
air_data = pd.read_csv(url, comment='%', sep='\t', dtype='str')
air_data.columns = ['year', 'month', 'day', 'hour', 'PM25', 'PM10_mask', 'retrospective']

table_name = 'air_quality'
air_data['city'] = 'Beijing'
# put the data in the database
air_data.to_sql(table_name, engine, if_exists='append', chunksize=1000)
