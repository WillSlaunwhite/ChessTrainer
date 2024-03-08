package com.chesstrainer.services

import com.chesstrainer.data.DetailedOpeningDTO
import com.chesstrainer.data.OpeningDTO
import com.chesstrainer.repositories.MasterGameRepository
import com.chesstrainer.repositories.OpeningRepository
import com.chesstrainer.utils.convertToDetailedOpeningDTO
import com.chesstrainer.utils.convertToOpeningDTO
import org.springframework.stereotype.Service

@Service
class OpeningService(
    private val openingRepository: OpeningRepository,
    private val masterGameRepo: MasterGameRepository
) {
    fun getOpeningByName(name: String): OpeningDTO? {
        val opening = openingRepository.findByName(name)
        return if (opening != null) convertToOpeningDTO(opening) else null
    }


    fun getDetailedOpeningByName(name: String): DetailedOpeningDTO? {
        val opening = openingRepository.findByName(name)

        return if (opening != null) {
            val games = masterGameRepo.findByOpening(opening)
            opening.masterGames.addAll(games)
            convertToDetailedOpeningDTO(opening)
        } else {
            null
        }
    }

    fun getOpenings(): List<OpeningDTO> {
        return openingRepository.findAll().map { convertToOpeningDTO(it) }
    }
}