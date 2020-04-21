package de.instatonne.backend.models

import de.instatonne.backend.core.DatabaseWrapper
import de.instatonne.backend.generated.models.UserApiModel
import java.time.OffsetDateTime
import javax.persistence.*

@Entity
data class User(
        @Id
        var id: String = "",

        @Column(nullable = false)
        var username: String = "",

        @Column(nullable = false)
        var created: OffsetDateTime = OffsetDateTime.now(),

        @Column(nullable = true)
        var profileDescription: String? = null,

        @OneToMany(cascade = [CascadeType.ALL], mappedBy = "author")
        var posts: MutableList<Post> = mutableListOf(),

        @ManyToMany(mappedBy = "following")
        internal var followers: MutableList<User> = mutableListOf(),

        @ManyToMany(cascade = [CascadeType.ALL])
        @JoinTable(name = "user_followers",
                joinColumns = [JoinColumn(name = "username")],
                inverseJoinColumns = [JoinColumn(name = "followed_username")])
        internal var following: MutableList<User> = mutableListOf()
) : DatabaseWrapper<UserApiModel> {

    override fun toString(): String {
        return "[User@JPA] $id, $username"
    }

    override fun generateAPIVersion(): UserApiModel {
        return UserApiModel()
                .id(id)
                .username(username)
                .created(created)
                .followerCount(followers.size)
                .followingCount(following.size)
    }

}