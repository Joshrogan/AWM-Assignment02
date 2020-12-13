# Assignment 02 Advanced Web Mapping- CoronaTracker

live at: https://ronazone.xyz

I downloaded shapefiles from that data link below, put them in the DB and used it to map covid cases/100k per region,
I also setup a way to download the new data using a manage.py shell command and update the db.

users can create and delete their personal visited spots that will be added to the main map, the covid data will
let users know what locations are safe to visit if they have low # of cases

* Data: https://data.gov.ie/dataset/covid19-leacases-mapped2
* Database: PostgreSQL with PostGIS
* Database management: PgAdmin4
* Middle tier(s): Django
* Front-end: Bootstrap 4
* Mapping tech: Leaflet JS with OpenStreetMap
* Deployment: Docker, Nginx, Digital Ocean
* PWA - Doesn't work when dockerized, it works fine with `python mangage.py runserver` locally outside of docker though.



## Config file
The python_config.py file contains the secrets, hosts and debug info. It's in the .gitignore so it isn't uploaded here.


