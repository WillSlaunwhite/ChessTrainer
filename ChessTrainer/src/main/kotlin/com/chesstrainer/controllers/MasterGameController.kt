package com.chesstrainer.controllers

import com.chesstrainer.data.Move
import com.chesstrainer.services.ChessTrieService
import com.chesstrainer.services.MasterGameService
import com.chesstrainer.wrappers.Evaluation
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping

@CrossOrigin("*", "http://localhost")
@RequestMapping("/api/games")
class MasterGameController(masterGameService: MasterGameService) { }