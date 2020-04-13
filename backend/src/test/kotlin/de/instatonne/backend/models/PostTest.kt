package de.instatonne.backend.models

import de.instatonne.backend.core.repositories.PostRepository
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest

@DataJpaTest
class PostTest @Autowired constructor(
        var postRepository: PostRepository
) {
    @Test
    fun addingCommentSetsPostForComment() {
        val post = Post("", "testUrl")
        val comment = Comment("", "testComment", post)

        post.comments.add(comment)
        val postS = postRepository.save(post)

        assertThat(postS.comments[0].forPost)
                .isEqualTo(postS)
    }
}