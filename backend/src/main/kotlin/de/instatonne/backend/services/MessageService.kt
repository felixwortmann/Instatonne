package de.instatonne.backend.services

import de.instatonne.backend.core.repositories.MessageRepository
import de.instatonne.backend.models.Message
import de.instatonne.backend.models.User
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.OffsetDateTime

@Service
@Transactional
class MessageService(val messageRepository: MessageRepository) {
    fun getMessagesBetween(user1: User, user2: User): List<Message> {
        return messageRepository.findAllByAuthorAndReceiverOrAuthorAndReceiverOrderByCreated(user1, user2, user2, user1)
    }

    fun createMessage(text: String, from: User, to: User): Message {
        val message = Message("", text, OffsetDateTime.now(), from, to)
        return messageRepository.save(message)
    }
}