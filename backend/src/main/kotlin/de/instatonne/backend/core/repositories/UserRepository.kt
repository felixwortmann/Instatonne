package de.instatonne.backend.core.repositories

import de.instatonne.backend.models.User
import org.springframework.data.jpa.repository.JpaRepository
import javax.transaction.Transactional

@Transactional(Transactional.TxType.MANDATORY)
interface UserRepository : JpaRepository<User, String>