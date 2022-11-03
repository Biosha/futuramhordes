docker-start: docker-stop
	docker-compose -f docker/docker-compose.yml up -d --no-recreate

docker-watch:
	docker-compose -f docker/docker-compose.yml up --no-recreate

docker-stop:
	docker-compose -f docker/docker-compose.yml stop

build:
	docker-compose -f docker/docker-compose.yml build
	docker-compose -f docker/docker-compose.yml up --no-start

install: build
	docker start futuramhordes_database
	docker-compose -f docker/docker-compose.yml run -u node futuramhordes yarn install
	docker-compose -f docker/docker-compose.yml up -d --no-recreate

update-schema:
	docker-compose -f docker/docker-compose.yml run -u node futuramhordes yarn run:migration
