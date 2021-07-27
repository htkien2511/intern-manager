package com.example.manager_intern.data.remote.responsive

import com.google.gson.annotations.SerializedName

data class ChangePassResponsive(
    @SerializedName("message")
    val message: String,
    @SerializedName("success")
    val success: Boolean
)