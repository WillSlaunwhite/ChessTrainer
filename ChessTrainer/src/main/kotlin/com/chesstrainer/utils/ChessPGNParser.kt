package com.chesstrainer.utils

import com.chesstrainer.entities.ChessGame

fun parsePGN(pgnContent: List<String>) {
    val games = mutableListOf<ChessGame>()
    val currentGameMetadata = mutableMapOf<String, String>()
    var currentMoves = mutableListOf<String>()
    for (line in pgnContent) {
        when {
            line.startsWith("[") -> {
                val key = line.substringAfter("[").substringBefore(" ").trim()
                val value = line.substringAfter("\"").substringBeforeLast("\"").trim()
                currentGameMetadata[key] = value
            }

            line.matches(Regex("[01]-[01]|1/2-1/2")) -> {  // Recognize results
                currentMoves.add(line.trim())
                games.add(
                    ChessGame(
                        event = currentGameMetadata["Event"],
                        site = currentGameMetadata["Site"],
                        date = currentGameMetadata["Date"],
                        round = currentGameMetadata["Round"],
                        white = currentGameMetadata["White"] ?: "",
                        black = currentGameMetadata["Black"] ?: "",
                        result = currentGameMetadata["Result"] ?: "",
                        whiteElo = currentGameMetadata["WhiteElo"]!!,
                        blackElo = currentGameMetadata["BlackElo"]!!,
                        eco = currentGameMetadata["ECO"]!!,
                        moves = currentMoves
                    )
                )
                currentGameMetadata.clear()
                currentMoves.clear()
            }
            else -> currentMoves.add(line.trim())
        }
    }
    return games
}