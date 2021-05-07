package com.example.manager_intern.ui.forgot

import android.content.Intent
import android.widget.Toast
import com.example.manager_intern.base.BaseActivity
import com.example.manager_intern.databinding.ForgotPasswordActBinding
import com.example.manager_intern.ui.login.LoginActivity
import es.dmoral.toasty.Toasty

class ForgotActivity : BaseActivity<ForgotViewModel>() {

    override var viewModelFactory: Class<ForgotViewModel> = ForgotViewModel::class.java

    override val binding by viewBinding(ForgotPasswordActBinding::inflate)

    override fun initView() {

    }

    override fun initListener() {
        binding.btnReset.setOnClickListener {
            val email = binding.edtEmail.text.toString()
            if (email.isNotEmpty()) {
                viewModel?.forgotPassword(email)
            }
        }

        viewModel?.forgotResponsive?.observe(this) {
            Toasty.success(this, it.message, Toast.LENGTH_SHORT, true).show()
            startActivity(Intent(this, ResetActivity::class.java))
        }
    }
}