package de.instatonne.backend.apis

import de.instatonne.backend.core.repositories.PostRepository
import de.instatonne.backend.core.toNullable
import de.instatonne.backend.generated.apis.PostsApi
import de.instatonne.backend.generated.models.NewPostApiModel
import de.instatonne.backend.generated.models.PostApiModel
import de.instatonne.backend.models.Post
import de.instatonne.backend.services.PostService
import de.instatonne.backend.services.UserService
import org.springframework.core.io.FileSystemResource
import org.springframework.core.io.Resource
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RestController
import java.io.File
import java.io.FileOutputStream
import java.util.*

@RestController
class PostsApiController(
        val postRepository: PostRepository,
        val postService: PostService,
        val userService: UserService
) : PostsApi {
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

    override fun createPost(data: NewPostApiModel): ResponseEntity<PostApiModel> {
        val user = userService.getCurrentUser() ?: return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()
        val post = postService.createPostForUser(user)

        val filePath = "/var/tmp/instatonne/${post.id}.jpg"
        val file = File(filePath)
        val fileOS = FileOutputStream(file)
        val decodedImage = Base64.getDecoder().decode(data.image)
        fileOS.write(decodedImage)
        fileOS.close()

        return ResponseEntity.ok(post.generateAPIVersion())
    }

    override fun getPostImageById(postId: String): ResponseEntity<Resource> {
        val filePath = "/var/tmp/instatonne/${postId}.jpg"
        val resource = FileSystemResource(filePath)
        return ResponseEntity.ok(resource)
    }
}
