package com.chesstrainer.controllers

import com.chesstrainer.data.EvaluationResponse
import com.chesstrainer.data.Move
import com.chesstrainer.data.ValidationResponse
import com.chesstrainer.services.ChessService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@CrossOrigin("*", "http://localhost")
@RequestMapping("/api")
class ChessController(private val chessService: ChessService) {

    @RequestMapping("/**/{path:[^\\.]*}", "/", "/home")
    fun index(): String? {
        return "forward:/index.html"
    }

    @PostMapping("/evaluate")
    fun validateMove(@RequestBody move: Move): ResponseEntity<EvaluationResponse> {
        val evaluation = chessService.evaluatePosition(move.fen, move.move)
        return ResponseEntity.ok(EvaluationResponse(evaluation, ""))
    }
}