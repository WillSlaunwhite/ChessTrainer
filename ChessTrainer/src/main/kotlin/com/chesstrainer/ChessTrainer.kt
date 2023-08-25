package com.chesstrainer

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.domain.EntityScan
import org.springframework.boot.builder.SpringApplicationBuilder
import org.springframework.boot.runApplication
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.PropertySource
import org.springframework.data.jpa.repository.config.EnableJpaRepositories
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder

@SpringBootApplication
@PropertySource("classpath:secrets.properties")
@EntityScan("com.chesstrainer.entities")
@EnableJpaRepositories("com.chesstrainer.repositories")
@ComponentScan("com.chesstrainer.controllers", "com.chesstrainer.security", "com.chesstrainer.services")
class ChessTrainer : SpringBootServletInitializer() {
    override fun configure(builder: SpringApplicationBuilder): SpringApplicationBuilder {
        return builder.sources(ChessTrainer::class.java)
    }

    @Bean
    fun configurePasswordEncoder(): PasswordEncoder {
        return BCryptPasswordEncoder()
    }

    companion object {
        @JvmStatic
        fun main(args: Array<String>) {
            SpringApplication.run(ChessTrainer::class.java, *args)
        }
    }
}
