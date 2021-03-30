package com.example.manager_intern.data.remote.request

import com.google.gson.annotations.SerializedName

data class UserRequest(
    @SerializedName("username")
    val username: String,
    @SerializedName("password")
    val password: String
)