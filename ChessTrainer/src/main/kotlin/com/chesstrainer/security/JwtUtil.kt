package com.chesstrainer.security

import com.chesstrainer.entities.UserDetailsImpl
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.io.Decoders
import io.jsonwebtoken.security.Keys
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.core.Authentication
import org.springframework.stereotype.Component
import java.security.Key
import java.util.*


@Component
class JwtUtil {
    @Value("\${JWT_SECRET}")
    private lateinit var jwtSecret: String
    private val jwtExpirationMs: Int = 86400000
    private val logger = LoggerFactory.getLogger(JwtUtil::class.java)

    fun generateJwtToken(authentication: Authentication): String {
        val userPrincipal = authentication.principal as UserDetailsImpl
        val keyBytes = Decoders.BASE64.decode(jwtSecret)
        val key: Key = Keys.hmacShaKeyFor(keyBytes)

        return Jwts.builder()
            .setSubject(userPrincipal.username)
            .setIssuedAt(Date())
            .setExpiration(Date(System.currentTimeMillis() + jwtExpirationMs))
            .signWith(key)
            .compact()
    }

    fun getUserNameFromJwtToken(token: String): String {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJwt(token).body.subject
    }

    fun validateJwtToken(authToken: String): Boolean {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJwt(authToken)
            return true
        } catch (ex: Exception) {
            // TODO need to handle token parsing exceptions
            logger.error("Invalid JWT Token: {}", ex.message)
        }
        return false
    }
}