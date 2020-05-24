import pandas as pd
from sqlalchemy import create_engine
from django.conf import settings
# database connection config
database_name = settings.DATABASES['default']['NAME']
database_url = 'sqlite:///{}'.format(database_name)
engine = create_engine(database_url, echo=False)
# get the data from url
url="http://berkeleyearth.lbl.gov/air-quality/maps/cities/United_States_of_America/California/Los_Angeles.txt"
colnames = ['year', 'month', 'day', 'hour', 'PM25', 'PM10_mask', 'retrospective']
dtypes = {
    'year': 'int',
    'month': 'int',
    'day': 'int',
    'hour': 'int',
    'PM25': 'float',
    'PM10_mask': 'str',
    'retrospective': 'str'
}
air_data = pd.read_csv(url, comment='%', sep='\t', names=colnames, dtype=dtypes)
air_data['city'] = 'Los Angeles'

# use reset_index below to keep year, month, and city as columns (instead of them getting absorbed into the index)
monthly_means = air_data[['year', 'month', 'city', 'PM25']].groupby(['year','month','city']).mean().reset_index()
# air_data['monthly_means'] = monthly_means

# put the time series data in the database
table_name = 'air_quality'
air_data.to_sql(table_name, engine, if_exists='append', chunksize=1000)

# put the monthly average data in the database
table_name = 'monthly_avg'
monthly_means.to_sql(table_name, engine, if_exists='append', chunksize=1000)