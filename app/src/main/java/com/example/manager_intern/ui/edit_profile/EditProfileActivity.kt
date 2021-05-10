package com.example.manager_intern.ui.edit_profile

import android.R
import android.widget.ArrayAdapter
import com.example.manager_intern.base.BaseActivity
import com.example.manager_intern.base.BaseViewModel
import com.example.manager_intern.data.model.Gender
import com.example.manager_intern.data.remote.responsive.DepartmentData
import com.example.manager_intern.data.remote.responsive.UserData
import com.example.manager_intern.databinding.EditProfileActBinding

class EditProfileActivity : BaseActivity<EditProfileViewModel>() {

    override var viewModelFactory: Class<EditProfileViewModel> = EditProfileViewModel::class.java

    override val binding by viewBinding(EditProfileActBinding::inflate)

    private var user: UserData? = null
    private var departments: List<DepartmentData>? = null

    private lateinit var options: List<String>
    private lateinit var genderAdapter: ArrayAdapter<String>

    override fun initView() {
        options = Gender.values().map { it.value }
        genderAdapter = ArrayAdapter(this, R.layout.simple_spinner_item, listOf("Male", "Female"))
        binding.spinnerGender.adapter = genderAdapter
    }

    override fun initListener() {
        BaseViewModel.userResponsive.observe(this) {
            if (it != null) {
                binding.edtUsername.setText(it.userData.name)
                binding.edtAddress.setText(it.userData.address)
                user = it.userData
                viewModel?.getAllDepartments(it.userData.token)
            }
        }

        viewModel?.departments?.observe(this) {
            departments = it
        }

        viewModel?.userUpdatedResponsive?.observe(this) {
            it.userData.token = user!!.token
            BaseViewModel.userResponsive.value = it
            onBackPressed()
        }

        binding.btnUpdate.setOnClickListener {
            val name = binding.edtUsername.text.toString()
            val address = binding.edtAddress.text.toString()
            val gender = binding.spinnerGender.selectedItem.toString()

            if (user != null) {
                user!!.let {
                    val departmentId = departments?.find { item -> item.name == it.department}?.id
                    if (departmentId != null) {
                        viewModel?.updateProfile(it.token, it.id, name, it.email, departmentId, address, gender)
                    }
                }
            }
        }
    }
}