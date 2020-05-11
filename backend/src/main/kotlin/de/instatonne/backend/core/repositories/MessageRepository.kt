package de.instatonne.backend.core.repositories

import de.instatonne.backend.models.Message
import de.instatonne.backend.models.User
import org.springframework.data.repository.CrudRepository

interface MessageRepository : CrudRepository<Message, String> {
    fun findAllByAuthorAndReceiverOrAuthorAndReceiverOrderByCreated(author: User, receiver: User, author2: User, receiver2: User): List<Message>
}
