package com.chesstrainer.data

import com.chesstrainer.enums.Result

open class MasterGameDTO(val id: Long, val event: String?, val white: String, val black: String, val result: Result, val eco: String)
