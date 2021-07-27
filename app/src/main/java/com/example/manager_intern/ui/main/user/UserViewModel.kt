package com.example.manager_intern.ui.main.user

import androidx.lifecycle.MutableLiveData
import com.example.manager_intern.base.BaseViewModel
import com.example.manager_intern.data.remote.request.ChangePassRequest
import com.example.manager_intern.data.remote.responsive.ChangePassResponsive
import com.example.manager_intern.utils.Pref
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers

class UserViewModel : BaseViewModel() {

    val responsive = MutableLiveData<ChangePassResponsive>()

    fun changePassword(oldPass: String, newPass: String) {
        showLoading()
        val request = ChangePassRequest(oldPass, newPass)
        addDisposable(
            repository.changePass(Pref.token, request)
                .observeOn(AndroidSchedulers.mainThread())
                .subscribeOn(Schedulers.io())
                .subscribe({
                    closeLoading()
                    responsive.value = it
                }, {
                    closeLoading()
                    onError.value = it.message
                })
        )
    }
}