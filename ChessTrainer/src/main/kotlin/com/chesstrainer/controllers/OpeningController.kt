package com.chesstrainer.controllers

import com.chesstrainer.entities.Opening
import com.chesstrainer.services.OpeningService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/openings")
class OpeningController(private val openingService: OpeningService) {

    @GetMapping("/{openingName}/start")
    fun startOpening(@PathVariable openingName: String): ResponseEntity<Opening> {
        val formattedOpeningName = openingName.replace("-", " ")
        val opening = openingService.getOpeningByName(formattedOpeningName)
        return opening?.let { ResponseEntity.ok(it) } ?: ResponseEntity.notFound().build()
    }

    @GetMapping("/start")
    fun startOpeningTest(): ResponseEntity<String> {
        return ResponseEntity.ok("OPENINGS CONTROLLER")
    }
}