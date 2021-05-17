package com.example.manager_intern.data.remote.request

import com.google.gson.annotations.SerializedName

data class FeedBackRequest(
    @SerializedName("task_id")
    val taskId: Int,
    @SerializedName("feedback_content")
    val content: String
)