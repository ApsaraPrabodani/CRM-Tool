#/bin/bash

docker stop crm && docker rm crm 
docker build -t crm --file Dockerfile .
docker run --rm -v $PWD:/usr/src/app/crm:cached --name crm -p 4003:4003 --env-file .env --network mynetwork  -d crm

docker logs -f crm
