package de.instatonne.backend.models

import de.instatonne.backend.core.repositories.UserRepository
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import java.time.OffsetDateTime


@DataJpaTest
class UserTest @Autowired constructor(
        var userRepository: UserRepository
) {

    @Test
    fun followCreatesBidirectionalBinding() {
        val user1 = User("user1", OffsetDateTime.now())
        userRepository.save(user1)

        val user2 = User("user2", OffsetDateTime.now())
        userRepository.save(user2)

        user1.follow(user2)
        userRepository.save(user1)

        val user1R = userRepository.findById("user1").get()
        val user2R = userRepository.findById("user2").get()

        assertThat(user1R.following)
                .contains(user2R)

        assertThat(user2R.followers)
                .contains(user1R)
    }
}