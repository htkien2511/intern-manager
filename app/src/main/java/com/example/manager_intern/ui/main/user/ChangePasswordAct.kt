package com.example.manager_intern.ui.main.user

import android.content.Intent
import android.widget.Toast
import com.example.manager_intern.base.BaseActivity
import com.example.manager_intern.base.BaseViewModel
import com.example.manager_intern.databinding.ChangePassActBinding
import com.example.manager_intern.ui.login.LoginActivity
import com.example.manager_intern.utils.Pref
import es.dmoral.toasty.Toasty

class ChangePasswordAct : BaseActivity<UserViewModel>() {

    override var viewModelFactory: Class<UserViewModel> = UserViewModel::class.java

    override val binding by viewBinding(ChangePassActBinding::inflate)

    override fun initView() {

    }

    override fun initListener() {
        with(binding) {
            btnReset.setOnClickListener {
                val oldPass = edtOldPass.text.toString()
                val password = edtPassword.text.toString()
                val rePassword = edtRePassword.text.toString()

                if (oldPass.isEmpty() || password.isEmpty() || rePassword.isEmpty()) {
                    Toasty.error(
                        this@ChangePasswordAct,
                        "Please enter enough fields",
                        Toast.LENGTH_SHORT,
                        true
                    ).show()
                } else if (password != rePassword) {
                    Toasty.error(
                        this@ChangePasswordAct,
                        "Re password is wrong",
                        Toast.LENGTH_SHORT,
                        true
                    ).show()
                } else {
                    viewModel?.changePassword(oldPass, password)
                }
            }
        }

        viewModel?.responsive?.observe(this) {
            if (it.success) {
                Toasty.success(this, it.message, Toast.LENGTH_SHORT).show()
                BaseViewModel.userResponsive.value = null
                startActivity(Intent(this, LoginActivity::class.java))
            } else {
                Toasty.error(this, it.message, Toast.LENGTH_SHORT).show()
            }
        }
    }
}