package com.chesstrainer.services

import com.chesstrainer.repositories.MasterGameRepository
import org.springframework.stereotype.Service

@Service
class MasterGameService(private val masterGameRepo: MasterGameRepository) {
    fun getMasterGamesByOpeningSequence(moveSequence: List<String>) {
        val games = masterGameRepo.findAll()
    }
}