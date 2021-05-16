package com.example.manager_intern.data.remote.responsive

import com.google.gson.annotations.SerializedName
import java.io.Serializable

data class ProjectResponsive(
    @SerializedName("data")
    val data: List<ProjectData>?,
    @SerializedName("message")
    val message: String,
    @SerializedName("success")
    val isSuccess: Boolean
)

data class ProjectData(
    @SerializedName("projectId")
    val id: Int,
    @SerializedName("description")
    val description: String,
    @SerializedName("dueDate")
    val dueDate: String,
    @SerializedName("title")
    val title: String,
    @SerializedName("managerName")
    val managerName: Manager,
    @SerializedName("userId")
    val userId: Int
) : Serializable

data class Manager(
    @SerializedName("managerId")
    val managerId: Int,
    @SerializedName("name")
    val name: String,
    @SerializedName("username")
    val username: String
) : Serializable