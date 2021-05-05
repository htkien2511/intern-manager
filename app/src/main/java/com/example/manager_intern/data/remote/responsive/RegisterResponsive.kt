package com.example.manager_intern.data.remote.responsive

import com.google.gson.annotations.SerializedName

data class RegisterResponsive(
    @SerializedName("messsage")
    val message: String,
    @SerializedName("success")
    val success: Boolean
)
