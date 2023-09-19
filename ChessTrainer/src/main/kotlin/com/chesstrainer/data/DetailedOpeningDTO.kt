package com.chesstrainer.data

class DetailedOpeningDTO(id: Long, name: String, description: String?, moveSequence: List<String>, difficulty: String?, val masterGames: List<MasterGameDTO>) : OpeningDTO(id, name, description, moveSequence, difficulty)