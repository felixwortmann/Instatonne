package de.instatonne.backend.websockets.messages

import de.instatonne.backend.generated.models.MessageApiModel
import de.instatonne.backend.generated.models.NewMessageApiModel
import de.instatonne.backend.services.MessageService
import de.instatonne.backend.services.UserService
import org.springframework.messaging.handler.annotation.DestinationVariable
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.stereotype.Controller


@Controller
class MessagesWSController(
        private val userService: UserService,
        private val messageService: MessageService,
        private val template: SimpMessagingTemplate
) {

    @MessageMapping("/msg/{to}")
    fun sendMessage(@DestinationVariable to: String, message: NewMessageApiModel): MessageApiModel? {
        val currentUser = userService.getCurrentUser() ?: return null
        val otherUser = userService.findByUsername(to) ?: return null
        val sentMsg = messageService.createMessage(message.message, currentUser, otherUser).generateAPIVersion()

        template.convertAndSendToUser(otherUser.id, "/queue/msg", sentMsg)
        template.convertAndSendToUser(currentUser.id, "/queue/msg", sentMsg)

        return sentMsg
    }

    @MessageMapping("/msg/{id}/r")
    fun readMessage(@DestinationVariable id: String): MessageApiModel? {
        val currentUser = userService.getCurrentUser() ?: return null
        val msg = messageService.getMessageById(id) ?: return null
        if (msg.receiver.id != currentUser.id) return null

        val readMessage = messageService.markMessageAsRead(id)?.generateAPIVersion() ?: return null

        template.convertAndSendToUser(msg.author.id, "/queue/read", readMessage)
        template.convertAndSendToUser(currentUser.id, "/queue/read", readMessage)

        return readMessage
    }
}