package de.instatonne.backend.models

import de.instatonne.backend.core.DatabaseWrapper
import de.instatonne.backend.generated.models.UserApiModel
import java.time.OffsetDateTime
import javax.persistence.*

@Entity
@Table(
        indexes = [Index(name = "i_username", columnList = "username", unique = true)]
)
data class User(
        @Id
        var id: String = "",

        @Column(nullable = false, unique = true)
        var username: String = "",

        @Column(nullable = true)
        var altName: String? = "",

        @Column(nullable = true)
        var profileDescription: String? = null,

        @Column(nullable = false)
        var created: OffsetDateTime = OffsetDateTime.now(),

        @Column(nullable = true)
        var profilePictureUrl: String? = null,

        @OneToMany(cascade = [CascadeType.ALL], mappedBy = "author")
        var posts: MutableList<Post> = mutableListOf(),

        @ManyToMany(mappedBy = "following")
        internal var followers: MutableSet<User> = mutableSetOf(),

        @ManyToMany(cascade = [CascadeType.PERSIST])
        @JoinTable(name = "user_followers",
                joinColumns = [JoinColumn(name = "username")],
                inverseJoinColumns = [JoinColumn(name = "followed_username")])
        internal var following: MutableSet<User> = mutableSetOf()
) : DatabaseWrapper<UserApiModel> {

    override fun toString(): String {
        return "[User@JPA] $id, $username"
    }

    override fun equals(other: Any?) = other is User && this.id == other.id

    override fun hashCode(): Int {
        return this.id.hashCode()
    }

    override fun generateAPIVersion(): UserApiModel {
        return UserApiModel()
                .id(id)
                .username(username)
                .altName(altName)
                .profileDescription(profileDescription)
                .created(created)
                .profilePictureUrl(profilePictureUrl)
                .followerCount(followers.size)
                .followingCount(following.size)
                .isBeingFollowed(false)
                .isFollowingMe(false)
                .isSelf(false)
    }

    override fun generateAPIVersion(currentUser: User): UserApiModel {
        return super.generateAPIVersion(currentUser)
                .isBeingFollowed(this.followers.contains(currentUser))
                .isFollowingMe(this.following.contains(currentUser))
                .isSelf(this.id == currentUser.id)
    }
}