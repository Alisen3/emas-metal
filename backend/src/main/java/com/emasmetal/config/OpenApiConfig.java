package com.emasmetal.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "EMAS Metal API",
                version = "1.0.0",
                description = "REST API for EMAS Metal CNC Machining Company website",
                contact = @Contact(
                        name = "EMAS Metal",
                        email = "info@emasmetal.com"
                )
        ),
        servers = {
                @Server(url = "http://localhost:8080", description = "Development Server")
        }
)
@SecurityScheme(
        name = "basicAuth",
        type = SecuritySchemeType.HTTP,
        scheme = "basic",
        description = "Basic authentication for admin endpoints"
)
public class OpenApiConfig {
}
