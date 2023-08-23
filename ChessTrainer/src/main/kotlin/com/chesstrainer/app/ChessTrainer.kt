package com.chesstrainer.app

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class ChessTrainer

fun main(args: Array<String>) {
	runApplication<ChessTrainer>(*args)
}
