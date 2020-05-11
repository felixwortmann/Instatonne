package de.instatonne.backend.websockets

import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.messaging.MessageSecurityMetadataSourceRegistry
import org.springframework.security.config.annotation.web.socket.AbstractSecurityWebSocketMessageBrokerConfigurer

@Configuration
class WebSocketSecurityConfiguration : AbstractSecurityWebSocketMessageBrokerConfigurer() {
    override fun configureInbound(messages: MessageSecurityMetadataSourceRegistry) {
        messages.simpDestMatchers("/app/**").hasRole("USER")
                .simpSubscribeDestMatchers("/topic/**", "/user/**").hasRole("USER")
    }

    override fun sameOriginDisabled(): Boolean {
        return true
    }
}