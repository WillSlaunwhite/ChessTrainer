package com.chesstrainer.entities

import com.chesstrainer.enums.Role

data class User(val id: Int, val username: String, val password: String, val roles: Set<Role> = setOf(Role.USER))
