package com.chesstrainer.utils

import com.chesstrainer.data.DetailedMasterGameDTO
import com.chesstrainer.data.MasterGameDTO
import com.chesstrainer.entities.MasterGame

fun convertToMasterGameDTO(masterGame: MasterGame): MasterGameDTO {
    return MasterGameDTO(
        id = masterGame.id,
        event = masterGame.event,
        white = masterGame.white,
        black = masterGame.black,
        result = masterGame.result,
        eco = masterGame.eco
    )
}

fun convertToDetailedMasterGameDTO(masterGame: MasterGame): DetailedMasterGameDTO {
    return DetailedMasterGameDTO(
        id = masterGame.id,
        event = masterGame.event,
        white = masterGame.white,
        black = masterGame.black,
        result = masterGame.result,
        eco = masterGame.eco,
        moves = masterGame.moves
    )
}
