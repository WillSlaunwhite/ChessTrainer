package com.chesstrainer

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.PropertySource

@SpringBootApplication
@PropertySource("classpath:secrets.properties")
class ChessTrainer

fun main(args: Array<String>) {
    runApplication<ChessTrainer>(*args)
}
