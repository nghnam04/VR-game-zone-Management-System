FROM maven:3.9.3-eclipse-temurin-17 AS build

WORKDIR /app

# Copy pom.xml for caching dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy source code
COPY src ./src

# Build Spring Boot jar
RUN mvn clean package -DskipTests

# Run stage
FROM eclipse-temurin:17-jre
WORKDIR /app

# Copy jar từ build stage
COPY --from=build /app/target/vrgamesapp-0.0.1-SNAPSHOT.jar .

# Expose port 8080
EXPOSE 8080

# Start Spring Boot app
ENTRYPOINT ["java","-jar","/app/vrgamesapp-0.0.1-SNAPSHOT.jar"]
