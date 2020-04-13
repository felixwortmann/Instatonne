package de.instatonne.backend.models

import de.instatonne.backend.core.DatabaseWrapper
import de.instatonne.backend.generated.models.UserApiModel
import java.time.OffsetDateTime
import javax.persistence.*

@Entity
data class User(
        @Id
        val username: String,

        @Column(nullable = false)
        val created: OffsetDateTime = OffsetDateTime.now()
) : DatabaseWrapper<UserApiModel> {
    @OneToMany(cascade = [CascadeType.ALL], mappedBy = "author")
    val posts: MutableList<Post> = mutableListOf()

    @ManyToMany(mappedBy = "following")
    internal val followers: MutableList<User> = mutableListOf()

    @ManyToMany(cascade = [CascadeType.ALL])
    @JoinTable(name = "user_followers",
            joinColumns = [JoinColumn(name = "username")],
            inverseJoinColumns = [JoinColumn(name = "followed_username")])
    internal val following: MutableList<User> = mutableListOf()

    override fun generateAPIVersion(): UserApiModel {
        return UserApiModel()
                .username(username)
                .created(created)
                .followerCount(followers.size)
                .followingCount(following.size)
    }

    fun follow(user: User) {
        this.following.add(user)
        user.followers.add(this)
    }
}