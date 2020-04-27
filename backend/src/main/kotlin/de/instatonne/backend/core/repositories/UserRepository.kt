package de.instatonne.backend.core.repositories

import de.instatonne.backend.models.User
import org.springframework.data.repository.CrudRepository

interface UserRepository : CrudRepository<User, String> {
    fun existsByUsername(username: String): Boolean
}