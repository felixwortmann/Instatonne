package de.instatonne.backend.core.auth

import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service
import org.springframework.web.filter.OncePerRequestFilter
import javax.servlet.FilterChain
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Service
class JwtAuthenticationFilter(val jwtAuthenticator: JwtAuthenticator) : OncePerRequestFilter() {

    override fun doFilterInternal(req: HttpServletRequest, res: HttpServletResponse, chain: FilterChain) {
        val requestHeader = req.getHeader("Authorization")
        if (requestHeader != null && requestHeader.startsWith("Bearer ")) {
            val authToken: String = requestHeader.substring(7)
            SecurityContextHolder.getContext().authentication = jwtAuthenticator.principalFromToken(authToken)
        }
        chain.doFilter(req, res)
    }

}