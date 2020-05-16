package de.instatonne.backend.models

data class Conversation(
        var messageCount: Long,
        val withUser: User
) {
}