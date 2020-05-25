package de.instatonne.backend.models

data class Conversation(
        var messageCount: Long,
        var unreadMessageCount: Long,
        val withUser: User
) {
}