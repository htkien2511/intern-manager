package com.example.manager_intern.base

import android.app.Activity
import android.app.AlertDialog
import android.os.Bundle
import android.view.LayoutInflater
import android.view.WindowManager
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.ViewModelProvider
import androidx.viewbinding.ViewBinding
import com.example.manager_intern.extensions.closeProgress
import com.example.manager_intern.extensions.showProgress
import es.dmoral.toasty.Toasty

abstract class BaseActivity<T : BaseViewModel> : AppCompatActivity() {

    var viewModel: T? = null

    abstract var viewModelFactory: Class<T>

    private var alertDialog: AlertDialog? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)

        obtainViewModel()

        viewModel?.onError?.observe(this, {
            showError(it)
        })

        viewModel?.loader?.observe(this, {
            if (it) {
                showLoading()
            } else {
                closeLoading()
            }
        })

        //setStatusBar()
        initView()
        initListener()
    }

    protected abstract val binding: ViewBinding

    protected abstract fun initView()

    protected abstract fun initListener()

    protected fun setStatusBar() {
        window.setFlags(
            WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS,
            WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS
        )
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
        Toasty.error(this, message, Toast.LENGTH_SHORT, true).show()
    }

    private fun showLoading() {
        showProgress()
    }

    private fun closeLoading() {
        closeProgress()
    }
}