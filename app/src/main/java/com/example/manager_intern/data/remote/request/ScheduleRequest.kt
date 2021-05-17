package com.example.manager_intern.data.remote.request

import com.google.gson.annotations.SerializedName

data class ScheduleRequest(
    @SerializedName("reason_content")
    val reason: String,
    @SerializedName("leave_date")
    val time: String,
    @SerializedName("shift")
    val shift: Int,
)