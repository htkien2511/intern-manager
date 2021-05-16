package com.example.manager_intern.ui.main.schedule

import androidx.lifecycle.MutableLiveData
import com.example.manager_intern.base.BaseViewModel
import com.example.manager_intern.data.remote.responsive.ScheduleData
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers

class ScheduleViewModel : BaseViewModel() {
    val scheduleData = MutableLiveData<List<ScheduleData>>()

    fun getScheduleById(auth: String, userId: Int) {
        showLoading()
        addDisposable(
            repository.getScheduleByUserId(auth, userId)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe({
                    closeLoading()
                    if (it.isSuccess) {
                       scheduleData.value = it.data
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