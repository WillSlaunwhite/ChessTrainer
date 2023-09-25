package com.chesstrainer.utils

import com.chesstrainer.data.DetailedOpeningDTO
import com.chesstrainer.data.OpeningDTO
import com.chesstrainer.entities.Opening

fun convertToOpeningDTO(opening: Opening): OpeningDTO {
    return OpeningDTO(
        id = opening.id,
        name = opening.name,
        description = opening.description,
        baseMovesSequence = opening.baseMoveSequence,
        difficulty = opening.difficulty,
        variations = opening.variations,
    )
}

fun convertToDetailedOpeningDTO(opening: Opening): DetailedOpeningDTO {
    return DetailedOpeningDTO(
        id = opening.id,
        name = opening.name,
        description = opening.description,
        baseMovesSequence = opening.baseMoveSequence,
        masterGames = opening.masterGames.map { convertToMasterGameDTO(it) },
        difficulty = opening.difficulty,
        variations = opening.variations,
    )
}
