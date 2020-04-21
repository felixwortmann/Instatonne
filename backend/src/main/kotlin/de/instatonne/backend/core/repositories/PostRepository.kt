package de.instatonne.backend.core.repositories

import de.instatonne.backend.models.Post
import org.springframework.data.repository.CrudRepository

interface PostRepository : CrudRepository<Post, String>