package de.instatonne.backend.apis

import de.instatonne.backend.core.repositories.PostRepository
import de.instatonne.backend.core.toNullable
import de.instatonne.backend.generated.apis.PostsApi
import de.instatonne.backend.generated.models.PostApiModel
import de.instatonne.backend.models.Post
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RestController

@RestController
class PostsApiController(val postRepository: PostRepository) : PostsApi {
    override fun getPosts(): ResponseEntity<List<PostApiModel>> {
        val posts = this.postRepository.findAll().map(Post::generateAPIVersion)

        return ResponseEntity.ok(posts)
    }

    override fun getPostById(postId: String): ResponseEntity<PostApiModel> {
        val post = this.postRepository.findById(postId).toNullable()
        return if (post == null) {
            ResponseEntity.notFound().build()
        } else {
            ResponseEntity.ok(post.generateAPIVersion())
        }
    }
}