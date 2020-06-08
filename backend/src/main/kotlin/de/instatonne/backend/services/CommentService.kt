package de.instatonne.backend.services

import de.instatonne.backend.core.repositories.PostRepository
import de.instatonne.backend.models.Comment
import de.instatonne.backend.models.Post
import de.instatonne.backend.models.User
import org.springframework.stereotype.Service

@Service
class CommentService(
        val postRepository: PostRepository
) {
    fun authorComment(author: User, post: Post, content: String): Comment {
        val comment = Comment(comment = content, author = author)
        post.comments.add(comment)
        postRepository.save(post)
        return comment
    }
}