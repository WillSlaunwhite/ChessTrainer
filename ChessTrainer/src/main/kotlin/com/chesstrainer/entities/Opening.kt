package com.chesstrainer.entities

import com.chesstrainer.converters.StringListConverter
import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonManagedReference
import javax.persistence.*

@Entity
data class Opening(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,
    val name: String,
    val description: String? = null,
    @Convert(converter = StringListConverter::class)
    @Column(name = "base_moves_sequence")
    val baseMoveSequence: List<String> = listOf(),
    @OneToMany(mappedBy = "opening")
    @JsonManagedReference
    val masterGames: List<MasterGame>,
    @OneToMany(mappedBy = "opening")
    @JsonManagedReference
    val variations: List<Variation>,
    @Column(name = "difficulty_level")
    val difficulty: String? = null,
)
