package com.chesstrainer.services

import com.chesstrainer.datastructures.ChessTrie
import com.chesstrainer.entities.MasterGame
import com.chesstrainer.repositories.MasterGameRepository
import com.chesstrainer.wrappers.Evaluation
import com.chesstrainer.wrappers.StockfishWrapper
import org.springframework.stereotype.Service
import javax.annotation.PostConstruct
import javax.annotation.PreDestroy

@Service
class ChessTrieService(private val masterGameRepo: MasterGameRepository) {
    private val stockfish = StockfishWrapper()
    val trie: ChessTrie = ChessTrie()

    @PostConstruct
    fun initialize() {
        // CREATES TRIE
        val games: MutableList<MasterGame> = masterGameRepo.findAll()
        games.forEach { game ->
            trie.insert(game.moves.take(40))
        }
    }

    @PreDestroy
    fun teardown() {
        stockfish.close()
    }

    fun nextMovesForSequences(moveSequences: List<List<String>>): List<Map<String, Int>> {
        return moveSequences.map { trie.findNextMoves(it) }
    }

    fun evaluatePosition(fen: String, move: String): Evaluation {
        return stockfish.evaluatePosition(fen)
    }
}