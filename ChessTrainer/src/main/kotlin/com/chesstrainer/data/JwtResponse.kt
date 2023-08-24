package com.chesstrainer.data

data class JwtResponse(
    val id: Int,
    val token: String,
    val username: String,
    val roles: List<String>
)