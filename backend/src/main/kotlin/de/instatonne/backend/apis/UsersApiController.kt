package de.instatonne.backend.apis

import de.instatonne.backend.core.auth.JwtAuthentication
import de.instatonne.backend.generated.apis.UsersApi
import de.instatonne.backend.generated.models.NewUserApiModel
import de.instatonne.backend.generated.models.PostApiModel
import de.instatonne.backend.generated.models.UserApiModel
import de.instatonne.backend.models.Post
import de.instatonne.backend.services.UserService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.RestController

@RestController
class UsersApiController(val userService: UserService) : UsersApi {
    override fun getUserByName(username: String): ResponseEntity<UserApiModel> {
        val user = this.userService.findByUsername(username)
        val currentUser = this.userService.getCurrentUser()
        return when {
            user == null -> {
                ResponseEntity.notFound().build()
            }
            currentUser != null -> {
                ResponseEntity.ok(user.generateAPIVersion(currentUser))
            }
            else -> {
                ResponseEntity.ok(user.generateAPIVersion())
            }
        }
    }

    override fun getUserMe(): ResponseEntity<UserApiModel> {
        val user = userService.getCurrentUser() ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(user.generateAPIVersion())
    }

    override fun createNewUser(newUserApiModel: NewUserApiModel): ResponseEntity<UserApiModel> {
        val auth = SecurityContextHolder.getContext().authentication as JwtAuthentication

        return try {
            val user = userService.createUser(auth.getUserId(), newUserApiModel.username)
            /* user.profileDescription = newUserApiModel.profileDescription
            userRepository.save(user) */
            ResponseEntity.ok(user.generateAPIVersion())
        } catch (e: Exception) {
            ResponseEntity.badRequest().build()
        }

    }

    override fun getPostsByUserName(username: String): ResponseEntity<List<PostApiModel>> {
        val user = this.userService.findByUsername(username)
        return if (user == null) {
            ResponseEntity.notFound().build()
        } else {
            ResponseEntity.ok(user.posts.map(Post::generateAPIVersion))
        }
    }

    override fun followUserWithName(username: String): ResponseEntity<UserApiModel>? {
        val currentUser = this.userService.getCurrentUser()
                ?: return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()
        val otherUser = this.userService.findByUsername(username)
        return if (otherUser != null) {
            ResponseEntity.ok(this.userService.follow(currentUser, otherUser).generateAPIVersion(currentUser))
        } else {
            ResponseEntity.notFound().build()
        }
    }

    override fun unfollowUserWithName(username: String): ResponseEntity<UserApiModel> {
        val currentUser = this.userService.getCurrentUser()
                ?: return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()
        val otherUser = this.userService.findByUsername(username)
        return if (otherUser != null) {
            ResponseEntity.ok(this.userService.unfollow(currentUser, otherUser).generateAPIVersion(currentUser))
        } else {
            ResponseEntity.notFound().build()
        }
    }
}
