package com.example.manager_intern.data.remote.responsive

import com.google.gson.annotations.SerializedName

data class UserResponsive(
    @SerializedName("data")
    val userData: UserData,
    @SerializedName("messsage")
    val message: String,
    @SerializedName("success")
    val isSuccess: Boolean,
    val drawableId: Int
)

data class UserData(
    @SerializedName("name")
    val name: String,
    @SerializedName("email")
    val email: String,
    @SerializedName("department")
    val department: String,
    @SerializedName("address")
    val address: String,
    @SerializedName("role")
    val role: String,
    @SerializedName("token")
    val token: String,
)