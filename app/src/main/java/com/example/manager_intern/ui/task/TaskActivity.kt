package com.example.manager_intern.ui.task

import android.content.Intent
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.manager_intern.R
import com.example.manager_intern.base.BaseActivity
import com.example.manager_intern.base.BaseViewModel
import com.example.manager_intern.data.remote.request.TaskRequest
import com.example.manager_intern.data.remote.responsive.ProjectData
import com.example.manager_intern.data.remote.responsive.TaskData
import com.example.manager_intern.data.remote.responsive.UserData
import com.example.manager_intern.databinding.DetailTaskActBinding
import com.example.manager_intern.ui.feedback.FeedBackActivity

class TaskActivity : BaseActivity<TaskViewModel>() {

    override var viewModelFactory = TaskViewModel::class.java
    private var projectData: ProjectData? = null
    private lateinit var taskAdapter: TaskAdapter
    private val data = mutableListOf<TaskData>()

    override val binding by viewBinding(DetailTaskActBinding::inflate)

    private var userData: UserData? = null

    override fun initView() {
        taskAdapter = TaskAdapter(data, { task, isChecked ->
            val taskRequest = TaskRequest(
                task.taskId,
                task.description,
                task.title,
                1,
                isChecked,
                task.point,
                task.dueDate ?: "",
                task.usersAssignee
            )
            if (userData != null) {
                viewModel?.updateTask(userData!!.token, taskRequest)
            }
        }, {
            Intent(this, FeedBackActivity::class.java)
                .putExtra("TaskId", it)
                .apply {
                    startActivity(this)
                }
        }).apply {
            isChanged = false
        }

        with(binding) {
            toolbar.title = "Shappe Clound App"
            toolbar.setTitleTextColor(resources.getColor(R.color.white))
            recyclerViewTask.layoutManager = LinearLayoutManager(this@TaskActivity)
            recyclerViewTask.adapter = taskAdapter
            recyclerViewTask.isNestedScrollingEnabled = false
        }

        projectData = intent.getSerializableExtra("project") as ProjectData?
        BaseViewModel.userResponsive.observe(this) {
            if (it != null) {
                userData = it.userData
                projectData?.let { projectData ->
                    binding.tvTitle.text = projectData.title
                    binding.tvDescription.text = projectData.description
                    binding.tvDuedate.text = projectData.dueDate
                    viewModel?.getTasksOfProject(projectData.id, it.userData.token)
                }
            }
        }

    }

    override fun initListener() {
        viewModel?.run {
            taskResponsive.observe(this@TaskActivity) {
                data.clear()
                data.addAll(it.data)
                taskAdapter.itemCount
                taskAdapter.notifyDataSetChanged()

                val percent =
                    (it.data.filter { item -> item.isDone }.size.toFloat() / it.data.size.toFloat()) * 100
                binding.tvProgress.text = "${percent.toInt()} %"
                binding.progressBar.progress = percent.toInt()
            }

            updateSuccess.observe(this@TaskActivity) {
                val percent =
                    (taskAdapter.tasks.filter { item -> item.isDone }.size.toFloat() / taskAdapter.tasks.size.toFloat()) * 100
                binding.tvProgress.text = "${percent.toInt()} %"
                binding.progressBar.progress = percent.toInt()
            }
        }

        with(binding) {
            toolbar.setNavigationOnClickListener { onBackPressed() }
        }

    }
}