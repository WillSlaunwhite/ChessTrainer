package com.chesstrainer.converters

import javax.persistence.AttributeConverter
import javax.persistence.Converter

@Converter
class StringListConverter : AttributeConverter<List<String>, String> {

    override fun convertToDatabaseColumn(stringList: List<String>): String {
        return stringList.joinToString(",")
    }

    override fun convertToEntityAttribute(stringData: String): List<String> {
        return stringData.split(",")
    }
}
