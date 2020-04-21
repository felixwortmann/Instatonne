package de.instatonne.backend.core.auth

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken
import org.springframework.security.authentication.AbstractAuthenticationToken
import org.springframework.security.core.authority.SimpleGrantedAuthority

class JwtAuthentication(
        private val token: GoogleIdToken
) : AbstractAuthenticationToken(listOf(SimpleGrantedAuthority("ROLE_USER"))) {

    init {
        this.isAuthenticated = true
    }

    override fun getCredentials(): Any? {
        return null
    }

    override fun getPrincipal(): GoogleIdToken {
        return token
    }

    fun getUserId(): String {
        return token.payload.subject
    }
}