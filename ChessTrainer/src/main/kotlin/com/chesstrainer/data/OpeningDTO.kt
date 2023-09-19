package com.chesstrainer.data

open class OpeningDTO(val id: Long, val name: String, val description: String? = null, val moveSequence: List<String>, val difficulty: String?)
