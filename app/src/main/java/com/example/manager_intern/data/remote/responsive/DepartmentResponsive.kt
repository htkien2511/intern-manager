package com.example.manager_intern.data.remote.responsive

import com.google.gson.annotations.SerializedName

data class DepartmentResponsive(
    @SerializedName("data")
    val data: List<DepartmentData>,
    @SerializedName("message")
    val message: String,
    @SerializedName("success")
    val isSuccess: Boolean
)

data class DepartmentData(
    @SerializedName("id")
    val id: Int,
    @SerializedName("name")
    val name: String
)