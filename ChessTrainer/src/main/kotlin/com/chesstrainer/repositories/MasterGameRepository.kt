package com.chesstrainer.repositories

import com.chesstrainer.entities.MasterGame
import org.springframework.data.jpa.repository.JpaRepository

interface MasterGameRepository : JpaRepository<MasterGame, Long> {
}