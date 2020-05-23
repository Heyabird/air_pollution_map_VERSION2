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
air_data['average'] = 333

# Year_2020 = air_data['year'] == 2020
# March = air_data['month'] == 3
# April = air_data['month'] == 4
# May = air_data['month'] == 5

# Year2020_March_AVG = air_data.loc[Year_2020 & March]['PM25'].mean()
# Year2020_April_AVG = air_data.loc[Year_2020 & April]['PM25'].mean()
# Year2020_May_AVG = air_data.loc[Year_2020 & May]['PM25'].mean()

# air_data['Year2020_March_AVG'] = Year2020_March_AVG


# put the data in the database
air_data.to_sql(table_name, engine, if_exists='append', chunksize=1000)

