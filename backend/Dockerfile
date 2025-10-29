FROM eclipse-temurin:17
LABEL authors="Nguyen Hoang Nam <hoangnam2004hp@gmail.com>"
WORKDIR /app
COPY target/vrgamesapp-0.0.1-SNAPSHOT.jar vrgame.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "vrgame.jar"]
