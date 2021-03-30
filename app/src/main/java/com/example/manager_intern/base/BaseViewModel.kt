package com.example.manager_intern.base

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.example.manager_intern.data.remote.RetrofitClient
import com.example.manager_intern.data.remote.responsive.UserResponsive
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.disposables.Disposable

open class BaseViewModel : ViewModel() {

    val repository = RetrofitClient.getApiService()
    val onError = MutableLiveData<String>()
    private val compositeDisposable = CompositeDisposable()

    companion object {
        val userResponsive = MutableLiveData<UserResponsive>()
    }

    fun addDisposable(disposable: Disposable) {
        compositeDisposable.add(disposable)
    }

    override fun onCleared() {
        super.onCleared()
        compositeDisposable.clear()
    }
}