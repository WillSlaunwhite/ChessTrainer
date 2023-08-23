package com.chesstrainer.security

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity

@Configuration
class WebSecurityConfig {
    @Autowired
    private lateinit var userDetailsService: UserDetailsServiceImpl
}