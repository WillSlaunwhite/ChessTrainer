package com.chesstrainer.services

import com.chesstrainer.datastructures.ChessTrie
import com.chesstrainer.entities.MasterGame
import com.chesstrainer.enums.MoveClassification
import com.chesstrainer.repositories.MasterGameRepository
import com.chesstrainer.wrappers.Evaluation
import com.chesstrainer.wrappers.StockfishWrapper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor
import org.springframework.stereotype.Service
import java.util.concurrent.Future
import java.util.concurrent.LinkedBlockingQueue
import javax.annotation.PostConstruct
import javax.annotation.PreDestroy

@Service
class ChessTrieService(private val masterGameRepo: MasterGameRepository) {
    private val trie: ChessTrie = ChessTrie()
    private val stockfishPool = LinkedBlockingQueue<StockfishWrapper>()

    init {
        for (i in 1..3) {
            stockfishPool.offer(StockfishWrapper())
        }
    }


    companion object {

        const val COMMON_MOVE_THRESHOLD = 5000  // If a move has been played more than this, it's common
        const val PLAYABLE_MOVE_THRESHOLD = 1000  // If a move has been played more than this, it's playable
    }



    fun evaluatePosition(fen: String, move: String): Pair<String, Evaluation> {
        val stockfish = stockfishPool.take()
        val result = stockfish.evaluate(fen, move)
//        println(classifyMove(result.second, ))
        stockfishPool.offer(stockfish)
        return result
    }

    fun classifyMove(evaluation: Evaluation, moveFrequency: Int): MoveClassification {
        val pv = evaluation.principalVariation
        val cp = evaluation.centipawns

        if (moveFrequency > COMMON_MOVE_THRESHOLD) {
            return MoveClassification.BOOK_MOVE
        }

        if (cp != null) {
            return when {
//                cp <= BEST_MOVE_THRESHOLD -> MoveClassification.BEST_MOVE
//                cp <= GOOD_MOVE_THRESHOLD -> MoveClassification.VERY_GOOD_MOVE
//                cp <= INACCURACY_THRESHOLD -> MoveClassification.GOOD_MOVE
//                cp > BLUNDER_THRESHOLD -> MoveClassification.BLUNDER
                else -> MoveClassification.INACCURACY
            }
        }

        return MoveClassification.ERROR
    }

    fun nextMovesForSequences(moveSequences: List<String>): Map<String, Int> {
        return  trie.findNextMoves(moveSequences)
    }

//    private fun convertFenToMovesSequence(fen: String): List<String> {
//
//    }

    @PostConstruct
    fun initialize() {
        // CREATES TRIE
        val games: MutableList<MasterGame> = masterGameRepo.findAll()
        games.forEach { game ->
            trie.insert(game.moves.take(40))
        }
    }
}