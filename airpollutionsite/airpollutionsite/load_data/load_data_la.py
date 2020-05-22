import pandas as pd
from sqlalchemy import create_engine
from django.conf import settings
# database connection config
database_name = settings.DATABASES['default']['NAME']
database_url = 'sqlite:///{}'.format(database_name)
engine = create_engine(database_url, echo=False)


# Data urls by city
url_sd="http://berkeleyearth.lbl.gov/air-quality/maps/cities/United_States_of_America/California/San_Diego.txt"
url_la="http://berkeleyearth.lbl.gov/air-quality/maps/cities/United_States_of_America/California/Los_Angeles.txt"
url_ny="http://berkeleyearth.lbl.gov/air-quality/maps/cities/United_States_of_America/New_York/New_York_City.txt"
url_sf="http://berkeleyearth.lbl.gov/air-quality/local/United_States_of_America/California/San_Francisco"
url_nd="http://berkeleyearth.lbl.gov/air-quality/maps/cities/India/NCT/Delhi.txt"
url_bj="http://berkeleyearth.lbl.gov/air-quality/maps/cities/China/Beijing/Beijing.txt"
url_ho="http://berkeleyearth.lbl.gov/air-quality/maps/cities/United_States_of_America/Texas/Houston.txt"
url_ch="http://berkeleyearth.lbl.gov/air-quality/maps/cities/United_States_of_America/Illinois/Chicago.txt"

# get SD data
# air_data_sd = pd.read_csv(url_sd, comment='%', sep='\t', dtype='str')
# air_data_sd.columns = ['year', 'month', 'day', 'hour', 'PM25', 'PM10_mask', 'retrospective']
# table_name = 'air_quality_sd'
# air_data_sd['city'] = 'San Diego'

# # get LA data
air_data_la = pd.read_csv(url_la, comment='%', sep='\t', dtype='str')
air_data_la.columns = ['year', 'month', 'day', 'hour', 'PM25', 'PM10_mask', 'retrospective']
table_name = 'air_quality'
air_data_la['city'] = 'Los Angeles'

# # get NY data
# air_data_ny = pd.read_csv(url_ny, comment='%', sep='\t', dtype='str')
# air_data_ny.columns = ['year', 'month', 'day', 'hour', 'PM25', 'PM10_mask', 'retrospective']
# table_name = 'air_quality_ny'
# air_data_ny['city'] = 'New York'

# # get SF data
# air_data_sf = pd.read_csv(url_sf, comment='%', sep='\t', dtype='str')
# air_data_sf.columns = ['year', 'month', 'day', 'hour', 'PM25', 'PM10_mask', 'retrospective']
# table_name = 'air_quality_sf'
# air_data_sf['city'] = 'San Francisco'

# # get ND data
# air_data_nd = pd.read_csv(url_nd, comment='%', sep='\t', dtype='str')
# air_data_nd.columns = ['year', 'month', 'day', 'hour', 'PM25', 'PM10_mask', 'retrospective']
# table_name = 'air_quality_nd'
# air_data_nd['city'] = 'New Delhi'

# # get BJ data
# air_data_bj = pd.read_csv(url_bj, comment='%', sep='\t', dtype='str')
# air_data_bj.columns = ['year', 'month', 'day', 'hour', 'PM25', 'PM10_mask', 'retrospective']
# table_name = 'air_quality_bj'
# air_data_bj['city'] = 'Beijing'

# # get HO data
# air_data_ho = pd.read_csv(url_ho, comment='%', sep='\t', dtype='str')
# air_data_ho.columns = ['year', 'month', 'day', 'hour', 'PM25', 'PM10_mask', 'retrospective']
# table_name = 'air_quality_sd'
# air_data_ho['city'] = 'San Diego'

# # get CH data
# air_data_ch = pd.read_csv(url_ch, comment='%', sep='\t', dtype='str')
# air_data_ch.columns = ['year', 'month', 'day', 'hour', 'PM25', 'PM10_mask', 'retrospective']
# table_name = 'air_quality_ch'
# air_data_ch['city'] = 'Chicago'

# put the data in the database and make sure theres not too many when page loads
air_data_la.to_sql(table_name, engine, if_exists='append', chunksize=1000)
