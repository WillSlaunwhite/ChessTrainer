package com.chesstrainer.utils

import com.chesstrainer.entities.ChessGame
import java.io.File

fun main() {
    val games = readAndParsePGN("/Users/tristan/Projects/ChessTrainer/pgn-files/test.pgn")
    println("Parsed ${games.size} games")
    games.forEach { game ->
        println("Game between ${game.white} and ${game.black} ended with result ${game.result}. Moves: ${game.moves}")
    }
}


fun parsePGN(pgnContent: List<String>): List<ChessGame> {
    val games = mutableListOf<ChessGame>()
    val currentGameMetadata = mutableMapOf<String, String>()
    val currentMoves = mutableListOf<String>()

    for (line in pgnContent) {
        when {
            line.startsWith("[") -> {
                val key = line.substringAfter("[").substringBefore(" ").trim()
                val value = line.substringAfter("\"").substringBeforeLast("\"").trim()
                currentGameMetadata[key] = value
                if (key == "ECO") {
                    println("ECO ECO ECO")
                }
            }

            line.contains(Regex("[0-9]")) -> {
                val allWords = line.split(" ")
                allWords.forEach { word ->
                    if(word.matches(Regex(" [0-1]-[0-1]|1/2-1/2"))) {
                        println("RESULT RESULT RESULT $word")
                    }
                }
            }

//            line.contains(Regex("[01]-[01]|1/2-1/2")) -> {
//                currentMoves.add(line.trim())
//                val game: ChessGame =
//                    ChessGame(
//                        event = currentGameMetadata["Event"],
//                        site = currentGameMetadata["Site"],
//                        date = currentGameMetadata["Date"],
//                        round = currentGameMetadata["Round"],
//                        white = currentGameMetadata["White"] ?: "",
//                        black = currentGameMetadata["Black"] ?: "",
//                        result = line.trim(),
//                        whiteElo = currentGameMetadata["WhiteElo"] ?: "",
//                        blackElo = currentGameMetadata["BlackElo"] ?: "",
//                        eco = currentGameMetadata["ECO"] ?: "",
//                        moves = currentMoves
//                    )
//                games.add(
//                    game
//                )
//                currentGameMetadata.clear()
//                currentMoves.clear()
//            }

            else -> {
                val allMoves = line.split(" ")
                if (line.contains(Regex(" [0-1]-[0-1]")) || line.contains(Regex("1/2-1/2"))) {
                    allMoves.forEach { word ->
                        if (!word.contains(Regex("[0-1]-[0-1]")) && !word.contains("1/2-1/2") && !word.contains(Regex("^\\d+\\."))) {
                            currentMoves.add(word)
                        } else {
                            println("MOVES BLOCK MOVES BLOCK MOVES BLOCK $currentMoves")
                            println("MOVES BLOCK LINE MOVES BLOCK LINE MOVES BLOCK LINE $line")
                            currentMoves.add(line.trim())
                        }
                    }
                } else {
                    println("MATCH MATCH MATCH $currentGameMetadata")
                    println("LINE LINE LINE $line")
                    val game: ChessGame =
                        ChessGame(
                            event = currentGameMetadata["Event"],
                            site = currentGameMetadata["Site"],
                            date = currentGameMetadata["Date"],
                            round = currentGameMetadata["Round"],
                            white = currentGameMetadata["White"] ?: "",
                            black = currentGameMetadata["Black"] ?: "",
                            result = line.trim(),
                            whiteElo = currentGameMetadata["WhiteElo"] ?: "",
                            blackElo = currentGameMetadata["BlackElo"] ?: "",
                            eco = currentGameMetadata["ECO"] ?: "",
                            moves = currentMoves
                        )
                    println("GAME GAME GAME $game")
                    games.add(
                        game
                    )
                    currentGameMetadata.clear()
                    currentMoves.clear()

                }
            }
        }
    }
    println("end $games")
    return games
}

public fun readAndParsePGN(filePath: String): List<ChessGame> {
    val lines = File(filePath).readLines()
    return parsePGN(lines)
}