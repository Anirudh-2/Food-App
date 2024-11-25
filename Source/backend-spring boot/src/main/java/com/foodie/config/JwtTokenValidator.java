package com.foodie.config;

import java.io.IOException;
import java.util.List;

import javax.crypto.SecretKey;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.ExpiredJwtException;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtTokenValidator extends OncePerRequestFilter {

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		String jwt = request.getHeader(JwtConstant.JWT_HEADER);

		if (jwt != null && jwt.startsWith("Bearer ")) {
			jwt = jwt.substring(7); // Remove "Bearer " prefix

			try {
				// Load the signing key
				SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());

				// Parse the JWT and extract claims with clock skew tolerance
				Claims claims = Jwts.parserBuilder()
						.setSigningKey(key)
						.setAllowedClockSkewSeconds(60) // Allow 1 minute clock skew
						.build()
						.parseClaimsJws(jwt)
						.getBody();

				// Check for expiration
				if (claims.getExpiration().before(new java.util.Date())) {
					throw new ExpiredJwtException(null, claims, "Token has expired");
				}

				// Extract email and authorities from the claims
				String email = claims.getSubject(); // JWT subject is usually the user's identifier (email)
				String authorities = String.valueOf(claims.get("authorities"));

				if (authorities != null && !authorities.isEmpty()) {
					// Convert authorities to GrantedAuthority list
					List<GrantedAuthority> auths = AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);

					// Create authentication token
					Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, auths);

					// Set the authentication in the SecurityContext
					SecurityContextHolder.getContext().setAuthentication(authentication);
				}
			} catch (ExpiredJwtException e) {
				// Handle expired token
				response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token has expired. Please refresh the token.");
				return;
			} catch (Exception e) {
				// Handle other errors, such as invalid token
				throw new BadCredentialsException("Invalid or expired token", e);
			}
		}

		// Continue the filter chain
		filterChain.doFilter(request, response);
	}
}
