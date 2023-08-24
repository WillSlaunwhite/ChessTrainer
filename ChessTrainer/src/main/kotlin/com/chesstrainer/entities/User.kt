package com.chesstrainer.entities

import com.chesstrainer.enums.Role
import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
data class User(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int,
    val username: String,
    val password: String,
    val role: String,
    val email: String,
    @Column(name = "registration_date")
    val registrationDate: LocalDateTime,
    @Column(name = "last_login")
    val lastLogin: LocalDateTime,
    val preferences: String
)

