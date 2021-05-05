package com.example.manager_intern.data.remote.responsive

import com.google.gson.annotations.SerializedName


data class ForgotResponsive(
    @SerializedName("messsage")
    val message: String,
    @SerializedName("success")
    val isSuccess: Boolean
)