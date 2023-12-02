package com.chesstrainer.security

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter

@Configuration
@EnableWebSecurity
class SecurityConfig : WebSecurityConfigurerAdapter() {
    @Autowired
    private val userService: UserDetailsService? = null

    @Autowired
    private val jwtRequestFilter: JwtRequestFilter? = null

    @Autowired
    private val encoder: PasswordEncoder? = null

    @Throws(Exception::class)
    override fun configure(auth: AuthenticationManagerBuilder) {
        auth.userDetailsService(userService).passwordEncoder(encoder)
    }

    @Throws(Exception::class)
    override fun configure(http: HttpSecurity) {

        http.cors().and().csrf().disable().authorizeRequests().antMatchers(HttpMethod.OPTIONS, "/api/**").permitAll()
            .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
            .antMatchers(HttpMethod.GET, "/api/search/**").permitAll()
            .antMatchers(HttpMethod.POST, "/api/openings/**").permitAll()
            .antMatchers(HttpMethod.GET, "/api/openings/**").permitAll()
            .antMatchers(HttpMethod.GET, "/api/variations/**").permitAll()
            .antMatchers(HttpMethod.POST, "/api/chess/**").permitAll()
            .antMatchers(HttpMethod.GET, "/api/chess/**").permitAll()
            .antMatchers(HttpMethod.POST, "/api/validate-move").permitAll()
            .antMatchers(HttpMethod.POST, "/authenticate").permitAll()
            .antMatchers("/api/**").authenticated().anyRequest().permitAll().and().sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter::class.java)
    }

    @Bean
    @Throws(Exception::class)
    override fun authenticationManagerBean(): AuthenticationManager {
        return super.authenticationManagerBean()
    }
}
