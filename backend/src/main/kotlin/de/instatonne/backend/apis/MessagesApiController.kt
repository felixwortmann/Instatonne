package de.instatonne.backend.apis

import de.instatonne.backend.generated.apis.MessagesApi
import de.instatonne.backend.generated.models.ConversationApiModel
import de.instatonne.backend.generated.models.MessageApiModel
import de.instatonne.backend.generated.models.NewMessageApiModel
import de.instatonne.backend.models.Message
import de.instatonne.backend.services.MessageService
import de.instatonne.backend.services.UserService
import de.instatonne.backend.websockets.messages.MessagesWSController
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RestController

@RestController
class MessagesApiController(
        val messageService: MessageService,
        val userService: UserService,
        val messagesWSController: MessagesWSController
) : MessagesApi {
    override fun getMessagesWithUser(username: String): ResponseEntity<List<MessageApiModel>> {
        val currentUser = userService.getCurrentUser() ?: return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()
        val otherUser = userService.findByUsername(username) ?: return ResponseEntity.badRequest().build()
        val messages = this.messageService.getMessagesBetween(currentUser, otherUser)

        return ResponseEntity.ok(messages.map(Message::generateAPIVersion))
    }

    override fun sendMessageToUser(username: String, newMessageApiModel: NewMessageApiModel): ResponseEntity<MessageApiModel> {
        val m = messagesWSController.sendMessage(username, newMessageApiModel)
        return if (m == null) {
            ResponseEntity.badRequest().build()
        } else {
            ResponseEntity.ok(m);
        }
    }

    override fun getConversations(): ResponseEntity<List<ConversationApiModel>> {
        val currentUser = userService.getCurrentUser() ?: return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()

        val c = messageService.getConversationsIncluding(currentUser)

        return ResponseEntity.ok(c.map {
            ConversationApiModel()
                    .withUser(it.withUser.generateAPIVersion(currentUser))
                    .unreadMessageCount(it.unreadMessageCount.toInt())
                    .lastMessage(messageService.getMostRecentMessageBetween(currentUser, it.withUser).generateAPIVersion())
        }.sortedByDescending { it.lastMessage.timestamp })
    }

    override fun readMessage(id: String): ResponseEntity<MessageApiModel> {
        val message = messageService.markMessageAsRead(id) ?: return ResponseEntity.badRequest().build()
        return ResponseEntity.ok(message.generateAPIVersion())
    }
}