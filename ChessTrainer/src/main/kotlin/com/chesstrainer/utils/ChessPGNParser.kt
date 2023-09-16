package com.chesstrainer.utils

import com.chesstrainer.entities.ChessGame
import com.chesstrainer.entities.MasterGame
import com.chesstrainer.entities.Opening
import com.chesstrainer.enums.Result
import java.io.File
import java.lang.Double
import java.util.*
import javax.persistence.JoinColumn
import javax.persistence.ManyToOne

fun main() {
    val games = readAndParsePGN("/Users/william/Projects/ChessTrainer/pgn-files/test.pgn")
    println("Parsed ${games.size} games")
    games.forEach { game ->
        println("Game between ${game.white} and ${game.black} ended with result ${game.result}. Moves: ${game.moves}")
    }
}

fun isGameResult(line: String): Boolean {
    return line.contains(Regex("[0-1]-[0-1]|1/2-1/2"))
}

fun parsePGN(pgnContent: List<String>): List<MasterGame> {
    val games = mutableListOf<MasterGame>()
    val currentGameMetadata = mutableMapOf<String, String>()
    val currentMoves = mutableListOf<String>()

    for (line in pgnContent) {
        when {
            line.startsWith("[") -> {
                val key = line.substringAfter("[").substringBefore(" ").trim()
                val value = line.substringAfter("\"").substringBeforeLast("\"").trim()
                currentGameMetadata[key] = value
            }

            isGameResult(line) -> {
                val movesWithResult = line.trim().split(" ")
                val result = movesWithResult.last() // The last element is the game result
                val movesWithoutResult = movesWithResult.dropLast(1).joinToString(" ")

                val moveMatcher =
                    Regex("(\\d+\\.)\\s*([\\w\\+\\#\\-\\=]+)\\s*([\\w\\+\\#\\-\\=]*)").findAll(movesWithoutResult)

                for (match in moveMatcher) {
                    currentMoves.add(match.groupValues[1] + match.groupValues[2])
                    if (match.groupValues[3].isNotEmpty()) {
                        currentMoves.add(match.groupValues[1] + match.groupValues[3])
                    }
                }


//                val id: Long,
//                val event: String? = null,
//                val site: String = "?",
//                val date: String? = null,
//                val round: Int? = null,
//                val white: String,
//                val black: String,
//                val whiteElo: Int? = null,
//                val blackElo: Int? = null,
//                val result: Result,
//                val eco: String,
//                val moves: List<String>,
//                @ManyToOne @JoinColumn(name = "opening_id")
//                val opening: Opening,

                if (result != " ") {
                    val parsedDate = currentGameMetadata["Date"] ?: ""
                    val dateToUse = if (isValidDate(parsedDate)) parsedDate else null

                    val res =
                        if (result.equals("1-0")) Result.WHITE else if (result.equals("0-1")) Result.BLACK else Result.DRAW
                    val game = MasterGame(
                        event = currentGameMetadata["Event"],
                        site = currentGameMetadata["Site"],
                        date = dateToUse,
                        round = currentGameMetadata["Round"] ?: "",
                        white = currentGameMetadata["White"] ?: "",
                        black = currentGameMetadata["Black"] ?: "",
                        result = res,
                        whiteElo = currentGameMetadata["WhiteElo"]?.toIntOrNull(),
                        blackElo = currentGameMetadata["BlackElo"]?.toIntOrNull(),
                        eco = currentGameMetadata["ECO"] ?: "",
                        moves = if (currentMoves.toList().size < 20) currentMoves.toList() else currentMoves.toList()
                            .subList(0, 20),
                        opening = Opening(
                            1,
                            "Italian Game - Main Line",
                            "The Italian Game begins with 1.e4 e5 2.Nf3 Nc6 3.Bc4, emphasizing rapid dvelopment, central control, and a Kingside presence.",
                            listOf("1.e4 e5", "2.Nf3 Nc6", "3.Bc4"),
                            listOf()
                        ),
                    )
                    games.add(game)
                    currentGameMetadata.clear()
                    currentMoves.clear()
                }
            }

            else -> {
                val moveMatcher = Regex("(\\d+\\.)\\s*([\\w\\+\\#\\-\\=]+)\\s*([\\w\\+\\#\\-\\=]*)").findAll(line)
                for (match in moveMatcher) {
                    currentMoves.add(match.groupValues[1] + match.groupValues[2])
                    if (match.groupValues[3].isNotEmpty()) {
                        currentMoves.add(match.groupValues[1] + match.groupValues[3])
                    }
                }
            }

        }
    }
    println("end $games")
    return games
}

fun readAndParsePGN(filePath: String): List<MasterGame> {
    val lines = File(filePath).readLines()
    return parsePGN(lines)
}

fun isValidDate(date: String): Boolean {
    val parts = date.split(".")
    if (parts.size != 3) return false

    val year = parts[0].toIntOrNull() ?: return false
    val month = parts[1].toIntOrNull() ?: return false
    val day = parts[2].toIntOrNull() ?: return false

    val calendar = Calendar.getInstance()
    calendar.set(year, month - 1, day)

    return year == calendar.get(Calendar.YEAR) &&
            month == calendar.get(Calendar.MONTH) + 1 &&
            day == calendar.get(Calendar.DAY_OF_MONTH)
}
