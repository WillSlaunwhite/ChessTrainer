package com.chesstrainer.services

import com.chesstrainer.entities.Opening
import com.chesstrainer.repositories.OpeningRepository
import org.springframework.stereotype.Service

@Service
class OpeningService(private val openingRepository: OpeningRepository) {
    fun getOpeningByName(name: String): Opening? {
        return openingRepository.findByName(name)
    }
}