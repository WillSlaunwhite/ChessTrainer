package com.chesstrainer.services

import com.chesstrainer.entities.Opening
import com.chesstrainer.entities.Variation
import com.chesstrainer.repositories.OpeningRepository
import com.chesstrainer.repositories.VariationRepository
import com.chesstrainer.utils.convertToOpeningDTO
import org.springframework.stereotype.Service

@Service
class VariationService(private val variationRepo: VariationRepository, private val openingRepo: OpeningRepository) {

    fun getVariationByName(name: String): Variation? {
        return variationRepo.findByName(name)
    }

    fun getVariationByOpening(name: String): List<Variation> {
        val opening: Opening? = openingRepo.findByName(name)
        return when {
            opening != null -> variationRepo.findByOpening(opening)
            else -> listOf()
        }
    }
}