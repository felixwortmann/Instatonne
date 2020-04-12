package de.instatonne.backend.apis

import de.instatonne.backend.core.PostRepository
import de.instatonne.backend.generated.apis.PostsApi
import de.instatonne.backend.generated.models.PostApiModel
import de.instatonne.backend.models.Post
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RestController

@RestController
class PostsApiController(val postRepository: PostRepository) : PostsApi {
    override fun getPosts(): ResponseEntity<MutableList<PostApiModel>> {
        val posts = this.postRepository.findAll().map(Post::generateAPIVersion).toMutableList()
        val post = PostApiModel()

        return ResponseEntity.ok(posts)
    }
}