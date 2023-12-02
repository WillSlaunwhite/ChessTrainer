package com.chesstrainer.wrappers

import java.io.*


class StockfishWrapper : Closeable {
    private val processBuilder = ProcessBuilder("stockfish")
    private lateinit var process: Process
    private lateinit var reader: BufferedReader
    private lateinit var writer: BufferedWriter

    init {
        startEngine()
        clearInitialMessages()
    }

    fun evaluate(fen: String, move: String): Pair<String, Evaluation> {
        println("MOVE MOVE MOVE MOVE MOVE MOVE MOVE MOVE  $move")
        sendCommand("position fen $fen moves $move")
        sendCommand("go depth 16")
        val output = getOutputUntilBestMove()

        val bestMove = extractBestMove(output)
        val evaluation = parseEvaluation(output)

        return Pair(bestMove, evaluation)
    }

    private fun extractBestMove(output: String): String {
        // using trie for this instead, keeping just in case
        val pattern = "bestmove (\\S+)".toRegex()
        val match = pattern.find(output)
        return match?.groups?.get(1)?.value ?: "error"
    }

    private fun parseEvaluation(stockfishOutput: String): Evaluation {
        var lastEvaluation: Evaluation? = null

        for (line in stockfishOutput.split("\n")) {
            if (line.contains("depth") && line.contains("score cp")) {
                lastEvaluation = Evaluation(extractEvaluation(line), extractPrincipalVariation(line))
            }
        }
        return lastEvaluation ?: throw Exception("Failed to parse Stockfish output.")
    }


    private fun getOutputUntilBestMove(): String {
        val output = StringBuilder()
        while (true) {
            val line = reader.readLine() ?: break
            println("LINE $line")
            output.append(line).append("\n")
            if (line.contains("bestmove")) break
        }
        return output.toString()
    }


    // HELPER FUNCTIONS
    private fun extractDepth(line: String): Int? {
        val pattern = "depth (\\d+)".toRegex()
        val match = pattern.find(line)
        println("EXTRACT DEPTH ${match?.groups?.get(1)?.value?.toIntOrNull()}")
        return match?.groups?.get(1)?.value?.toIntOrNull()
    }

    private fun extractEvaluation(line: String): Double? {
        val pattern = "score cp (-?\\d+)".toRegex()
        val match = pattern.find(line)
        println("EXTRACT EVALUATION ${match?.groups?.get(1)?.value?.toDoubleOrNull()}")
        return match?.groups?.get(1)?.value?.toDoubleOrNull()
    }

    private fun extractNodes(line: String): Int? {
        val pattern = "nodes (\\d+)".toRegex()
        val match = pattern.find(line)
        println("EXTRACT NODES ${match?.groups?.get(1)?.value?.toIntOrNull()}")
        return match?.groups?.get(1)?.value?.toIntOrNull()
    }

    private fun extractTime(line: String): Int? {
        val pattern = "time (\\d+)".toRegex()
        val match = pattern.find(line)
        println("EXTRACT TIME ${match?.groups?.get(1)?.value?.toIntOrNull()}")
        return match?.groups?.get(1)?.value?.toIntOrNull()
    }

    private fun extractPrincipalVariation(line: String): String? {
        val pattern = " pv (.+)".toRegex()
        val match = pattern.find(line)
        return match?.groups?.get(1)?.value
    }

    private fun sendCommand(command: String) {
        writer.write("$command\n")
        writer.flush()
    }

    private fun startEngine() {
        process = processBuilder.start()
        reader = BufferedReader(InputStreamReader(process.inputStream))
        writer = BufferedWriter(OutputStreamWriter(process.outputStream))
    }

    private fun clearInitialMessages() {
        while (reader.ready()) {
            reader.readLine()
        }
    }

    private fun stopEngine() {
        try {
            sendCommand("quit")
        } finally {
            reader.close()
            writer.close()
            process.destroy()
        }
    }

    override fun close() {
        stopEngine()
    }
}

data class Evaluation(val centipawns: Double?, val principalVariation: String?)
