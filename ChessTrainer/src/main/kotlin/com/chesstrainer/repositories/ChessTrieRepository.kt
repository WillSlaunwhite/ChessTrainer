package com.chesstrainer.repositories

import com.chesstrainer.datastructures.ChessTrie
import org.springframework.stereotype.Service
import javax.annotation.PostConstruct

@Service
class ChessTrieRepository(private val masterGameRepo: MasterGameRepository) {
    val trie: ChessTrie = ChessTrie()

    @PostConstruct
    fun initialize() {
        masterGameRepo.findAll().forEach { game ->
            trie.insert(game.moves.take(40))
        }
    }

    fun nextMoves(currentMoves: List<String>): Map<String, Int> {
        return trie.findNextMoves(currentMoves)
    }
}