package com.example.manager_intern.data.remote

import com.example.manager_intern.data.remote.request.FeedBackRequest
import com.example.manager_intern.data.remote.request.ScheduleRequest
import com.example.manager_intern.data.remote.request.TaskRequest
import com.example.manager_intern.data.remote.responsive.*
import io.reactivex.Observable
import io.reactivex.Single
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
    fun getTasksOfProject(
        @Query("project_id") projectId: Int,
        @Header("Authorization") auth: String
    ): Observable<TaskResponsive>

    @POST("reset_password")
    fun postResetPassword(@Body body: RequestBody): Single<ForgotResponsive>

    @GET("departments")
    fun getAllDepartments(@Header("Authorization") auth: String): Single<DepartmentResponsive>

    @POST("user_profile/edit")
    fun postUpdateProfile(
        @Header("Authorization") auth: String,
        @Body body: RequestBody
    ): Single<UserResponsive>

    @GET("task/feedback")
    fun getFeedbacks(
        @Header("Authorization") auth: String,
        @Query("task_id") taskId: Int
    ): Single<FeedbackResponsive>

    @GET("schedule")
    fun getScheduleByUserId(
        @Header("Authorization") auth: String,
        @Query("user_id") taskId: Int
    ): Single<ScheduleResponsive>

    @POST("schedule/add")
    fun postAddSchedule(
        @Header("Authorization") auth: String,
        @Body scheduleRequest: ScheduleRequest
    ): Single<ForgotResponsive>

    @PUT("schedule/update")
    fun putUpdateSchedule(
        @Header("Authorization") auth: String,
        @Query("leave_id") leaveId: Int,
        @Body scheduleRequest: ScheduleRequest
    ): Single<ForgotResponsive>

    @PUT("task/update")
    fun putUpdateTask(
        @Header("Authorization") auth: String,
        @Body taskRequest: TaskRequest
    ): Single<ForgotResponsive>

    @POST("task/feedback/add")
    fun postAddFeedBack(
        @Header("Authorization") auth: String,
        @Body feedBackRequest: FeedBackRequest
    ): Single<ForgotResponsive>

    @PUT("schedule/delete")
    fun putDeleteSchedule(
        @Header("Authorization") auth: String,
        @Query("leave_id") leaveId: Int
    ): Single<ForgotResponsive>
}