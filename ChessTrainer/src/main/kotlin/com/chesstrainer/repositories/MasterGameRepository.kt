package com.chesstrainer.repositories

import com.chesstrainer.entities.MasterGame
import com.chesstrainer.entities.Opening
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface MasterGameRepository : JpaRepository<MasterGame, Long> {
    override fun getById(id: Long): MasterGame
    fun findByOpening(opening: Opening): List<MasterGame>

}