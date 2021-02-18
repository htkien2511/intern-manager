package com.example.manager_intern.ui.login

import android.content.Intent
import com.example.manager_intern.R
import com.example.manager_intern.base.BaseActivity
import com.example.manager_intern.databinding.LoginActBinding
import com.example.manager_intern.ui.main.MainActivity

class LoginActivity : BaseActivity() {
    override val binding by viewBinding(LoginActBinding::inflate)

    override fun initView() {
        setStatusBarColor(R.color.primarySecond)
    }

    override fun initListener() {
        binding.btnLogin.setOnClickListener {
            startActivity(Intent(this, MainActivity::class.java))
        }
    }
}