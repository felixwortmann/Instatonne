package de.instatonne.backend.core

import de.instatonne.backend.core.repositories.PostRepository
import de.instatonne.backend.core.repositories.UserRepository
import de.instatonne.backend.models.Comment
import de.instatonne.backend.models.Post
import de.instatonne.backend.models.User
import org.slf4j.LoggerFactory
import org.springframework.context.event.ContextRefreshedEvent
import org.springframework.context.event.EventListener
import org.springframework.stereotype.Component

@Component
class StartupListener(val postRepository: PostRepository, val userRepository: UserRepository) {

    private val log = LoggerFactory.getLogger(StartupListener::class.java)

    @EventListener
    fun onApplicationEvent(ev: ContextRefreshedEvent) {
        val tim = User()
        tim.id = "*test-id"
        tim.username = "*test-username"
        userRepository.save(tim)

        val post = Post()
        post.imageUrl = "http://example.com/80x80.png"
        post.author = tim
        tim.posts.add(post)

        val comment = Comment()
        comment.comment = "*Testkommentar"
        comment.forPost = post
        post.comments.add(comment)
        postRepository.save(post)
    }
}