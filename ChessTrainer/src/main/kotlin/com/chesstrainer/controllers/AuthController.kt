package com.chesstrainer.controllers

import com.chesstrainer.data.AuthenticationRequest
import com.chesstrainer.data.AuthenticationResponse
import com.chesstrainer.data.JwtResponse
import com.chesstrainer.data.LoginRequest
import com.chesstrainer.entities.UserDetailsImpl
import com.chesstrainer.security.JwtUtil
import com.chesstrainer.services.UserDetailsServiceImpl
import com.skilldistillery.marketplace.exceptions.UserNotFoundException
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.*

@RestController
@CrossOrigin("*", "http://localhost")
class AuthController(
    private val authenticationManager: AuthenticationManager,
    private val jwtUtil: JwtUtil,
    private val userService: UserDetailsServiceImpl
) {

    @PostMapping("/authenticate")
    fun createAuthenticationToken(@RequestBody authenticationRequest: AuthenticationRequest): ResponseEntity<AuthenticationResponse> {
        runCatching {
            authenticationManager.authenticate(
                UsernamePasswordAuthenticationToken(authenticationRequest.username, authenticationRequest.password)
            )
        }.getOrElse {
            throw Exception("Incorrect username or password.")
        }

        val userDetails = userService.loadUserByUsername(authenticationRequest.username)

        val jwt = jwtUtil.generateToken(userDetails)
        println("jwt: $jwt")
        return ResponseEntity.ok(AuthenticationResponse(jwt))
    }
}