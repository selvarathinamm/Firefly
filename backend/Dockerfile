# ============================================================
# 🚀 VVFirefly Backend - Production Dockerfile (Render-ready)
# ============================================================

# 1️⃣ Base image: lightweight Java 17
FROM eclipse-temurin:17-jdk-alpine AS build

# 2️⃣ Set work directory
WORKDIR /app

# 3️⃣ Copy Maven wrapper & project files
COPY . .

# 4️⃣ Build Spring Boot app (skip tests)
RUN chmod +x mvnw && ./mvnw clean package -DskipTests

# ============================================================
# 5️⃣ Runtime stage (smaller final image)
# ============================================================
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy only the built JAR from the previous stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port (Render auto-maps this)
EXPOSE 8080

# Run the Spring Boot app
CMD ["java", "-jar", "app.jar"]
