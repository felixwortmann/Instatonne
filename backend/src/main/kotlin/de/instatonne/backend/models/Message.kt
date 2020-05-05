package de.instatonne.backend.models

import de.instatonne.backend.core.DatabaseWrapper
import de.instatonne.backend.generated.models.MessageApiModel
import org.hibernate.annotations.GenericGenerator
import java.time.OffsetDateTime
import javax.persistence.*

@Entity
data class Message(
        @Id
        @GeneratedValue(generator = "uuid")
        @GenericGenerator(name = "uuid", strategy = "uuid2")
        val id: String = "",

        @Column(nullable = false)
        var message: String = "",

        @Column(nullable = false)
        var created: OffsetDateTime = OffsetDateTime.now(),

        @ManyToOne
        var author: User = User(),

        @ManyToOne
        var receiver: User = User()
) : DatabaseWrapper<MessageApiModel> {
    override fun generateAPIVersion(): MessageApiModel {
        return MessageApiModel()
                .id(id)
                .message(message)
                .timestamp(created)
                .author(author.username)
                .receiver(receiver.username)
    }


}