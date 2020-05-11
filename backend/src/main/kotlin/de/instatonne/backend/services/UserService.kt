package de.instatonne.backend.services

import de.instatonne.backend.core.auth.JwtAuthentication
import de.instatonne.backend.core.repositories.UserRepository
import de.instatonne.backend.core.toNullable
import de.instatonne.backend.models.User
import org.hibernate.Hibernate
import org.springframework.core.env.Environment
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class UserService(
        val userRepository: UserRepository,
        val environment: Environment
) {

    @Throws(Exception::class)
    fun createUser(id: String, username: String): User {
        if (userRepository.existsById(id)) {
            throw Exception("UserServcice@createUser called for an id that already exists")
        }
        if (userRepository.existsByUsername(username)) {
            throw Exception("UserServcice@createUser called for a username that already exists")
        }
        return userRepository.save(User(id, username))
    }

    fun save(user: User): User {
        return userRepository.save(user)
    }

    fun follow(u1: User, u2: User): User {
        if (u1.following.contains(u2)) return u2
        u1.following.add(u2)
        u2.followers.add(u1)
        userRepository.save(u1)
        userRepository.save(u2)
        return u2
    }

    fun unfollow(u1: User, u2: User): User {
        if (!u1.following.contains(u2)) return u2
        u1.following.remove(u2)
        u2.followers.remove(u1)
        userRepository.save(u1)
        userRepository.save(u2)
        return u2
    }

    fun findById(id: String): User? {
        val user = userRepository.findById(id).toNullable()
        Hibernate.initialize(user?.followers)
        Hibernate.initialize(user?.following)
        Hibernate.initialize(user?.posts)
        return user
    }

    fun findByUsername(username: String): User? {
        val user = userRepository.findByUsername(username).toNullable()
        Hibernate.initialize(user?.followers)
        Hibernate.initialize(user?.following)
        Hibernate.initialize(user?.posts)
        return user
    }

    fun usernameTaken(username: String): Boolean {
        return userRepository.existsByUsername(username)
    }

    fun searchByUsername(username: String): List<User> {
        val users = userRepository.findAllByUsernameContainingIgnoreCase(username)
        users.forEach {
            Hibernate.initialize(it.followers)
            Hibernate.initialize(it.following)
            Hibernate.initialize(it.posts)
        }

        return users
    }

    fun searchByAltName(altName: String): List<User> {
        val users = userRepository.findAllByAltNameContainingIgnoreCase(altName)
        users.forEach {
            Hibernate.initialize(it.followers)
            Hibernate.initialize(it.following)
            Hibernate.initialize(it.posts)
        }

        return users
    }

    fun getFollowers(username: String): List<User>? {
        val user = userRepository.findByUsername(username).toNullable() ?: return null
        return user.followers.toList()
    }

    fun getCurrentUser(): User? {
        return (SecurityContextHolder.getContext().authentication as? JwtAuthentication)?.principal
    }

    fun getFollowing(username: String): List<User>? {
        val user = userRepository.findByUsername(username).toNullable() ?: return null
        return user.following.toList()
    }
}