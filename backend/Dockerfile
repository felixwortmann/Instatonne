###
# PHASE 1
#
# BUILD BACKEND
###

FROM maven:3-jdk-8 as build-mvn
WORKDIR /usr/src/app

COPY backend/. backend/
COPY instatonne.openapi.yml instatonne.openapi.yml

WORKDIR /usr/src/app/backend
RUN mvn --no-transfer-progress -Dmaven.test.skip=true -f pom.xml clean package


###
# PHASE 2
#
# SERVE BACKEND
###

FROM openjdk:8-jre-alpine

ARG VERSION=unkown
ENV app.version=$VERSION
ARG COMMIT=unkown
ENV app.commit=$COMMIT

COPY --from=build-mvn /usr/src/app/backend/target/backend-*.jar /root/backend.jar
CMD ["java","-jar","/root/backend.jar"]