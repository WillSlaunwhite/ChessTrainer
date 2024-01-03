package com.chesstrainer.data

import com.chesstrainer.enums.MoveClassification

data class ScoreMoveResponse(val classification: MoveClassification, val feedback: String)
