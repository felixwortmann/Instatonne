package de.instatonne.backend.core.auth

import com.google.api.client.auth.openidconnect.IdToken
import de.instatonne.backend.models.User
import org.springframework.security.authentication.AbstractAuthenticationToken
import org.springframework.security.core.authority.SimpleGrantedAuthority

class JwtAuthentication(
        private val payload: IdToken.Payload?,
        private val user: User?
) : AbstractAuthenticationToken(listOf(SimpleGrantedAuthority("ROLE_USER"))) {

    init {
        this.isAuthenticated = true
    }

    override fun getCredentials(): Any? {
        return null
    }

    override fun getPrincipal(): User? {
        return user
    }

    override fun getName(): String {
        return user?.id ?: super.getName()
    }

    fun getUserId(): String {
        return payload!!.subject
    }

    fun getTokenPayload(): IdToken.Payload {
        return payload!!
    }
}