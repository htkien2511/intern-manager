package com.example.manager_intern.data.remote.request

import com.google.gson.annotations.SerializedName

data class ScheduleRequest(
    @SerializedName("leave_date")
    val reason: String,
    @SerializedName("leave_date")
    val time: String,
    @SerializedName("shift")
    val shift: Int,
)