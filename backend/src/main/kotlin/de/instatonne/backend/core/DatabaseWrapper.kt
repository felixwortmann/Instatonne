package de.instatonne.backend.core

import de.instatonne.backend.models.User

interface DatabaseWrapper<T> {
    fun generateAPIVersion(): T
    fun generateAPIVersion(currentUser: User): T {
        return generateAPIVersion()
    }
}