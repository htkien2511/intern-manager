package com.example.manager_intern.ui.edit_profile

import android.R
import android.content.Intent
import android.widget.ArrayAdapter
import com.bumptech.glide.Glide
import com.example.manager_intern.base.BaseActivity
import com.example.manager_intern.base.BaseViewModel
import com.example.manager_intern.data.model.Gender
import com.example.manager_intern.data.remote.responsive.DepartmentData
import com.example.manager_intern.data.remote.responsive.UserData
import com.example.manager_intern.databinding.EditProfileActBinding
import com.example.manager_intern.ui.main.MainActivity
import com.example.manager_intern.ui.main.user.UserViewModel
import com.example.manager_intern.utils.Pref

class EditProfileActivity : BaseActivity<UserViewModel>() {

    override var viewModelFactory: Class<UserViewModel> = UserViewModel::class.java

    override val binding by viewBinding(EditProfileActBinding::inflate)

    private var user: UserData? = null
    private var departments: List<DepartmentData>? = null

    private lateinit var options: List<String>
    private lateinit var genderAdapter: ArrayAdapter<String>

    override fun initView() {
        options = Gender.values().map { it.value }
        genderAdapter = ArrayAdapter(this, R.layout.simple_spinner_item, listOf("Male", "Female"))
        binding.spinnerGender.adapter = genderAdapter

        Glide.with(this).load(Pref.avatar).circleCrop().into(binding.imgAvatar)
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
            Intent(this, MainActivity::class.java).apply {
                putExtra("test", 1)
                startActivity(this)
            }
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