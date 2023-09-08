package com.chesstrainer.converters

import javax.persistence.AttributeConverter
import javax.persistence.Converter

@Converter(autoApply = true)
class DateConverter : AttributeConverter<String, String> {
    override fun convertToDatabaseColumn(dateStr: String): String {
        // Replace any '?' characters with '01'
        return dateStr.replace("?", "01")
    }

    override fun convertToEntityAttribute(dbData: String): String {
        return dbData
    }
}
