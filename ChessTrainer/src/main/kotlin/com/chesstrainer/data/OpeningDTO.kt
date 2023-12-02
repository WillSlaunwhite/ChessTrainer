package com.chesstrainer.data

import com.chesstrainer.entities.Variation

open class OpeningDTO(
    val id: Long,
    val name: String,
    val description: String? = null,
    val baseMovesSequence: List<String>,
    val variations: List<Variation>,
    val difficulty: String?
)
