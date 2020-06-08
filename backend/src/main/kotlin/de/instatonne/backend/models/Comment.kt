package de.instatonne.backend.models

import de.instatonne.backend.core.DatabaseWrapper
import de.instatonne.backend.generated.models.CommentApiModel
import org.hibernate.annotations.GenericGenerator
import java.time.OffsetDateTime
import java.util.*
import javax.persistence.*

@Entity
data class Comment(
        @Id
        @GeneratedValue(generator = "uuid")
        @GenericGenerator(name = "uuid", strategy = "uuid2")
        val id: String = "",

        @Column(nullable = false)
        var comment: String = "",

        @Column(nullable = false)
        var created: OffsetDateTime = OffsetDateTime.now(),

        @ManyToOne(cascade = [CascadeType.PERSIST])
        var author: User = User()

) : DatabaseWrapper<CommentApiModel> {

    override fun generateAPIVersion(): CommentApiModel {
        return CommentApiModel().comment(comment).created(created)
    }
}