package com.example.manager_intern.ui.login

import android.content.Intent
import androidx.lifecycle.ViewModelProvider
import com.example.manager_intern.R
import com.example.manager_intern.base.BaseActivity
import com.example.manager_intern.base.BaseViewModel
import com.example.manager_intern.databinding.LoginActBinding
import com.example.manager_intern.ui.main.MainActivity
import com.example.manager_intern.ui.register.RegisterActivity

class LoginActivity : BaseActivity<LoginViewModel>() {

    override var viewModelFactory = LoginViewModel::class.java

    override val binding by viewBinding(LoginActBinding::inflate)

    override fun initView() {
        setStatusBarColor(R.color.primarySecond)
    }

    override fun initListener() {
        BaseViewModel.userResponsive.observe(this) {
            startActivity(Intent(this, MainActivity::class.java))
        }

        binding.btnLogin.setOnClickListener {
            val email = binding.edtEmail.text.toString()
            val password = binding.edtPassword.text.toString()

            if (password.isNotEmpty() && email.isNotEmpty()) {
                viewModel?.login(email, password)
            }
        }

        binding.register.setOnClickListener {
            startActivity(Intent(this, RegisterActivity::class.java))
        }
    }
}