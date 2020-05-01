package de.instatonne.backend.core

import de.instatonne.backend.models.User
import de.instatonne.backend.services.PostService
import de.instatonne.backend.services.UserService
import org.springframework.context.annotation.Profile
import org.springframework.context.event.ContextRefreshedEvent
import org.springframework.context.event.EventListener
import org.springframework.stereotype.Component

@Component
@Profile("!test")
class StartupListener(val postService: PostService, val userService: UserService) {

    val a: User
        get() {
            return userService.findById("a")!!
        }
    val b: User
        get() {
            return userService.findById("b")!!
        }
    val c: User
        get() {
            return userService.findById("c")!!
        }
    val d: User
        get() {
            return userService.findById("d")!!
        }

    val dev: User
        get() {
            return userService.findById("dev")!!
        }

    @EventListener
    fun onApplicationEvent(ev: ContextRefreshedEvent) {
        initUser("dev")
        initUser("a")
        initUser("b")
        initUser("c")
        initUser("d")

        postService.createPostForUser(a, "https://via.placeholder.com/150?text=(a)")
        userService.follow(a, b)
        userService.follow(b, dev)
        userService.follow(a, c)
        userService.follow(a, d)
        userService.follow(c, d)
        userService.follow(dev, d)
    }

    fun initUser(name: String) {
        val user = userService.createUser(name, name)
        user.profilePictureUrl = "https://via.placeholder.com/150?text=${name}"
        userService.save(user)
    }


}