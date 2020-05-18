package de.instatonne.backend.core.repositories

import de.instatonne.backend.models.User
import org.springframework.data.repository.CrudRepository
import java.util.*

interface UserRepository : CrudRepository<User, String> {
    fun existsByUsername(username: String): Boolean
    fun findByUsername(username: String): Optional<User>
    fun findAllByUsernameContainingIgnoreCase(username: String): List<User>
    fun findAllByAltNameContainingIgnoreCase(altName: String): List<User>
}