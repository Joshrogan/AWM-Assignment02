#db one
docker create --name irelanddb --network awm2021 --network-alias irelanddb -t -p 25432:5432 -v irelanddb_data:/var/lib/postgresql kartoza/postgis
