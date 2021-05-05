package com.example.manager_intern.base

import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.example.manager_intern.extensions.closeProgress
import com.example.manager_intern.extensions.showProgress

abstract class BaseFragment<T : BaseViewModel>(layoutId: Int) : Fragment(layoutId) {

    var viewModel: T? = null

    abstract var viewModelFactory: Class<T>

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        obtainViewModel()

        viewModel?.onError?.observe(viewLifecycleOwner, {
            showError(it)
        })

        viewModel?.loader?.observe(this, {
            if (it) {
                showLoading()
            } else {
                closeLoading()
            }
        })

        initView()
        initListener()
    }

    protected abstract fun initView()
    protected abstract fun initListener()

    private fun obtainViewModel() {
        viewModel = ViewModelProvider(this).get(viewModelFactory)
    }

    private fun showError(message: String) {
        Toast.makeText(context, message, Toast.LENGTH_SHORT).show()
    }

    private fun showLoading() {
        activity?.showProgress()
    }

    private fun closeLoading() {
        activity?.closeProgress()
    }
}