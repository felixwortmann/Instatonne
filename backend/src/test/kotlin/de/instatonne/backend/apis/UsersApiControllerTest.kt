package de.instatonne.backend.apis

import com.nhaarman.mockito_kotlin.given
import de.instatonne.backend.services.UserService
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.mock.mockito.SpyBean
import javax.transaction.Transactional

@SpringBootTest
@Transactional
class UsersApiControllerTest constructor(
        @Autowired
        var usersApiController: UsersApiController
) {
    @SpyBean
    lateinit var userService: UserService
    
    @Test
    fun searchFindsUsersUniquely() {
        val self = userService.createUser("self", "self")
        given(userService.getCurrentUser()).willReturn(self)

        val user = userService.createUser("1", "lamppost")
        user.altName = "Terrific Lamps"
        userService.save(user)

        val searchResult = usersApiController.searchUsers("lamp").body
        assertThat(searchResult).hasSize(1)
        assertThat(searchResult).anyMatch { it.id == user.id }
    }

    @Test
    fun searchDoesNotMergeUsersByTerm() {
        val self = userService.createUser("self", "self")
        given(userService.getCurrentUser()).willReturn(self)

        val user1 = userService.createUser("1", "lamppost")
        user1.altName = "Terrific Lights"
        userService.save(user1)
        val user2 = userService.createUser("2", "laptop")
        user2.altName = "lamp"
        userService.save(user2)

        val searchResult = usersApiController.searchUsers("lamp").body
        assertThat(searchResult).hasSize(2)
        assertThat(searchResult).anyMatch { it.id == user1.id }
        assertThat(searchResult).anyMatch { it.id == user2.id }
    }
}