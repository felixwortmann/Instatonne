package de.instatonne.backend.apis

import de.instatonne.backend.core.auth.JwtAuthentication
import de.instatonne.backend.core.repositories.UserRepository
import de.instatonne.backend.core.toNullable
import de.instatonne.backend.generated.apis.UsersApi
import de.instatonne.backend.generated.models.NewUserApiModel
import de.instatonne.backend.generated.models.UserApiModel
import de.instatonne.backend.services.UserService
import org.springframework.http.ResponseEntity
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.RestController

@RestController
class UsersApiController(val userRepository: UserRepository, val userService: UserService) : UsersApi {
    override fun getUserByName(username: String): ResponseEntity<UserApiModel> {
        val user = this.userRepository.findById(username).toNullable()
        return if (user == null) {
            ResponseEntity.notFound().build()
        } else {
            ResponseEntity.ok(user.generateAPIVersion())
        }
    }


    override fun getUserMe(): ResponseEntity<UserApiModel> {
        val auth = SecurityContextHolder.getContext().authentication as JwtAuthentication
        val userId = auth.getUserId()
        val user = userRepository.findById(userId).toNullable()
        return if (user == null) {
            ResponseEntity.notFound().build()
        } else {
            ResponseEntity.ok(user.generateAPIVersion())
        }
    }

    override fun createNewUser(newUserApiModel: NewUserApiModel): ResponseEntity<UserApiModel> {
        val auth = SecurityContextHolder.getContext().authentication as JwtAuthentication

        val user = userService.createUser(auth.getUserId(), newUserApiModel.username)
        user.profileDescription = newUserApiModel.profileDescription
        userRepository.save(user)
        return ResponseEntity.ok(user.generateAPIVersion())
    }
}