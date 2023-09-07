package com.chesstrainer.wrappers

import java.io.BufferedReader
import java.io.BufferedWriter
import java.io.InputStreamReader
import java.io.OutputStreamWriter

class StockfishWrapper {

    private val processBuilder = ProcessBuilder("stockfish")
    private lateinit var process: Process
    private lateinit var reader: BufferedReader
    private lateinit var writer: BufferedWriter

    init {
        startEngine()
    }

    private fun startEngine() {
        process = processBuilder.start()
        reader = BufferedReader(InputStreamReader(process.inputStream))
        writer = BufferedWriter(OutputStreamWriter(process.outputStream))
    }

    fun sendCommand(command: String) {
        writer.write(command + "\n")
        writer.flush()
    }

    fun getOutput(waitTime: Long = 500): String {
        try {
            Thread.sleep(waitTime)
            var line: String?
            var output: String = ""
            while (reader.ready().also { line = reader.readLine() } && line != null) {
                output += line + "\n"
            }
            return output
        } catch (ex: Exception) {
            ex.printStackTrace()
        }
        return ""
    }

    fun getBestMove(fen: String, depth: Int = 10): String {
        sendCommand("position fen $fen")
        sendCommand("go depth $depth")
        val output = getOutput()
        return output.split("bestmove ")[1].split(" ")[0]
    }

    fun stopEngine() {
        sendCommand("quit")
        reader.close()
        writer.close()
        process.destroy()
    }
}