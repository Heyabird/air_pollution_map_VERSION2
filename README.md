# README: Air Pollution App

note: this is a version 2 of the air pollution map.

## A. Getting Started
### In this project, I used:
* venv (virtual environment)
* Python 3.7.7
* Django 3.0.6
* pip
* npm / node.js
* React
* babel & Webpack
* pandas
* Sqlalchemy
* Jest
* Enzyme
* axios

-- 
### To run this project:
1. install Python and install Django ($ python3 -m pip install Django)
2. install pip (https://pip.pypa.io/en/stable/installing/)
3. cd into the github repo folder, and set up virtual environment ($ python3 -m venv venv)
4. activate virtual environment ($ source venv/bin/activate)-mac / ($venv\Scripts\activate)-windows
5. download node.js
6. download npm and run npm install ($ npm install)
7. install pandas, numpy, sqlalchemy, and requests ($ pip install pandas numpy sqlalchemy requests)
8. install drf ($ pip install djangorestframework)
9. create migrations ($ python3 manage.py makemigrations) in the outer airpollutionsite folder
10. apply migrations ($ python3 manage.py migrate) in the outer airpollutionsite folder
11. Load all the 8 data files into your local python shell. To do, in the outer airpollutionsite folder, then run these commands:
* python3 manage.py shell < airpollutionsite/load_data/load_data_bj.py
* python3 manage.py shell < airpollutionsite/load_data/load_data_ch.py
* python3 manage.py shell < airpollutionsite/load_data/load_data_ho.py
* python3 manage.py shell < airpollutionsite/load_data/load_data_la.py
* python3 manage.py shell < airpollutionsite/load_data/load_data_nd.py
* python3 manage.py shell < airpollutionsite/load_data/load_data_ny.py
* python3 manage.py shell < airpollutionsite/load_data/load_data_sd.py
* python3 manage.py shell < airpollutionsite/load_data/load_data_sf.py
- without running the commands above, you won't be able to see the data
- to check if the data are loaded, you can go to localhost:8000/data/{id} where id is a number between 1 and 8 or 11, 22, 33, 44, 55, 66, 77, or 88
- if you don't see any data there, follow this instruction to remake the database: (https://stackoverflow.com/questions/42150499/how-do-i-delete-db-sqlite3-in-django-1-9-to-start-from-scratch) and redo the load_data commands
12. Then, run server ($ python3 manage.py runserver) -- you will see it on localhost:8000
13. if any changes applied to frontend, run npm run dev in frontend folder ($ npm run dev)
* if $ npm run dev doesn't work, install axios ($ npm install axios react-dom --save)
14. make sure you are on venv all the time



### Important Links: 
* wireframes (figma): https://www.figma.com/file/rooFWmkVoKMLUCL2Di6sqT/Air-Pollution-App?node-id=0%3A1
* project notes (developer + user stories, resources): https://docs.google.com/spreadsheets/d/1pTjB6Meel2vV00nJnJUgZDhO8YE8yjBbbNYumgL_yXQ/edit?usp=sharing
* github repo: https://github.com/Heyabird/air_pollution_map_VERSION2



To implement tests(wip), you should run:
* pip install coverage
* coverage run --source='.' manage.py test (run coverage)
* coverage html (generate report)
For Jest/Enzyme test:
* go to the frontend folder, and run 'npm test'



