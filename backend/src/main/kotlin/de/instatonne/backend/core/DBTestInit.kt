package de.instatonne.backend.core

import de.instatonne.backend.models.User
import de.instatonne.backend.services.PostService
import de.instatonne.backend.services.UserService
import org.slf4j.LoggerFactory
import org.springframework.context.annotation.Profile
import org.springframework.context.event.ContextRefreshedEvent
import org.springframework.context.event.EventListener
import org.springframework.stereotype.Component

@Component
@Profile("!test")
class StartupListener(val postService: PostService, val userService: UserService) {

    private val log = LoggerFactory.getLogger(StartupListener::class.java)

    @EventListener
    fun onApplicationEvent(ev: ContextRefreshedEvent) {
        val devUser = initUser("dev")
        val a = initUser("a")
        val b = initUser("b")
        val c = initUser("c")

        postService.createPostForUser(a, "https://via.placeholder.com/150?text=(a)")
        userService.follow(a, b)
        userService.follow(b, devUser)
        userService.follow(devUser, c)
    }

    fun initUser(name: String): User = userService.createUser(name, name)


}