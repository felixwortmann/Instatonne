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
        val id: String,

        @Column(nullable = false)
        val imageUrl: String,

        @Column(nullable = false)
        val created: OffsetDateTime = OffsetDateTime.now()
) : DatabaseWrapper<PostApiModel> {

    @ManyToOne
    lateinit var author: User

    @OneToMany(cascade = [CascadeType.ALL])
    val comments: MutableList<Comment> = mutableListOf()


    override fun generateAPIVersion(): PostApiModel {
        return PostApiModel()
                .created(created)
                .imageUrl(imageUrl)
                .id(id)
                .comments(comments.map(Comment::generateAPIVersion))
    }
}