package com.chesstrainer.repositories

import com.chesstrainer.entities.User
import org.springframework.data.jpa.repository.JpaRepository

interface UserRepository : JpaRepository<User, Int> {
    fun findByUsername(username: String?): User
}