package com.chesstrainer.entities

import com.chesstrainer.converters.StringListConverter
import com.fasterxml.jackson.annotation.JsonBackReference
import javax.persistence.*

@Entity
@Table(name = "variations")
data class Variation(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,
    val name: String,
    @Convert(converter = StringListConverter::class)
    @Column(name = "moves_sequence")
    val movesSequence: List<String> = listOf(),
    @ManyToOne @JoinColumn(name = "opening_id")
    @JsonBackReference
    val opening: Opening
)