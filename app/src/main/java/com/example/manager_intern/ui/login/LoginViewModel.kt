package com.example.manager_intern.ui.login

import com.example.manager_intern.base.BaseViewModel
import com.example.manager_intern.data.model.ROLE
import com.example.manager_intern.utils.Constants
import com.example.manager_intern.utils.Pref
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

        showLoading()
        addDisposable(
            repository.postLogin(requestBody)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe({
                    closeLoading()
                    if (it.isSuccess) {
                        if (it.userData.role == ROLE.ROLE_ADMIN.name) {
                            onError.value = "Permission is denied (ADMIN)"
                        } else {
                            userResponsive.value = it
                            Pref.userId = it.userData.id
                            Pref.token = it.userData.token
                        }
                    } else {
                        userResponsive.value = null
                        onError.value = it.message
                    }
                }, {
                    closeLoading()
                    onError.value = it.message
                })
        )
    }
}