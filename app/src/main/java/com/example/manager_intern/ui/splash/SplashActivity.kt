package com.example.manager_intern.ui.splash

import android.content.Intent
import com.example.manager_intern.base.BaseActivity
import com.example.manager_intern.base.BaseViewModel
import com.example.manager_intern.data.remote.responsive.UserResponsive
import com.example.manager_intern.databinding.SplashActBinding
import com.example.manager_intern.ui.login.LoginActivity
import com.example.manager_intern.ui.login.LoginViewModel
import com.example.manager_intern.ui.main.MainActivity
import com.example.manager_intern.utils.Pref
import io.reactivex.Observable
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.schedulers.Schedulers
import java.util.concurrent.TimeUnit

class SplashActivity : BaseActivity<LoginViewModel>() {

    override var viewModelFactory = LoginViewModel::class.java

    private var userResponsive: UserResponsive? = null

    private val disposable = CompositeDisposable()

    override val binding by viewBinding(SplashActBinding::inflate)

    override fun initView() {
        if (Pref.isLogin) {
            viewModel?.login(Pref.username, Pref.password)
        }

        disposable.add(
            Observable.interval(4, TimeUnit.SECONDS)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe {
                    if (userResponsive != null) {
                        startActivity(Intent(this, MainActivity::class.java))
                    } else {
                        startActivity(Intent(this, LoginActivity::class.java))
                    }

                    finish()
                }
        )
    }

    override fun initListener() {
        BaseViewModel.userResponsive.observe(this) {
            userResponsive = it
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        disposable.clear()
    }
}