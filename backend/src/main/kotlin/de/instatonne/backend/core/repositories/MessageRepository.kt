package de.instatonne.backend.core.repositories

import de.instatonne.backend.models.Message
import de.instatonne.backend.models.User
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository

interface MessageRepository : CrudRepository<Message, String> {
    fun findAllByAuthorAndReceiverOrAuthorAndReceiverOrderByCreated(author: User, receiver: User, author2: User, receiver2: User): List<Message>

    fun findFirstByAuthorAndReceiverOrAuthorAndReceiverOrderByCreatedDesc(author: User, receiver: User, author2: User, receiver2: User): Message

    @Query("SELECT COUNT(m), COALESCE(sum(CASE WHEN (m.read = TRUE) THEN 0 ELSE 1 END), 0), m.receiver FROM Message m WHERE m.author = :author GROUP BY m.receiver")
    fun findByAuthor(author: User): List<Any>

    @Query("SELECT COUNT(m), COALESCE(sum(CASE WHEN (m.read = TRUE) THEN 0 ELSE 1 END), 0), m.author FROM Message m WHERE m.receiver = :receiver GROUP BY m.author")
    fun findByReceiver(receiver: User): List<Any>
}
