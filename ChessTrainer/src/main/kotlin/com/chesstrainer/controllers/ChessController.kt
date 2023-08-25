package com.chesstrainer.controllers

import com.chesstrainer.data.Move
import com.chesstrainer.data.ValidationResponse
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@CrossOrigin("*", "http://localhost")
@RequestMapping("/api")
class ChessController {

    @RequestMapping("/**/{path:[^\\.]*}", "/", "/home")
    fun index(): String? { return "forward:/index.html" }

    @PostMapping("/validate-move")
    fun validateMove(@RequestBody move: Move): ResponseEntity<ValidationResponse> {
        // just testing the endpoint
        return if (move.move == "e4") {
            ResponseEntity.ok(ValidationResponse(true, ""))
        } else {
            ResponseEntity.ok(ValidationResponse(false, "Invalid move!"))
        }
    }
}