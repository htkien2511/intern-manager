package com.example.manager_intern.ui.feedback

import androidx.lifecycle.MutableLiveData
import com.example.manager_intern.base.BaseViewModel
import com.example.manager_intern.data.remote.request.FeedBackRequest
import com.example.manager_intern.data.remote.responsive.FeedbackData
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers

class FeedBackViewModel : BaseViewModel() {
    val feedbackData = MutableLiveData<List<FeedbackData>>()

    fun getFeedbacksOfTask(taskId: Int, auth: String) {
        showLoading()
        addDisposable(
            repository.getFeedbacks(auth, taskId)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe({
                    closeLoading()
                    if (it.isSuccess) {
                        feedbackData.value = it.data
                    } else {

                    }
                }, {
                    closeLoading()
                    onError.value = it.message
                })
        )
    }

    fun addFeedBack(auth: String, feedBackRequest: FeedBackRequest) {
        showLoading()
        addDisposable(
            repository.postAddFeedBack(auth, feedBackRequest)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe({
                    if (!it.isSuccess) {
                        closeLoading()
                        onError.value = it.message
                    }
                }, {
                    closeLoading()
                    onError.value = it.message
                })
        )
    }
}