package com.example.manager_intern.ui.register

import android.content.Intent
import android.widget.Toast
import com.example.manager_intern.R
import com.example.manager_intern.base.BaseActivity
import com.example.manager_intern.databinding.RegisterActBinding
import com.example.manager_intern.ui.login.LoginActivity

class RegisterActivity : BaseActivity<RegisterViewModel>() {

    override var viewModelFactory = RegisterViewModel::class.java

    override val binding by viewBinding(RegisterActBinding::inflate)

    override fun initView() {
    }

    override fun initListener() {
        binding.run {
            login.setOnClickListener {
                startActivity(Intent(this@RegisterActivity, LoginActivity::class.java))
            }

            btnRegister.setOnClickListener {
                val email = email.text.toString()
                val username = username.text.toString()
                val password = password.text.toString()
                val rePassword = passwordAgain.text.toString()

                if (email.isEmpty() || username.isEmpty() || password.isEmpty() || rePassword.isEmpty()) {
                    Toast.makeText(
                        this@RegisterActivity,
                        "Please enter enough fields",
                        Toast.LENGTH_SHORT
                    ).show()
                } else if (password != rePassword) {
                    Toast.makeText(
                        this@RegisterActivity,
                        "Re password is wrong",
                        Toast.LENGTH_SHORT
                    ).show()
                } else {
                    viewModel?.register(email, username, password)
                }
            }
        }

        viewModel?.registerResponsive?.observe(this, {
            Toast.makeText(this, it.message, Toast.LENGTH_SHORT).show()
            startActivity(Intent(this, LoginActivity::class.java))
        })
    }
}