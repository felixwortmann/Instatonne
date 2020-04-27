package de.instatonne.backend.services

import de.instatonne.backend.core.repositories.UserRepository
import de.instatonne.backend.models.User
import org.springframework.stereotype.Service

@Service
class UserService(
        val userRepository: UserRepository
) {

    fun createUser(id: String, username: String): User {
        if (userRepository.existsById(id)) {
            throw Exception("UserServcice@createUser called for an id that already exists")
        }
        if (userRepository.existsByUsername(username)) {
            throw Exception("UserServcice@createUser called for a username that already exists")
        }
        return userRepository.save(User(id, username))
    }

    fun follow(u1: User, u2: User) {
        u1.following.add(u2)
        u2.followers.add(u1)
        userRepository.save(u1)
        userRepository.save(u2)
    }

    fun unfollow(u1: User, u2: User) {
        u1.following.remove(u2)
        u2.followers.remove(u1)
        userRepository.save(u1)
        userRepository.save(u2)
    }
}