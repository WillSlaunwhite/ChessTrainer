package com.chesstrainer.data

data class DetailedOpeningDTO(val id: Long, val name: String, val description: String?, val moveSequence: List<String>, val masterGames: List<MasterGameDTO>, val difficulty: String?)
