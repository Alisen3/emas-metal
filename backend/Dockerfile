# -------- BUILD STAGE --------
    FROM gradle:8.7-jdk21 AS build
    WORKDIR /app
    
    # Cache için önce build dosyaları
    COPY build.gradle settings.gradle ./
    # Eğer gradle dosyalarında extra dosyalar (gradle.properties, settings.gradle.kts vs.) varsa ekle
    
    # Bağımlılık cache (projende wrapper yok, bu yüzden gradle image kullanıyoruz)
    RUN gradle dependencies --no-daemon || true
    
    # Kaynak kod
    COPY src ./src
    
    # Build (Spring Boot ise bootJar, değilse jar)
    RUN gradle clean bootJar -x test --no-daemon
    
    # -------- RUNTIME STAGE --------
    FROM eclipse-temurin:21-jre
    WORKDIR /app
    
    RUN mkdir -p /app/uploads
    
    COPY --from=build /app/build/libs/*.jar app.jar
    
    EXPOSE 8080
    ENTRYPOINT ["java","-jar","app.jar"]
    