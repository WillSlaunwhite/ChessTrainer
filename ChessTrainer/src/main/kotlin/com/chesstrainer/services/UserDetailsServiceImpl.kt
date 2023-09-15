package com.chesstrainer.services

import com.chesstrainer.entities.UserDetailsImpl
import com.chesstrainer.repositories.UserRepository
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Service

@Service
class UserDetailsServiceImpl(
    private val userRepository: UserRepository
) : UserDetailsService {

    override fun loadUserByUsername(username: String?): UserDetails {
       val user = userRepository.findByUsername(username)

        return UserDetailsImpl.build(user)
    }
}