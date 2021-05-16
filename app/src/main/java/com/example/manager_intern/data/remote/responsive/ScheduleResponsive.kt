package com.example.manager_intern.data.remote.responsive

import com.google.gson.annotations.SerializedName

data class ScheduleResponsive(
    @SerializedName("data")
    val data: List<ScheduleData>,
    @SerializedName("message")
    val message: String,
    @SerializedName("success")
    val isSuccess: Boolean
)

data class ScheduleData(
    @SerializedName("id")
    val id: Int,
    @SerializedName("reason")
    val reason: String,
    @SerializedName("time")
    val time: String,
    @SerializedName("shift")
    val shift: Int,
)