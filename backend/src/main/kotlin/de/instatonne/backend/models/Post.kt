package de.instatonne.backend.models

import de.instatonne.backend.core.DatabaseWrapper
import de.instatonne.backend.generated.models.PostApiModel
import java.time.OffsetDateTime
import javax.persistence.*

@Entity
data class Post(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Int,

        @Column(nullable = false)
        val name: String,

        @Column(nullable = false)
        val imageUrl: String,

        @Column(nullable = false)
        val created: OffsetDateTime
) : DatabaseWrapper<PostApiModel> {

    override fun generateAPIVersion(): PostApiModel {
        return PostApiModel().created(created).imageUrl(imageUrl)
    }
}