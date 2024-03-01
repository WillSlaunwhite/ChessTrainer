package com.chesstrainer.wrappers

import java.io.*


class StockfishWrapper : Closeable {
    private val possiblePaths = listOf("/usr/games/stockfish", "/usr/local/bin/stockfish", "stockfish")
    private lateinit var processBuilder: ProcessBuilder
    private lateinit var process: Process
    private lateinit var reader: BufferedReader
    private lateinit var writer: BufferedWriter

    init {
        var foundExecutable = false
        for (path in possiblePaths) {
            try {
                // Attempt to start a process with the given path to truly test if it's executable
                val testProcess = ProcessBuilder(path).start()
                testProcess.destroy() // Immediately destroy the test process if successful
                processBuilder = ProcessBuilder(path) // Initialize the actual process builder with the valid path
                foundExecutable = true
                break // Exit the loop since we've found a valid executable
            } catch (e: IOException) {
                // This path didn't work, try the next one
            }
        }

        if (!foundExecutable) {
            throw IllegalStateException("Could not find Stockfish executable in any known location.")
        }

//        this.startEngine() // Start the engine with the found executable
    }

    fun evaluate(fen: String, move: String): Pair<String, Evaluation> {
//        this.startEngine()

        try {
            sendCommand("position fen $fen moves $move")
            sendCommand("go depth 14")
            val output = getOutputUntilBestMove()

            val bestMove = extractBestMove(output)
            val evaluation = parseEvaluation(output)

            return Pair(bestMove, evaluation)
        } finally {
//            this.stopEngine()
        }
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
            if (line.contains("depth")) {
                if (line.contains("score cp")) {
                    lastEvaluation = Evaluation(extractEvaluation(line), extractPrincipalVariation(line))
                } else if (line.contains("score mate")) {
                    val mateInMoves = extractMateInMoves(line)
                    lastEvaluation = Evaluation(null, extractPrincipalVariation(line))
                }
            }
        }
//        return lastEvaluation ?: throw Exception("Failed to parse Stockfish output.")
        return lastEvaluation ?: Evaluation(0.0, "MATE")
    }

    private fun extractMateInMoves(line: String): Int? {
        val pattern = "score mate (-?\\d+)".toRegex()
        val match = pattern.find(line)
        return match?.groups?.get(1)?.value?.toIntOrNull()
    }

    private fun getOutputUntilBestMove(): String {
        val output = StringBuilder()
        while (true) {
            val line = reader.readLine() ?: break
            output.append(line).append("\n")
            if (line.contains("bestmove")) break
        }
        return output.toString()
    }


    // HELPER FUNCTIONS
    private fun extractDepth(line: String): Int? {
        val pattern = "depth (\\d+)".toRegex()
        val match = pattern.find(line)
        return match?.groups?.get(1)?.value?.toIntOrNull()
    }

    private fun extractEvaluation(line: String): Double? {
        val pattern = "score cp (-?\\d+)".toRegex()
        val match = pattern.find(line)
        return match?.groups?.get(1)?.value?.toDoubleOrNull()
    }

    private fun extractNodes(line: String): Int? {
        val pattern = "nodes (\\d+)".toRegex()
        val match = pattern.find(line)
        return match?.groups?.get(1)?.value?.toIntOrNull()
    }

    private fun extractTime(line: String): Int? {
        val pattern = "time (\\d+)".toRegex()
        val match = pattern.find(line)
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
        process = processBuilder.start() // Start the process here
        reader = BufferedReader(InputStreamReader(process.inputStream))
        writer = BufferedWriter(OutputStreamWriter(process.outputStream))
        clearInitialMessages()
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
//        stopEngine()
    }
}

data class Evaluation(val centipawns: Double?, val principalVariation: String?)
