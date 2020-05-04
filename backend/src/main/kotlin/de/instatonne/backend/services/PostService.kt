package de.instatonne.backend.services

import de.instatonne.backend.core.repositories.PostRepository
import de.instatonne.backend.core.repositories.UserRepository
import de.instatonne.backend.models.Post
import de.instatonne.backend.models.User
import org.springframework.stereotype.Service

@Service
class PostService(
        val postRepository: PostRepository,
        val userRepository: UserRepository
) {
    fun createPostForUser(user: User): Post {
        var post = Post()
        post.author = user
        post = postRepository.save(post)
        user.posts.add(post)
        userRepository.save(user)
        post.imageUrl = "/p/${post.id}/i.jpg"
        return postRepository.save(post)
    }

    fun createPostForUser(user: User, url: String): Post {
        var post = Post()
        post.author = user
        post = postRepository.save(post)
        user.posts.add(post)
        userRepository.save(user)
        post.imageUrl = url
        return postRepository.save(post)
    }
}