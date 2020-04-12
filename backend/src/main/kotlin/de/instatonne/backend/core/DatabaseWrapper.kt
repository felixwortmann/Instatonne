package de.instatonne.backend.core

interface DatabaseWrapper<T> {
    fun generateAPIVersion(): T
}