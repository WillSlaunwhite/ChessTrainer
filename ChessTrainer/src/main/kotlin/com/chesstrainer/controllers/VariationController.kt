package com.chesstrainer.controllers

import com.chesstrainer.entities.Variation
import com.chesstrainer.services.VariationService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@CrossOrigin("*")
@RequestMapping("/api/variations")
class VariationController(private val variationService: VariationService) {

    @GetMapping("/{variationName}")
    fun getByName(@PathVariable variationName: String): ResponseEntity<Variation> {
        val formattedVariationName = variationName.replace("-", " ")
        return variationService.getVariationByName(formattedVariationName)?.let {
            ResponseEntity.ok(it)
        } ?: ResponseEntity.notFound().build()
    }

    @GetMapping("/opening/{openingName}")
    fun getByOpening(@PathVariable openingName: String): ResponseEntity<List<Variation>> {
        val formattedOpeningName = openingName.replace("-", " ")
        return ResponseEntity.ok(variationService.getVariationByOpening(formattedOpeningName))
    }
}