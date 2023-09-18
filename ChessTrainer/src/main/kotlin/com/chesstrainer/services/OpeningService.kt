package com.chesstrainer.services

import com.chesstrainer.data.OpeningDTO
import com.chesstrainer.repositories.OpeningRepository
import com.chesstrainer.utils.convertToOpeningDTO
import org.springframework.stereotype.Service

@Service
class OpeningService(private val openingRepository: OpeningRepository) {
    fun getOpeningByName(name: String): OpeningDTO? {
        val opening = openingRepository.findByName(name)
        return when {
            opening != null -> convertToOpeningDTO(opening)
            else -> null
        }
    }

    fun getOpenings(): List<OpeningDTO>{
        return openingRepository.findAll().map{ convertToOpeningDTO(it) }
    }
}