package de.instatonne.backend.core.auth

import de.instatonne.backend.models.User
import org.springframework.security.authentication.AbstractAuthenticationToken
import org.springframework.security.core.authority.SimpleGrantedAuthority

class JwtAuthentication(
        private val tokenId: String,
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

    fun getUserId(): String {
        return tokenId
    }
}