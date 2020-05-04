package de.instatonne.backend.websockets.messages

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
    fun greeting(@DestinationVariable to: String, message: NewMessageApiModel) {
        val currentUser = userService.getCurrentUser() ?: return
        val otherUser = userService.findByUsername(to) ?: return
        val sentMsg = messageService.createMessage(message.message, currentUser, otherUser).generateAPIVersion()

        template.convertAndSendToUser(otherUser.id, "/queue/msg", sentMsg)
        template.convertAndSendToUser(currentUser.id, "/queue/msg", sentMsg)
    }
}