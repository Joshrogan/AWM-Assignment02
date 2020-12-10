#db one
docker create --name irelanddb2 --network awm2021 --network-alias irelanddb2 -t -p 25432:5432 -v irelanddb2_data:/var/lib/postgresql kartoza/postgis
