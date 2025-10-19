# ============================
# VVFirefly Backend Dockerfile
# ============================

# 1️⃣ Base image with Java 17
FROM eclipse-temurin:17-jdk-alpine

# 2️⃣ Set working directory
WORKDIR /app

# 3️⃣ Copy Maven wrapper and project files
COPY . .

# 4️⃣ Build the Spring Boot app
RUN ./mvnw clean package -DskipTests

# 5️⃣ Expose port 8080 (Render uses this)
EXPOSE 8080

# 6️⃣ Start the app using the generated JAR file
CMD ["java", "-jar", "target/backend-0.0.1-SNAPSHOT.jar"]
