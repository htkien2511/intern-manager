package com.example.manager_intern.ui.feedback

import android.view.View
import com.example.manager_intern.base.BaseActivity
import com.example.manager_intern.base.BaseViewModel
import com.example.manager_intern.data.remote.request.FeedBackRequest
import com.example.manager_intern.data.remote.responsive.FeedbackData
import com.example.manager_intern.data.remote.responsive.UserData
import com.example.manager_intern.databinding.FeedbackActBinding

class FeedBackActivity : BaseActivity<FeedBackViewModel>() {

    override var viewModelFactory: Class<FeedBackViewModel> = FeedBackViewModel::class.java

    override val binding by viewBinding(FeedbackActBinding::inflate)

    private var taskId: Int? = null

    private val list = mutableListOf<FeedbackData>()

    private var userData: UserData? = null

    private lateinit var adapter: FeedbackAdapter

    override fun initView() {
        adapter = FeedbackAdapter(list)
        binding.rlFeedbacks.adapter = adapter
        taskId = intent.getIntExtra("TaskId", 0)
        BaseViewModel.userResponsive.observe(this) {
            if (it != null) {
                userData = it.userData
                viewModel?.getFeedbacksOfTask(taskId!!, it.userData.token)
            }
        }
    }

    override fun initListener() {
        viewModel!!.feedbackData.observe(this) {
            it?.let {
                list.clear()
                list.addAll(it)
                adapter.notifyDataSetChanged()
            }

            if (it == null) {
                binding.tvEmpty.visibility = View.VISIBLE
            }
        }

        binding.btnSend.setOnClickListener {
            if (binding.edtFeedback.text.isNotEmpty()) {
                val content = binding.edtFeedback.text.toString()
                val feedBackRequest = taskId?.let { it1 -> FeedBackRequest(it1, content) }
                if (userData != null) {
                    if (feedBackRequest != null) {
                        viewModel?.addFeedBack(userData!!.token, feedBackRequest)
                        taskId?.let { it1 -> viewModel?.getFeedbacksOfTask(it1, userData!!.token) }
                        binding.edtFeedback.setText("")
                    }
                }
            }
        }

        binding.toolbar.setOnClickListener { onBackPressed() }
    }
}