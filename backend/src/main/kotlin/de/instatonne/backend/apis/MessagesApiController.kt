package de.instatonne.backend.apis

import de.instatonne.backend.generated.apis.MessagesApi
import de.instatonne.backend.generated.models.MessageApiModel
import de.instatonne.backend.generated.models.NewMessageApiModel
import de.instatonne.backend.models.Message
import de.instatonne.backend.services.MessageService
import de.instatonne.backend.services.UserService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RestController

@RestController
class MessagesApiController(
        val messageService: MessageService,
        val userService: UserService
) : MessagesApi {
    override fun getMessagesWithUser(username: String): ResponseEntity<List<MessageApiModel>> {
        val currentUser = userService.getCurrentUser() ?: return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()
        val otherUser = userService.findByUsername(username) ?: return ResponseEntity.badRequest().build()
        val messages = this.messageService.getMessagesBetween(currentUser, otherUser)
        
        return ResponseEntity.ok(messages.map(Message::generateAPIVersion))
    }

    override fun sendMessageToUser(username: String, newMessageApiModel: NewMessageApiModel): ResponseEntity<MessageApiModel> {
        val currentUser = userService.getCurrentUser() ?: return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()
        val otherUser = userService.findByUsername(username) ?: return ResponseEntity.badRequest().build()

        return ResponseEntity.ok(messageService.createMessage(newMessageApiModel.message, currentUser, otherUser).generateAPIVersion())
    }
}