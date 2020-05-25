package de.instatonne.backend.services

import de.instatonne.backend.core.repositories.UserRepository
import org.assertj.core.api.Assertions.assertThat
import org.assertj.core.api.Assertions.assertThatThrownBy
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.transaction.annotation.Transactional

@SpringBootTest
@Transactional
class UserServiceTest @Autowired constructor(
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

    @Test
    fun creatingTwoUsersWithSameIdIsProhibited() {
        userService.createUser("*1", "*first-user")
        assertThatThrownBy { userService.createUser("*1", "*first-double-user") }.hasMessageContaining("id")
    }

    @Test
    fun creatingTwoUsersWithSameUsernameIsProhibited() {
        userService.createUser("*1", "*first-user")
        assertThatThrownBy { userService.createUser("*2", "*first-user") }.hasMessageContaining("username")
    }

    @Test
    fun searchIsCaseInsensitive() {
        val username = userService.createUser("*1", "username")

        assertThat(userService.searchByUsername("Username")).contains(username)
        assertThat(userService.searchByUsername("uSerNAme")).contains(username)
        assertThat(userService.searchByUsername("username")).contains(username)

        assertThat(userService.searchByUsername("cake")).doesNotContain(username)
    }
}