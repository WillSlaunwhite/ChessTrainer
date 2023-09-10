package com.chesstrainer.datastructures


class ChessTrie {
    val root = ChessTrieNode()

    fun insert(moveSequence: List<String>) {
        var current = root
        for (move in moveSequence) {
            current = current.children.getOrPut(move) { ChessTrieNode() }
            current.frequency++
        }
    }

    fun findNextMoves(moves: List<String>): Map<String, Int> {
        var current = root
        for (move in moves) {
            println("Current Move: $move")
            if (!current.children.containsKey(move)) {
                println("Move $move not found!")
                return mapOf()
            }
            current = current.children[move]!!
        }
        return current.children.mapValues { it.value.frequency }
    }

    fun printTrie(node: ChessTrieNode, prefix: String = "") {
        println("$prefix${if (node.frequency > 0) "($node.frequency)" else ""}")
        for ((move, child) in node.children) {
            printTrie(child, prefix + move + " -> ")
        }
    }

}

class ChessTrieNode {
    var frequency: Int = 0
    var children: MutableMap<String, ChessTrieNode> = mutableMapOf()
}