#some of the docker commands i used
docker create --name irelanddb2 --network awm2021 --network-alias irelanddb2 -t -p 25432:5432 -v irelanddb2_data:/var/lib/postgresql kartoza/postgis


docker create --name ronatravel --network awm2021 --network-alias my_ronatravel -t -v html_data:/usr/src/app/static ronatravel


docker create --name ronatravel --network awm2021 --network-alias my_ronatravel -t -p 8080:8001 -v html_data:/usr/src/app/static ronatravel


docker stop ronatravel
docker rm ronatravel
docker container rm ronatravel
docker image rm ronatravel
docker build --no-cache -t ronatravel .



docker create --name wmap_nginx_certbot --network awm2021 --network-alias wmap-nginx-certbot -p 80:80 -p 443:443 -t -v wmap_web_data:/usr/share/nginx/html -v $HOME/wmap_nginx_certbot/conf:/etc/nginx/conf.d -v /etc/letsencrypt:/etc/letsencrypt -v /var/www/certbot -v html_data:/usr/share/nginx/html/static  wmap_nginx_certbot


docker create --name wmap_nginx_certbot --network awm2021 --network-alias wmap-nginx-certbot -p 80:80 -p 443:443 -t -v wmap_web_data:/usr/share/nginx/html -v $HOME/wmap_nginx_certbot/conf:/etc/nginx/conf.d -v /etc/letsencrypt:/etc/letsencrypt -v /var/www/certbot -v html_data:/usr/share/nginx/html/static  wmap_nginx_certbot


docker create --name irelanddb2 --network awm2021 --network-alias irelanddb2 -t -v wmap_postgis_data:/var/lib/postgresql kartoza/postgis


docker create --name ronatravel --network awm2021 --network-alias my_ronatravel -t -v html_data:/usr/src/app/static joshrogan/ronatravel:latest ronatravel


docker container commit ronatravel joshrogan/ronatravel:latest
docker push joshrogan/ronatravel:latest


docker exec -it ronatravel /bin/bash
