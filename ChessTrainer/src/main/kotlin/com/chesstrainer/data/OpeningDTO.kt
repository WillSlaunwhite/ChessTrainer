package com.chesstrainer.data

data class OpeningDTO(val id: Long, val name: String, val description: String? = null, val moveSequence: List<String>, val difficulty: String?)
