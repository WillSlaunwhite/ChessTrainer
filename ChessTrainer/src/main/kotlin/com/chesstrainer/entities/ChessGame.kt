package com.chesstrainer.entities

data class ChessGame(
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
    val moves: List<String>
) {}