package com.example.manager_intern.ui.forgot

import androidx.lifecycle.MutableLiveData
import com.example.manager_intern.base.BaseViewModel
import com.example.manager_intern.data.remote.responsive.ForgotResponsive
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers
import okhttp3.MultipartBody

class ForgotViewModel : BaseViewModel() {

    val forgotResponsive = MutableLiveData<ForgotResponsive>()

    val resetPasswordSuccess = MutableLiveData<ForgotResponsive>()

    fun forgotPassword(email: String) {
        showLoading()

        val requestBody = MultipartBody.Builder()
            .setType(MultipartBody.FORM)
            .addFormDataPart("email", email)
            .build()

        addDisposable(
            repository.postForgotPassword(requestBody)
                .observeOn(AndroidSchedulers.mainThread())
                .subscribeOn(Schedulers.io())
                .subscribe({
                    closeLoading()
                    if (it.isSuccess) {
                        forgotResponsive.value = it
                    } else {
                        onError.value = it.message
                    }
                }, {
                    closeLoading()
                    onError.value = it.message
                })
        )
    }

    fun resetPassword(token: String, password: String) {
        val requestBody = MultipartBody.Builder()
            .setType(MultipartBody.FORM)
            .addFormDataPart("token", token)
            .addFormDataPart("password", password)
            .build()

        showLoading()

        addDisposable(
            repository.postResetPassword(requestBody)
                .observeOn(AndroidSchedulers.mainThread())
                .subscribeOn(Schedulers.io())
                .subscribe({
                    closeLoading()
                    if (it.isSuccess) {
                        resetPasswordSuccess.value = it
                    } else {
                        onError.value = it.message
                    }
                }, {
                    closeLoading()
                    onError.value = it.message
                })
        )
    }
}