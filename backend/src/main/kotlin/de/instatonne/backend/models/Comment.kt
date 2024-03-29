package de.instatonne.backend.models

import de.instatonne.backend.core.DatabaseWrapper
import de.instatonne.backend.generated.models.CommentApiModel
import org.hibernate.annotations.GenericGenerator
import java.time.OffsetDateTime
import javax.persistence.*

@Entity
data class Comment(
        @Id
        @GeneratedValue(generator = "uuid")
        @GenericGenerator(name = "uuid", strategy = "uuid2")
        val id: String = "",

        @Column(nullable = false)
        var comment: String = "",

        @ManyToOne(cascade = [CascadeType.PERSIST])
        var forPost: Post = Post(),

        @Column(nullable = false)
        var created: OffsetDateTime = OffsetDateTime.now()
) : DatabaseWrapper<CommentApiModel> {

    override fun generateAPIVersion(): CommentApiModel {
        return CommentApiModel().comment(comment).created(created)
    }
}