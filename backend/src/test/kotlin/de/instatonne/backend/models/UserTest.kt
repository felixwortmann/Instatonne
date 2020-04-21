package de.instatonne.backend.models

import de.instatonne.backend.core.repositories.UserRepository
import de.instatonne.backend.services.UserService
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.transaction.annotation.Transactional

@SpringBootTest
@Transactional
class UserTest @Autowired constructor(
        var userService: UserService,
        var userRepository: UserRepository
) {
    @Test
    fun assertTestIsolation() {
        @Suppress("UsePropertyAccessSyntax")
        assertThat(userRepository.existsById("*test-id")).isFalse()
        // this user is normally created in DBTestInit.kt,
        // but should not be created for test cases due to the active 'test' profile
    }

    @Test
    fun followCreatesBidirectionalBinding() {
        val user1 = userService.createUser("*1", "*first-user")
        val user2 = userService.createUser("*2", "*second-user")
        userService.follow(user1, user2)

        val user1R = userRepository.findById(user1.id).get()
        val user2R = userRepository.findById(user2.id).get()

        assertThat(user1R.following)
                .contains(user2R)

        assertThat(user2R.followers)
                .contains(user1R)
    }

    @Test
    fun unfollowingRemovesBindings() {
        val user1 = userService.createUser("*1", "*first-user")
        val user2 = userService.createUser("*2", "*second-user")

        userService.follow(user1, user2)
        userService.unfollow(user1, user2)

        val user1R = userRepository.findById(user1.id).get()
        val user2R = userRepository.findById(user2.id).get()

        assertThat(user1R.following)
                .doesNotContain(user2R)

        assertThat(user2R.followers)
                .doesNotContain(user1R)
    }
}