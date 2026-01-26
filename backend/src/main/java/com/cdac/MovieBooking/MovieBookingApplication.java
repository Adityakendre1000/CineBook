package com.cdac.MovieBooking;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
@SpringBootApplication
public class MovieBookingApplication {

    public static void main(String[] args) {
        SpringApplication.run(MovieBookingApplication.class, args);
    }

    @Bean
        //method level annotation - to declare a method returning java object
    ModelMapper modelMapper()
    {
        ModelMapper mapper=new ModelMapper();
        //configure mapper - to transfer the matching props (name + data type)
        mapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.STRICT)
                //configure mapper - not to transfer nulls from src -> dest
                .setPropertyCondition(Conditions.isNotNull());
        return mapper;//Method rets configured ModelMapper bean to SC
    }
    //Swagger config for authorization of JWT session
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .components(new Components()
                        .addSecuritySchemes("bearerAuth",
                                new SecurityScheme()
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")))
                .addSecurityItem(new SecurityRequirement().addList("bearerAuth"));
    }

}
