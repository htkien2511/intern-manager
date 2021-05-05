package com.example.manager_intern.data.remote

import com.example.manager_intern.data.remote.responsive.*
import io.reactivex.Observable
import okhttp3.RequestBody
import retrofit2.http.*

interface ApiService {

    @POST("login")
    fun postLogin(@Body body: RequestBody): Observable<UserResponsive>

    @POST("register")
    fun postRegister(@Body body: RequestBody): Observable<RegisterResponsive>

    @GET("manager_profile")
    fun getProfile(@Header("Authorization") auth: String): Observable<UserResponsive>

    @GET("project")
    fun getProjects(
        @Header("Authorization") auth: String,
        @Query("user_id") userId: Int
    ): Observable<ProjectResponsive>

    @POST("forgot_password")
    fun postForgotPassword(@Body body: RequestBody): Observable<ForgotResponsive>

    @GET("task/project")
    fun getTasksOfProject(@Query("project_id") projectId: Int): Observable<TaskResponsive>
}