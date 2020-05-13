package de.instatonne.backend.apis

import de.instatonne.backend.core.repositories.PostRepository
import de.instatonne.backend.core.toNullable
import de.instatonne.backend.generated.apis.PostsApi
import de.instatonne.backend.generated.models.NewPostApiModel
import de.instatonne.backend.generated.models.PostApiModel
import de.instatonne.backend.models.Post
import de.instatonne.backend.models.User
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

    companion object {
        const val fileBasePath: String = "/var/tmp/instatonne/$"
    }


    override fun getPosts(): ResponseEntity<List<PostApiModel>> {
        val user = userService.getCurrentUser()
        return if (user == null) {
            ResponseEntity.notFound().build()
        } else {
            val following: List<User> = user.following.toList()
            print("following: $following")
            val posts: List<Post> = following.map { follower -> follower.posts }.flatten()
            ResponseEntity.ok(posts.map(Post::generateAPIVersion))
        }
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

        val filePath = fileBasePath + "${post.id}.jpg"
        val file = File(filePath)
        val fileOS = FileOutputStream(file)
        val decodedImage = Base64.getDecoder().decode(data.image)
        fileOS.write(decodedImage)
        fileOS.close()

        return ResponseEntity.ok(post.generateAPIVersion())
    }

    override fun getPostImageById(postId: String): ResponseEntity<Resource> {
        val filePath = fileBasePath + "${postId}.jpg"
        val resource = FileSystemResource(filePath)
        return ResponseEntity.ok(resource)
    }
}
