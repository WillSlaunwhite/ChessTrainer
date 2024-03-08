package com.chesstrainer.repositories

import com.chesstrainer.entities.Opening
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface OpeningRepository : JpaRepository<Opening, Long> {
    fun findByName(name: String): Opening?
}