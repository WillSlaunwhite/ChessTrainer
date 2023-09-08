package com.chesstrainer.converters

import javax.persistence.AttributeConverter
import javax.persistence.Converter
import com.chesstrainer.enums.Result

@Converter(autoApply = true)
class ResultConverter : AttributeConverter<Result, String> {
    override fun convertToDatabaseColumn(result: Result): String {
        return when (result) {
            Result.WHITE -> "1-0"
            Result.BLACK -> "0-1"
            Result.DRAW -> "1/2-1/2"
        }
    }

    override fun convertToEntityAttribute(dbData: String): Result {
        return when (dbData) {
            "1-0" -> Result.WHITE
            "0-1" -> Result.BLACK
            "1/2-1/2" -> Result.DRAW
            else -> throw IllegalArgumentException("Unknown database value: $dbData")
        }
    }
}
