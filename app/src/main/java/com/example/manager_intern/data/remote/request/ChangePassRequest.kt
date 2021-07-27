package com.example.manager_intern.data.remote.request

import com.google.gson.annotations.SerializedName

data class ChangePassRequest(
    @SerializedName("old_password")
    val oldPass: String,
    @SerializedName("new_password")
    val newPass: String
)