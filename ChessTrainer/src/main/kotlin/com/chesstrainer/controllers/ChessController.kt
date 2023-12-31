package com.chesstrainer.controllers

import com.chesstrainer.data.Move
import com.chesstrainer.data.NextMoveRequest
import com.chesstrainer.data.ScoreMoveRequest
import com.chesstrainer.data.ScoreMoveResponse
import com.chesstrainer.services.ChessTrieService
import com.chesstrainer.wrappers.Evaluation
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@CrossOrigin("*")
@RequestMapping("/api/chess")
class ChessController(private val chessTrieService: ChessTrieService) {

    @RequestMapping("/**/{path:[^\\.]*}", "/", "/home")
    fun index(): String? {
        return "forward:/index.html"
    }

    @PostMapping("/evaluate")
    fun validateMove(@RequestBody move: Move): ResponseEntity<Pair<String, Evaluation>> {
        val evaluation = chessTrieService.evaluatePosition(move.fen, move.move)
        return ResponseEntity.ok(evaluation)
    }

    @PostMapping("/next-moves")
    fun getNextMoves(@RequestBody request: NextMoveRequest): ResponseEntity<List<Map<String, Int>>> {
        return ResponseEntity.ok(chessTrieService.nextMovesForSequence(request.sequence, request.fen))
    }

    @PostMapping("/score-move")
    fun scoreMove(@RequestBody request: ScoreMoveRequest): ResponseEntity<ScoreMoveResponse> {
        return ResponseEntity.ok(chessTrieService.scoreMove(request.move, request.previousMoves, request.fen))
    }
}