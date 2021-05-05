package com.example.manager_intern.ui.main.user

import android.content.Intent
import com.example.manager_intern.R
import com.example.manager_intern.base.BaseFragment
import com.example.manager_intern.base.BaseViewModel
import com.example.manager_intern.base.viewBinding
import com.example.manager_intern.databinding.UserFragBinding
import com.example.manager_intern.ui.login.LoginActivity
import com.example.manager_intern.utils.Pref

class UserFragment : BaseFragment<UserViewModel>(R.layout.user_frag) {

    private val binding by viewBinding(UserFragBinding::bind)

    override var viewModelFactory: Class<UserViewModel> = UserViewModel::class.java

    override fun initView() {

    }

    override fun initListener() {
        BaseViewModel.userResponsive.observe(this) {
            if (it != null) {
                binding.username.text = it.userData.name
                binding.department.text = it.userData.department
            }
        }

        binding.btnLogout.setOnClickListener {
            Pref.isLogin = false
            BaseViewModel.userResponsive.value = null
            startActivity(Intent(requireActivity(), LoginActivity::class.java))
        }
    }
}