package de.instatonne.backend.websockets

import de.instatonne.backend.core.auth.JwtAuthenticator
import org.springframework.messaging.Message
import org.springframework.messaging.MessageChannel
import org.springframework.messaging.simp.stomp.StompCommand
import org.springframework.messaging.simp.stomp.StompHeaderAccessor
import org.springframework.messaging.support.ChannelInterceptor
import org.springframework.messaging.support.MessageHeaderAccessor
import org.springframework.stereotype.Service

@Service
class WebSocketInterceptor(private val jwtAuthenticator: JwtAuthenticator) : ChannelInterceptor {
    override fun preSend(message: Message<*>, channel: MessageChannel): Message<*>? {
        val acc = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor::class.java)!!
        if (StompCommand.CONNECT == acc.command) {
            val passcode = acc.passcode ?: return message
            acc.user = jwtAuthenticator.principalFromToken(passcode)
        }
        return message
    }
}