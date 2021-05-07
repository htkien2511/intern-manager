package com.example.manager_intern.ui.register

import androidx.lifecycle.MutableLiveData
import com.example.manager_intern.base.BaseViewModel
import com.example.manager_intern.data.remote.responsive.RegisterResponsive
import com.example.manager_intern.utils.Constants
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers
import okhttp3.MultipartBody

class RegisterViewModel : BaseViewModel() {

    val registerResponsive = MutableLiveData<RegisterResponsive>()

    fun register(email: String, username: String, password: String) {
        val requestBody = MultipartBody.Builder()
            .setType(MultipartBody.FORM)
            .addFormDataPart(Constants.USERNAME, email)
            .addFormDataPart(Constants.PASSWORD, password)
            .addFormDataPart(Constants.NAME, username)
            .build()

        showLoading()
        addDisposable(
            repository.postRegister(requestBody)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe({
                    closeLoading()
                    if (!it.success) {
                        onError.value = it.message
                    } else {
                        registerResponsive.value = it
                    }
                }, {
                    closeLoading()
                    onError.value = it.message
                }
                )
        )
    }
}