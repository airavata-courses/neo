FROM openjdk:17-ea-jdk-oracle


WORKDIR /metadata

COPY "target/metadata-0.0.1-SNAPSHOT.jar" app.jar

EXPOSE 52000

ENTRYPOINT ["java", "-jar", "app.jar"]