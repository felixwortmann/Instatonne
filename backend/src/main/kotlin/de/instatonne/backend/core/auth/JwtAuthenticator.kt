package de.instatonne.backend.core.auth

import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier
import com.google.api.client.http.javanet.NetHttpTransport
import com.google.api.client.json.jackson2.JacksonFactory
import de.instatonne.backend.services.UserService
import org.slf4j.LoggerFactory
import org.springframework.core.env.Environment
import org.springframework.stereotype.Service

@Service
class JwtAuthenticator(val userService: UserService, val environment: Environment) {
    private val log = LoggerFactory.getLogger(JwtAuthenticationFilter::class.java)

    private val CLIENT_ID = "190934451905-3n1os2sov96uvvu5k58ej7al9ecopfl5.apps.googleusercontent.com"

    private val verifier: GoogleIdTokenVerifier = GoogleIdTokenVerifier.Builder(NetHttpTransport(), JacksonFactory()) // Specify the CLIENT_ID of the app that accesses the backend:
            .setAudience(listOf(CLIENT_ID)) // Or, if multiple clients access the backend:
            .build()

    fun principalFromToken(token: String): JwtAuthentication? {
        return try {
            val parsedToken = verifier.verify(token)
            if (parsedToken != null) {
                val id = parsedToken.payload.subject
                var user = userService.findById(id)
                if (user == null && environment.activeProfiles.contains("dev")) {
                    user = userService.findById("dev")!!
                }
                JwtAuthentication(parsedToken.payload, user)
            } else {
                null
            }
        } catch (e: Exception) {
            if (environment.activeProfiles.contains("dev")) {
                val user = userService.findById(token)!!
                JwtAuthentication(null, user)
            } else {
                log.info("Token could not be verified.")
                null
            }
        }
    }
}