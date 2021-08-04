package com.example.manager_intern.ui.main.user

import androidx.lifecycle.MutableLiveData
import com.example.manager_intern.base.BaseViewModel
import com.example.manager_intern.data.remote.request.ChangePassRequest
import com.example.manager_intern.data.remote.responsive.ChangePassResponsive
import com.example.manager_intern.data.remote.responsive.UserData
import com.example.manager_intern.utils.Pref
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers

class UserViewModel : BaseViewModel() {

    val responsive = MutableLiveData<ChangePassResponsive>()
    val userResponsive = MutableLiveData<UserData>()

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

    fun getProfile(auth: String, id: Int) {
        showLoading()
        addDisposable(
            repository.getProfile(auth, id)
                .observeOn(AndroidSchedulers.mainThread())
                .subscribeOn(Schedulers.io())
                .subscribe( {
                    closeLoading()
                    userResponsive.value = it.userData
                }, {
                    closeLoading()
                    onError.value = it.message
                })
        )
    }

    fun changeAvatar(auth: String, id: Int, avatar: String) {
        addDisposable(
            repository.changeAvatar(auth, id, avatar)
                .observeOn(AndroidSchedulers.mainThread())
                .subscribeOn(Schedulers.io())
                .subscribe( {
                    closeLoading()
                }, {
                    closeLoading()
                    onError.value = it.message
                })
        )
    }
}