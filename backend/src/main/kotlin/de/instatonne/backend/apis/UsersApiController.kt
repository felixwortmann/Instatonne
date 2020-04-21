package de.instatonne.backend.apis

import de.instatonne.backend.core.auth.JwtAuthentication
import de.instatonne.backend.core.repositories.UserRepository
import de.instatonne.backend.core.toNullable
import de.instatonne.backend.generated.apis.UsersApi
import de.instatonne.backend.generated.models.UserApiModel
import org.springframework.http.ResponseEntity
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.RestController

@RestController
class UsersApiController(val userRepository: UserRepository) : UsersApi {
    override fun getUserByName(username: String): ResponseEntity<UserApiModel> {
        val user = this.userRepository.findById(username).toNullable()
        return if (user == null) {
            ResponseEntity.notFound().build()
        } else {
            ResponseEntity.ok(user.generateAPIVersion())
        }
    }


    override fun getUserMe(): ResponseEntity<UserApiModel> {
        val user = UserApiModel()
        user.id = (SecurityContextHolder.getContext().authentication as JwtAuthentication).getUserId()
        return ResponseEntity.ok(user)
    }
}