updb:
	docker-compose up -d

stopdb:
	docker-compose stop

reviewdb:
	docker exec -it mongo-institute bash

build:
	./mvnw clean package -DskipTests

build-docker:
	./mvnw clean package -DskipTests -Dquarkus.container-image.build=true

push-docker:
	./mvnw clean package -DskipTests -Dquarkus.container-image.push=true

dev:
	./mvnw compile quarkus:dev

test:
	./mvnw compile test

prod:
	target/institute-service-1.0.0-SNAPSHOT-runner

add-count:
	docker exec local_keycloak /opt/jboss/keycloak/bin/add-institute-keycloak.sh -u admin -p admin && docker restart local_keycloak

.PHONY: dev build test updb stopdb reviewdb build-docker push-docker add-count
