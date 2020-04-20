package de.instatonne.backend.core.auth

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken
import org.springframework.security.authentication.AbstractAuthenticationToken

class JwtAuthentication(
        private val token: GoogleIdToken
) : AbstractAuthenticationToken(emptyList()) {
    override fun getCredentials(): Any? {
        return null
    }

    override fun getPrincipal(): GoogleIdToken {
        return token
    }
}