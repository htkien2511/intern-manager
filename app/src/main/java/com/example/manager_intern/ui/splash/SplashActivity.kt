package com.example.manager_intern.ui.splash

import android.content.Intent
import com.example.manager_intern.R
import com.example.manager_intern.base.BaseActivity
import com.example.manager_intern.databinding.SplashActBinding
import com.example.manager_intern.ui.login.LoginActivity
import com.example.manager_intern.ui.main.MainViewModel

class SplashActivity : BaseActivity<MainViewModel>() {

    override var viewModelFactory = MainViewModel::class.java

    override val binding by viewBinding(SplashActBinding::inflate)

    override fun initView() {
        setStatusBarColor(R.color.primarySecond)
    }

    override fun initListener() {
        binding.btnLoginSplash.setOnClickListener {
            startActivity(Intent(this, LoginActivity::class.java))
        }
    }
}