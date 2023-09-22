package com.chesstrainer.controllers

import com.chesstrainer.data.DetailedOpeningDTO
import com.chesstrainer.data.OpeningDTO
import com.chesstrainer.services.OpeningService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@CrossOrigin("*")
@RequestMapping("/api/openings")
class OpeningController(private val openingService: OpeningService) {

    @GetMapping("/{openingName}/start")
    fun startOpening(@PathVariable openingName: String): ResponseEntity<OpeningDTO> {
        val formattedOpeningName = openingName.replace("-", " ")
        return openingService.getOpeningByName(formattedOpeningName)?.let {
            ResponseEntity.ok(it)
        } ?: ResponseEntity.notFound().build()
    }

    @GetMapping("/{openingName}/start/detail")
    fun startOpeningDetailed(@PathVariable openingName: String): ResponseEntity<DetailedOpeningDTO> {
        val formattedOpeningName = openingName.replace("-", " ")
        return openingService.getDetailedOpeningByName(formattedOpeningName)?.let {
            ResponseEntity.ok(it)
        } ?: ResponseEntity.notFound().build()
    }

    @GetMapping("/")
    fun getAllOpenings(): ResponseEntity<List<OpeningDTO>> {
        return ResponseEntity.ok(openingService.getOpenings())
    }
}