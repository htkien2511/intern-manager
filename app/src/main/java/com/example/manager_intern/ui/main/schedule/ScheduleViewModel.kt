package com.example.manager_intern.ui.main.schedule

import androidx.lifecycle.MutableLiveData
import com.example.manager_intern.base.BaseViewModel
import com.example.manager_intern.data.remote.request.ScheduleRequest
import com.example.manager_intern.data.remote.responsive.ScheduleData
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers
import kotlin.random.Random

class ScheduleViewModel : BaseViewModel() {
    val scheduleData = MutableLiveData<List<ScheduleData>>()
    val requestSuccess = MutableLiveData<Int>()

    fun getScheduleById(auth: String, userId: Int) {
        showLoading()
        addDisposable(
            repository.getScheduleByUserId(auth, userId)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe({
                    closeLoading()
                    if (it.isSuccess) {
                        requestSuccess.value = 0
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

    fun addLeave(auth: String, scheduleRequest: ScheduleRequest) {
        showLoading()
        addDisposable(
            repository.postAddSchedule(auth, scheduleRequest)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe({
                    closeLoading()
                    if (it.isSuccess) {
                        requestSuccess.value = requestSuccess.value?.plus(1)
                    } else {
                        onError.value = it.message
                    }
                }, {
                    closeLoading()
                    onError.value = it.message
                })
        )
    }

    fun updateLeave(auth: String, leaveId: Int, scheduleRequest: ScheduleRequest) {
        showLoading()
        addDisposable(
            repository.putUpdateSchedule(auth, leaveId, scheduleRequest)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe({
                    closeLoading()
                    if (it.isSuccess) {
//                        requestSuccess.value = Random(10000000).nextInt()
                    } else {
                        onError.value = it.message
                    }
                }, {
                    closeLoading()
                    onError.value = it.message
                })
        )
    }

    fun deleteSchedule(auth: String, leaveId: Int) {
        showLoading()
        addDisposable(
            repository.putDeleteSchedule(auth, leaveId)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe({
                    closeLoading()
                    if (it.isSuccess) {
//                        requestSuccess.value = Random(10000000).nextInt()
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