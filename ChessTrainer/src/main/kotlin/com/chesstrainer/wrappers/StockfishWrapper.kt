package com.chesstrainer.wrappers

import java.io.BufferedReader
import java.io.BufferedWriter
import java.io.Closeable
import java.io.InputStreamReader
import java.io.OutputStreamWriter

class StockfishWrapper : Closeable {

    private val processBuilder = ProcessBuilder("stockfish")
    private lateinit var process: Process
    private lateinit var reader: BufferedReader
    private lateinit var writer: BufferedWriter


    init {
        startEngine()
    }

    fun evaluate(fen: String): Pair<String, Evaluation> {
        sendCommand("position fen $fen")
        sendCommand("go depth 16")
        val output = getOutput(10000)
        val splitOutput = output.split("bestmove ")
        var evaluation = Evaluation(0.0, "")
        val bestMove: String

        if (splitOutput.size > 1) {
            bestMove = splitOutput[1].split(" ")[0]
//        val bestMove = output.split("bestmove ")[1].split(" ")[0]
            println("SPLIT OUTPUT $splitOutput")
            evaluation = parseEvaluation(output)
        } else {
            println("Failed to parse Stockfish output: $output")
            bestMove = "error"
        }

        return Pair(bestMove, evaluation)
    }

    private fun startEngine() {
        process = processBuilder.start()
        reader = BufferedReader(InputStreamReader(process.inputStream))
        reader.readLine()
        writer = BufferedWriter(OutputStreamWriter(process.outputStream))
    }

    private fun clearInitialMessages() {
        while (reader.ready()) {
            reader.readLine()
        }
    }

    private fun parseEvaluation(output: String): Evaluation {
        val scorePatternCp = "score cp (-?\\d+)".toRegex()
        val pvPattern = " pv (.+)".toRegex()

        val cpMatch = scorePatternCp.find(output)
        val pvMatch = pvPattern.find(output)

        val cpValue = cpMatch?.groups?.get(1)?.value?.toDoubleOrNull()
        val pvValue = pvMatch?.groups?.get(1)?.value

        return Evaluation(cpValue, pvValue)
    }

    private fun sendCommand(command: String) {
        writer.write(command + "\n")
        writer.flush()
    }

    private fun getOutput(timeoutMillis: Long = 5000): String {
        val endTime = System.currentTimeMillis() + timeoutMillis
        var output = ""
        while (System.currentTimeMillis() < endTime) {
            if (reader.ready()) {
                val line: String = reader.readLine()
                output += "$line\n"
                if (line.contains("bestmove")) break
            }
        }
        println("GET OUTPUT: $output")
        return output
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
