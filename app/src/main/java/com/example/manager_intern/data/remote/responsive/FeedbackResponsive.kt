package com.example.manager_intern.data.remote.responsive

import com.google.gson.annotations.SerializedName

data class FeedbackResponsive(
    @SerializedName("data")
    val data: List<FeedbackData>,
    @SerializedName("message")
    val message: String,
    @SerializedName("success")
    val isSuccess: Boolean
)

data class FeedbackData(
    @SerializedName("taskId")
    val taskId: Int,
    @SerializedName("feedbackContent")
    val feedbackContent: String,
    @SerializedName("date")
    val date: String,
    @SerializedName("feedbackId")
    val feedbackId: Int
)