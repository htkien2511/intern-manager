package com.example.manager_intern.ui.task

import androidx.lifecycle.MutableLiveData
import com.example.manager_intern.base.BaseViewModel
import com.example.manager_intern.data.remote.responsive.TaskResponsive
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers

class TaskViewModel : BaseViewModel() {

    val taskResponsive = MutableLiveData<TaskResponsive>()

    fun getTasksOfProject(projectId: Int, auth: String) {
        showLoading()
        addDisposable(
            repository.getTasksOfProject(projectId, auth)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe({
                    closeLoading()
                    if (it.isSuccess) {
                        if (it.data != null) {
                            taskResponsive.value = it
                        } else {
                            onError.value = it.message
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