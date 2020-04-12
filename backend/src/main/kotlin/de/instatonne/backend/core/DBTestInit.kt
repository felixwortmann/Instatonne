package de.instatonne.backend.core

import de.instatonne.backend.models.Post
import org.slf4j.LoggerFactory
import org.springframework.context.event.ContextRefreshedEvent
import org.springframework.context.event.EventListener
import org.springframework.stereotype.Component
import java.time.OffsetDateTime

@Component
class StartupListener(val postRepository: PostRepository) {

    private val log = LoggerFactory.getLogger(StartupListener::class.java)

    @EventListener
    fun onApplicationEvent(ev: ContextRefreshedEvent) {
        log.info("Init successfully !")
        val post = Post(0, "testName", "http://example.com/80x80.png", OffsetDateTime.now())
        postRepository.save(post)
    }
}