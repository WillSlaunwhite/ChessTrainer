package com.chesstrainer.controllers

import com.chesstrainer.data.ValidationResponse
import com.chesstrainer.data.Move
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class ChessController {

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