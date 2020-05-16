package de.instatonne.backend.services

import de.instatonne.backend.core.repositories.MessageRepository
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.transaction.annotation.Transactional

@SpringBootTest
@Transactional
class MessageServiceTest @Autowired constructor(
        val messageService: MessageService,
        val userService: UserService,
        val messageRepository: MessageRepository
) {

    val log = LoggerFactory.getLogger(MessageServiceTest::class.java)

    @Test
    fun test() {
        val u1 = userService.createUser("1", "1")
        val u2 = userService.createUser("2", "2")
        messageService.createMessage("message", u1, u2)
        messageService.createMessage("message1", u1, u2)
        messageService.createMessage("message2", u1, u2)

        messageService.createMessage("message3", u2, u1)

        val c = messageService.getConversationsIncluding(u1)

        assertThat(c).hasSize(1)

        val con = c[0]
        assertThat(con.messageCount).isEqualTo(4)
        assertThat(con.withUser).isEqualTo(u2)
    }
}