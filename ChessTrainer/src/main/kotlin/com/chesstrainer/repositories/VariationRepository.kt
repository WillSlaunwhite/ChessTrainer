package com.chesstrainer.repositories

import com.chesstrainer.entities.Opening
import com.chesstrainer.entities.Variation
import org.springframework.data.jpa.repository.JpaRepository

interface VariationRepository : JpaRepository<Variation, Long> {
    fun findByName(name: String): Variation?
    fun findByOpening(opening: Opening): List<Variation> = listOf()
}