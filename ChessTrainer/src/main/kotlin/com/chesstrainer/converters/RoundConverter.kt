package com.chesstrainer.converters

import javax.persistence.AttributeConverter
import javax.persistence.Converter

@Converter
class RoundConverter : AttributeConverter<String?, String> {

    override fun convertToDatabaseColumn(round: String?): String {
        return round?.toString() ?: "?"
    }

    override fun convertToEntityAttribute(dbData: String): String? {
        return dbData.toString()
    }
}