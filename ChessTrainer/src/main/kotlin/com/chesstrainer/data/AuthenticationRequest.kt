package com.skilldistillery.marketplace.security

data class AuthenticationRequest (
    val username: String,
    val password: String
)
