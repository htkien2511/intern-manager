package com.example.manager_intern.ui.forgot

import android.util.Log
import androidx.lifecycle.MutableLiveData
import com.example.manager_intern.base.BaseViewModel
import com.example.manager_intern.data.remote.responsive.ForgotResponsive
import com.example.manager_intern.utils.Constants
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers
import okhttp3.MultipartBody

class ForgotViewModel : BaseViewModel() {

    val forgotResponsive = MutableLiveData<ForgotResponsive>()

    fun forgotPassword(email: String) {

        Log.d("TAG", "forgotPassword: ")

        val requestBody = MultipartBody.Builder()
            .setType(MultipartBody.FORM)
            .addFormDataPart("email", email)
            .build()

        addDisposable(
            repository.postForgotPassword(requestBody)
                .observeOn(AndroidSchedulers.mainThread())
                .subscribeOn(Schedulers.io())
                .subscribe({
                    onError.value = it.message
                    if (it.isSuccess) {
                        forgotResponsive.value = it
                    } else {
                        onError.value = it.message
                    }
                }, {
                    Log.d("___TAG", "forgotPassword: ${it.message}")
                    onError.value = it.message
                })
        )
    }
}