package com.example.manager_intern.data.remote.request

import com.example.manager_intern.data.remote.responsive.User
import com.google.gson.annotations.SerializedName

data class TaskRequest(
    @SerializedName("task_id")
    val taskId: Int,
    @SerializedName("description")
    val description: String,
    @SerializedName("title")
    val title: String,
    @SerializedName("difficulty")
    val difficulty: Int,
    @SerializedName("done")
    val isDone: Boolean,
    @SerializedName("point")
    val point: Double,
    @SerializedName("due_date")
    val dueDate: String,
    @SerializedName("users_assignee")
    val usersAssignee: List<User>
)