package com.skilldistillery.marketplace.exceptions

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler

@ControllerAdvice
class GlobalExceptionHandler {

    @ExceptionHandler(UserNotFoundException::class)
    fun handleUserNotFoundException(e: UserNotFoundException?): ResponseEntity<Void> {
        return ResponseEntity.notFound().build()
    }

    @ExceptionHandler(UserAlreadyExistsException::class)
    fun handleUserNotFoundException(e: UserAlreadyExistsException): ResponseEntity<String> {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(e.message)
    }

    @ExceptionHandler(AuthorizationException::class)
    fun handleAuthorizationException(e: AuthorizationException?): ResponseEntity<Void> {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build()
    }

    @ExceptionHandler(Exception::class)
    fun handleTokenNotFoundException(e: Exception?): ResponseEntity<Void> {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build()
    }
}
