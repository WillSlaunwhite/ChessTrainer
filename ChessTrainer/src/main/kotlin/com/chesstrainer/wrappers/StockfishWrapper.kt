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


    fun evaluatePosition(fen: String): Double {
        sendCommand("position fen $fen")
        sendCommand("go movetime 5000")
        val output = getOutput(3000) // wait for 5 seconds; adjust as needed

        println("GET OUTPUT: $output") // debug log

        val parseEvaluation = parseEvaluation(output)
        println("PARSE EVAL: $parseEvaluation") // debug log

        return parseEvaluation
    }


    fun getBestMove(fen: String, depth: Int = 10): String {
        sendCommand("position fen $fen")
        sendCommand("go movetime 5000")
        val output = getOutput(5000) // wait for 5 seconds; adjust as needed
        return output.split("bestmove ")[1].split(" ")[0]
    }


    init {
        startEngine()
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

    private fun parseEvaluation(output: String): Double {
        val scorePattern = "score cp (-?\\d+)".toRegex()
        val matches = scorePattern.findAll(output).toList()
        val lastMatch = matches.lastOrNull()?.groups?.get(1)?.value?.toDoubleOrNull()
        return lastMatch ?: 0.0
    }

    private fun sendCommand(command: String) {
        writer.write(command + "\n")
        writer.flush()
    }

    private fun getOutput(waitTime: Long = 500): String {
        try {
            Thread.sleep(waitTime)
            var line: String?
            var output: String = ""
            while (reader.ready().also { line = reader.readLine() } && line != null) {
                output += line + "\n"
            }
            println("GET OUTPUT: $output")
            return output
        } catch (ex: Exception) {
            ex.printStackTrace()
        }
        return ""
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