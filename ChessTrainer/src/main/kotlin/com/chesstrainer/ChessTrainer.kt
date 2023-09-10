package com.chesstrainer

import com.chesstrainer.entities.MasterGame
import com.chesstrainer.repositories.ChessTrieRepository
import com.chesstrainer.repositories.MasterGameRepository
import com.chesstrainer.utils.readAndParsePGN
import org.springframework.boot.CommandLineRunner
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.domain.EntityScan
import org.springframework.boot.builder.SpringApplicationBuilder
import org.springframework.boot.runApplication
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.PropertySource
import org.springframework.data.jpa.repository.config.EnableJpaRepositories
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder

@SpringBootApplication
@PropertySource("classpath:secrets.properties")
@EntityScan("com.chesstrainer.entities")
@EnableJpaRepositories("com.chesstrainer.repositories")
@ComponentScan("com.chesstrainer.controllers", "com.chesstrainer.security", "com.chesstrainer.services", "com.chesstrainer.repositories")
class ChessTrainer : SpringBootServletInitializer() {
    override fun configure(builder: SpringApplicationBuilder): SpringApplicationBuilder {
        return builder.sources(ChessTrainer::class.java)
    }

    @Bean
    fun databaseInitializer(masterGameRepository: MasterGameRepository, chessTrieRepository: ChessTrieRepository) = CommandLineRunner {
//        val games = readAndParsePGN("/Users/tristan/Projects/ChessTrainer/pgn-files/Hungarian.pgn")
//        masterGameRepository.saveAllAndFlush(games)
        chessTrieRepository.initialize()
        println("IN INITIALIZER")
//        chessTrieRepository.trie.printTrie(chessTrieRepository.trie.root)
//        println("IN INITIALIZER 2")

//        games.forEach { game ->
//            println(game)
//        }
    }

    @Bean
    fun configurePasswordEncoder(): PasswordEncoder {
        return BCryptPasswordEncoder()
    }

    companion object {
        @JvmStatic
        fun main(args: Array<String>) {
            SpringApplication.run(ChessTrainer::class.java, *args)
        }
    }
}
