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
    @Column(name = "moves_sequence")
    val moveSequence: List<String>,
    @OneToMany(mappedBy = "opening")
    @JsonManagedReference
    val masterGames: List<MasterGame>,
    @Column(name = "difficulty_level")
    val difficulty: String? = null,
)
