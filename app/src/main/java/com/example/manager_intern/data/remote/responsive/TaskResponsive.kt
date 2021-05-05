package com.example.manager_intern.data.remote.responsive

import com.google.gson.annotations.SerializedName

data class TaskResponsive(
    @SerializedName("data")
    val data: List<TaskData>,
    @SerializedName("message")
    val message: String,
    @SerializedName("success")
    val isSuccess: Boolean
)

data class TaskData(
    @SerializedName("taskId")
    val taskId: Int,
    @SerializedName("description")
    val description: String,
    @SerializedName("title")
    val title: String,
    @SerializedName("difficulty")
    val difficulty: String,
    @SerializedName("isDone")
    val isDone: Boolean,
    @SerializedName("point")
    val point: Double,
    @SerializedName("projectName")
    val projectName: String
)