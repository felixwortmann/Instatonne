package de.instatonne.backend.models

import de.instatonne.backend.core.DatabaseWrapper
import de.instatonne.backend.generated.models.PostApiModel
import org.hibernate.annotations.GenericGenerator
import java.time.OffsetDateTime
import javax.persistence.*

@Entity
data class Post(
        @Id
        @GeneratedValue(generator = "uuid")
        @GenericGenerator(name = "uuid", strategy = "uuid2")
        val id: String = "",

        @Column(nullable = false)
        var imageUrl: String = "",

        @Column(nullable = false)
        var created: OffsetDateTime = OffsetDateTime.now(),

        @ManyToOne
        var author: User = User(),

        @OneToMany(cascade = [CascadeType.ALL])
        var comments: MutableList<Comment> = mutableListOf()

) : DatabaseWrapper<PostApiModel> {

    override fun generateAPIVersion(): PostApiModel {
        return PostApiModel()
                .created(created)
                .imageUrl(imageUrl)
                .id(id)
                .author(author.username)
                .comments(comments.map(Comment::generateAPIVersion))
    }
}
