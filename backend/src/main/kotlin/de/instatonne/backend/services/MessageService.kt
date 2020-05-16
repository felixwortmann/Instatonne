package de.instatonne.backend.services

import de.instatonne.backend.core.repositories.MessageRepository
import de.instatonne.backend.models.Conversation
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

    fun getMostRecentMessageBetween(user1: User, user2: User): Message {
        return messageRepository.findFirstByAuthorAndReceiverOrAuthorAndReceiverOrderByCreatedDesc(user1, user2, user2, user1)
    }

    fun getConversationsIncluding(user: User): List<Conversation> {
        val asAuthor = messageRepository.findByAuthor(user)
        val asReceiver = messageRepository.findByReceiver(user)

        val total = ArrayList<Any>()
        total.addAll(asAuthor)
        total.addAll(asReceiver)

        val conversations = total.map {
            val item = it as Array<*>
            Conversation(item[0] as Long, item[1] as User)
        }

        return conversations.groupingBy { it.withUser }.aggregate { _, accumulator: Conversation?, element, _ ->
            if (accumulator == null) {
                element
            } else {
                accumulator.messageCount += element.messageCount
                accumulator
            }
        }.values.toList().filterNotNull()
    }

    fun createMessage(text: String, from: User, to: User): Message {
        val message = Message("", text, OffsetDateTime.now(), from, to)
        return messageRepository.save(message)
    }
}