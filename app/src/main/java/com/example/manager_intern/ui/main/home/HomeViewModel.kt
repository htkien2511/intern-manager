package com.example.manager_intern.ui.main.home

import androidx.lifecycle.MutableLiveData
import com.example.manager_intern.base.BaseViewModel
import com.example.manager_intern.data.remote.responsive.ProjectResponsive
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers

class HomeViewModel : BaseViewModel() {

    val projectResponsive = MutableLiveData<ProjectResponsive>()
    val projectEmpty = MutableLiveData<Boolean>()

    fun getProjectByUserId(auth: String, userId: Int) {
        showLoading()
        addDisposable(
            repository
                .getProjects(auth, userId)
                .observeOn(AndroidSchedulers.mainThread())
                .subscribeOn(Schedulers.io())
                .subscribe({
                    closeLoading()
                    if (it.isSuccess) {
                        if (it.data != null) {
                            projectEmpty.value = false
                            projectResponsive.value = it
                        } else {
                            projectEmpty.value = true
                        }
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