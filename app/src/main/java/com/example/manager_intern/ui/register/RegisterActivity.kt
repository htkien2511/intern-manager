package com.example.manager_intern.ui.register

import android.content.Intent
import com.example.manager_intern.R
import com.example.manager_intern.base.BaseActivity
import com.example.manager_intern.databinding.RegisterActBinding
import com.example.manager_intern.ui.login.LoginActivity

class RegisterActivity : BaseActivity() {
    override val binding by viewBinding(RegisterActBinding::inflate)

    override fun initView() {
        setStatusBarColor(R.color.primarySecond)
    }

    override fun initListener() {
        binding.login.setOnClickListener {
            startActivity(Intent(this, LoginActivity::class.java))
        }
    }
}