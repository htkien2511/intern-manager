package com.example.manager_intern.ui.login

import android.content.Intent
import com.example.manager_intern.R
import com.example.manager_intern.base.BaseActivity
import com.example.manager_intern.base.BaseViewModel
import com.example.manager_intern.databinding.LoginActBinding
import com.example.manager_intern.ui.forgot.ForgotActivity
import com.example.manager_intern.ui.main.MainActivity
import com.example.manager_intern.ui.register.RegisterActivity
import com.example.manager_intern.utils.Pref

class LoginActivity : BaseActivity<LoginViewModel>() {

    override var viewModelFactory = LoginViewModel::class.java

    override val binding by viewBinding(LoginActBinding::inflate)

    override fun initView() {
        binding.remember.isChecked = Pref.isSaved

        if(Pref.isSaved) {
            binding.edtEmail.setText(Pref.username)
            binding.edtPassword.setText(Pref.password)
        }
    }

    override fun initListener() {
        BaseViewModel.userResponsive.observe(this) {
            if (it != null) {
                Pref.isLogin = true
                startActivity(Intent(this, MainActivity::class.java))
            }
        }

        binding.btnLogin.setOnClickListener {
            val email = binding.edtEmail.text.toString()
            val password = binding.edtPassword.text.toString()

            Pref.isSaved = binding.remember.isChecked

            if (password.isNotEmpty() && email.isNotEmpty()) {
                Pref.password = password
                Pref.username = email

                viewModel?.login(email, password)
            }
        }

        binding.register.setOnClickListener {
            startActivity(Intent(this, RegisterActivity::class.java))
        }

        binding.forgotPassword.setOnClickListener {
            startActivity(Intent(this, ForgotActivity::class.java))
        }
    }

    override fun onBackPressed() {
        moveTaskToBack(true)
    }
}