package com.example.manager_intern.ui.login

import com.example.manager_intern.base.BaseViewModel
import com.example.manager_intern.utils.Constants
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers
import okhttp3.MultipartBody

class LoginViewModel : BaseViewModel() {

    fun login(username: String, password: String) {
        val requestBody = MultipartBody.Builder()
            .setType(MultipartBody.FORM)
            .addFormDataPart(Constants.USERNAME, username)
            .addFormDataPart(Constants.PASSWORD, password)
            .build()

        addDisposable(
            repository.postLogin(requestBody)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe({
                    if (it.isSuccess) {
                        userResponsive.value = it
                    } else {
                        onError.value = it.message
                    }
                }, {
                    onError.value = it.message
                })
        )
    }
}