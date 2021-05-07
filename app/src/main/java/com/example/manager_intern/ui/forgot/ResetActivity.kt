package com.example.manager_intern.ui.forgot

import android.content.Intent
import android.widget.Toast
import com.example.manager_intern.base.BaseActivity
import com.example.manager_intern.databinding.ResetPasswordActBinding
import com.example.manager_intern.ui.login.LoginActivity
import es.dmoral.toasty.Toasty

class ResetActivity : BaseActivity<ForgotViewModel>() {

    override var viewModelFactory: Class<ForgotViewModel> = ForgotViewModel::class.java

    override val binding by viewBinding(ResetPasswordActBinding::inflate)

    override fun initView() {

    }

    override fun initListener() {
        with(binding) {
            btnReset.setOnClickListener {
                val token = edtToken.text.toString()
                val password = edtPassword.text.toString()
                val rePassword = edtRePassword.text.toString()

                if (token.isEmpty() || password.isEmpty() || rePassword.isEmpty()) {
                    Toasty.error(
                        this@ResetActivity,
                        "Please enter enough fields",
                        Toast.LENGTH_SHORT,
                        true
                    ).show()
                } else if (password != rePassword) {
                    Toasty.error(
                        this@ResetActivity,
                        "Re password is wrong",
                        Toast.LENGTH_SHORT,
                        true
                    ).show()
                } else {
                    viewModel?.resetPassword(token, password)
                }
            }
        }

        viewModel?.resetPasswordSuccess?.observe(this) {
            Toasty.success(this, it.message, Toast.LENGTH_SHORT, true).show()
            startActivity(Intent(this, LoginActivity::class.java))
        }
    }
}