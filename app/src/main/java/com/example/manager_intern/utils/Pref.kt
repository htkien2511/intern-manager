package com.example.manager_intern.utils

import com.chibatching.kotpref.KotprefModel

object Pref : KotprefModel() {
    var username by stringPref("")
    var password by stringPref("")
    var isLogin by booleanPref(false)
    var isSaved by booleanPref(false)
}