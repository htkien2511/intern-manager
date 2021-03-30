package com.example.manager_intern.base

import android.app.Activity
import android.os.Bundle
import android.view.LayoutInflater
import android.view.WindowManager
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.lifecycle.ViewModelProvider
import androidx.viewbinding.ViewBinding

abstract class BaseActivity<T : BaseViewModel> : AppCompatActivity() {

    var viewModel: T? = null

    abstract var viewModelFactory: Class<T>

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)

        obtainViewModel()

        viewModel?.onError?.observe(this, {
            showError(it)
        })

        initView()
        initListener()
    }

    protected abstract val binding: ViewBinding

    protected abstract fun initView()

    protected abstract fun initListener()

    protected fun setStatusBarColor(colorCode: Int) {
        window.apply {
            addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS)
            statusBarColor = ContextCompat.getColor(this@BaseActivity, colorCode)
        }
    }

    private fun obtainViewModel() {
        viewModel = ViewModelProvider(this).get(viewModelFactory)
    }

    inline fun <T : ViewBinding> Activity.viewBinding(
        crossinline bindingInflater: (LayoutInflater) -> T
    ) =
        lazy(LazyThreadSafetyMode.NONE) {
            bindingInflater.invoke(layoutInflater)
        }

    private fun showError(message: String) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
    }
}