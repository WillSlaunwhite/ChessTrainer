package com.chesstrainer.services

import com.chesstrainer.wrappers.StockfishWrapper
import org.springframework.stereotype.Service

@Service
class ChessService {
    private val stockfish = StockfishWrapper()

    fun evaluatePosition(fen: String, move: String): Double {
        StockfishWrapper().use { stockfish ->
            return stockfish.evaluatePosition(fen)
        }
    }
}