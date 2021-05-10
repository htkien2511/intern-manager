package com.example.manager_intern.ui.edit_profile

import androidx.lifecycle.MutableLiveData
import com.example.manager_intern.base.BaseViewModel
import com.example.manager_intern.data.remote.responsive.DepartmentData
import com.example.manager_intern.data.remote.responsive.UserData
import com.example.manager_intern.data.remote.responsive.UserResponsive
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers
import okhttp3.MultipartBody

class EditProfileViewModel : BaseViewModel() {

    val departments = MutableLiveData<List<DepartmentData>>()
    val userUpdatedResponsive = MutableLiveData<UserResponsive>()

    fun getAllDepartments(auth: String) {
        showLoading()
        addDisposable(
            repository.getAllDepartments(auth)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe({
                    closeLoading()
                    if (it.isSuccess) {
                        departments.value = it.data
                    } else {
                        onError.value = it.message
                    }
                }, {
                    closeLoading()
                    onError.value = it.message
                })
        )
    }

    fun updateProfile(
        auth: String,
        id: Int,
        name: String,
        email: String,
        department: Int,
        address: String,
        gender: String
    ) {
        val requestBody = MultipartBody.Builder()
            .setType(MultipartBody.FORM)
            .addFormDataPart("id", id.toString())
            .addFormDataPart("email", email)
            .addFormDataPart("name", name)
            .addFormDataPart("department", department.toString())
            .addFormDataPart("address", address)
            .addFormDataPart("gender", gender)
            .build()

        showLoading()
        addDisposable(
            repository.postUpdateProfile(auth, requestBody)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe({
                    closeLoading()

                    if (it.isSuccess) {
                        userUpdatedResponsive.value = it
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