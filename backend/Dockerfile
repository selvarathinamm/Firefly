# ===============================
# VVFirefly Backend Dockerfile
# ===============================

# 1️⃣ Base image: lightweight Java 17 (Alpine)
FROM eclipse-temurin:17-jdk-alpine

# 2️⃣ Set the working directory inside the container
WORKDIR /app

# 3️⃣ Copy the project files into the container
COPY . .

# 4️⃣ Give executable permission to Maven wrapper and build the Spring Boot app
RUN chmod +x mvnw && ./mvnw clean package -DskipTests

# 5️⃣ Expose port 8080 (Render will map this automatically)
EXPOSE 8080

# 6️⃣ Run the Spring Boot JAR file
CMD ["java", "-jar", "target/backend-0.0.1-SNAPSHOT.jar"]
