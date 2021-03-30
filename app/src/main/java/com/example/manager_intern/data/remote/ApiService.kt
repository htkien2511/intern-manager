package com.example.manager_intern.data.remote

import com.example.manager_intern.data.remote.responsive.UserResponsive
import io.reactivex.Observable
import okhttp3.RequestBody
import retrofit2.http.Body
import retrofit2.http.POST

interface ApiService {

    @POST("login")
    fun postLogin(@Body body: RequestBody): Observable<UserResponsive>
}