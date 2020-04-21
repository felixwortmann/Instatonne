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
        log.info("Init successfully !")
        val post = Post("", "http://example.com/80x80.png")

        val comment = Comment("", "Log 1 Kommentar", post)
        post.comments.add(comment)
        postRepository.save(post)

        val tim = User("+TEST_ID", "+TEST_USER")
        userRepository.save(tim)
    }
}