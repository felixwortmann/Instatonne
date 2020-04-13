package de.instatonne.backend.core

import java.util.*

fun <T : Any> Optional<T>.toNullable(): T? = this.orElse(null)