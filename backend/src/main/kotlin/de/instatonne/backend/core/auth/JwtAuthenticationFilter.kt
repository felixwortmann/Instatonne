package de.instatonne.backend.core.auth

import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier
import com.google.api.client.http.javanet.NetHttpTransport
import com.google.api.client.json.jackson2.JacksonFactory
import org.slf4j.LoggerFactory
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.filter.OncePerRequestFilter
import javax.servlet.FilterChain
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse


class JwtAuthenticationFilter : OncePerRequestFilter() {
    private val log = LoggerFactory.getLogger(JwtAuthenticationFilter::class.java)

    private val CLIENT_ID = "190934451905-3n1os2sov96uvvu5k58ej7al9ecopfl5.apps.googleusercontent.com"

    private val verifier: GoogleIdTokenVerifier = GoogleIdTokenVerifier.Builder(NetHttpTransport(), JacksonFactory()) // Specify the CLIENT_ID of the app that accesses the backend:
            .setAudience(listOf(CLIENT_ID)) // Or, if multiple clients access the backend:
            .build()

    override fun doFilterInternal(req: HttpServletRequest, res: HttpServletResponse, chain: FilterChain) {
        log.info("performing filter...")
        val requestHeader = req.getHeader("Authorization")
        if (requestHeader != null && requestHeader.startsWith("Bearer ")) {
            val authToken: String = requestHeader.substring(7)
            try {
                val parsedToken = verifier.verify(authToken)
                if (parsedToken != null) {
                    SecurityContextHolder.getContext().authentication = JwtAuthentication(parsedToken)
                }
            } catch (e: Exception) {
                log.info("Token could not be verified.")
            }
        }
        chain.doFilter(req, res)
    }
}