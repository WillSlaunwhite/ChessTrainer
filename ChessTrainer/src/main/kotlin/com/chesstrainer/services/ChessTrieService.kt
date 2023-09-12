package com.chesstrainer.services

import com.chesstrainer.datastructures.ChessTrie
import com.chesstrainer.entities.MasterGame
import com.chesstrainer.repositories.MasterGameRepository
import com.chesstrainer.wrappers.Evaluation
import com.chesstrainer.wrappers.StockfishWrapper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor
import org.springframework.stereotype.Service
import java.util.concurrent.Future
import javax.annotation.PostConstruct
import javax.annotation.PreDestroy

@Service
class ChessTrieService(private val masterGameRepo: MasterGameRepository) {
    private val trie: ChessTrie = ChessTrie()

    @Autowired
    @Qualifier("stockfishExecutor")
    private lateinit var stockfishExecutor: ThreadPoolTaskExecutor


    fun evaluatePosition(fen: String, move: String): Pair<String, Evaluation> {
        val future: Future<Pair<String, Evaluation>> = stockfishExecutor.submit<Pair<String, Evaluation>> {
            val stockfish = StockfishWrapper()
            val result = stockfish.evaluate(fen)
            stockfish.close()
            result
        }

        return future.get()
    }

    fun nextMovesForSequences(moveSequences: List<List<String>>): List<Map<String, Int>> {
        return moveSequences.map { trie.findNextMoves(it) }
    }


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
        stockfishExecutor.shutdown()
    }
}