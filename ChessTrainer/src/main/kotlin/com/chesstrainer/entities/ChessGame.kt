package com.chesstrainer.entities

import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id

data class ChessGame(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,
    val event: String?,
    val site: String?,
    val date: String?,
    val round: String?,
    val white: String,
    val black: String,
    val result: String,
    val whiteElo: String,
    val blackElo: String,
    val eco: String,
    val moves: List<String>,
) {}