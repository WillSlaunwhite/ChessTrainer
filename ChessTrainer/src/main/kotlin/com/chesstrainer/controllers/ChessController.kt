package com.chesstrainer.controllers

import com.chesstrainer.data.EvaluationResponse
import com.chesstrainer.data.Move
import com.chesstrainer.data.ValidationResponse
import com.chesstrainer.repositories.ChessTrieRepository
import com.chesstrainer.services.ChessService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@CrossOrigin("*", "http://localhost")
@RequestMapping("/api/chess")
class ChessController(private val chessService: ChessService, private val trieRepository: ChessTrieRepository) {

    @RequestMapping("/**/{path:[^\\.]*}", "/", "/home")
    fun index(): String? {
        return "forward:/index.html"
    }

    @PostMapping("/evaluate")
    fun validateMove(@RequestBody move: Move): ResponseEntity<EvaluationResponse> {
        val evaluation = chessService.evaluatePosition(move.fen, move.move)
        return ResponseEntity.ok(EvaluationResponse(evaluation, ""))
    }

    @PostMapping("/next-moves")
    fun getNextMoves(@RequestBody currentMoves: List<String>): ResponseEntity<Map<String, Int>> {
        return ResponseEntity.ok(trieRepository.nextMoves(currentMoves))
    }
}