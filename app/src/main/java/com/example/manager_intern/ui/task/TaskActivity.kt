package com.example.manager_intern.ui.task

import android.util.Log
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.manager_intern.R
import com.example.manager_intern.base.BaseActivity
import com.example.manager_intern.base.BaseViewModel
import com.example.manager_intern.data.remote.request.TaskRequest
import com.example.manager_intern.data.remote.responsive.ProjectData
import com.example.manager_intern.data.remote.responsive.TaskData
import com.example.manager_intern.data.remote.responsive.UserData
import com.example.manager_intern.databinding.DetailTaskActBinding

class TaskActivity : BaseActivity<TaskViewModel>() {

    override var viewModelFactory = TaskViewModel::class.java
    private var projectData: ProjectData? = null
    private lateinit var taskAdapter: TaskAdapter
    private val data = mutableListOf<TaskData>()

    override val binding by viewBinding(DetailTaskActBinding::inflate)

    private var userData: UserData? = null

    override fun initView() {
        taskAdapter = TaskAdapter(data) { task, isChecked ->
            var progress = binding.progressBar.progress
            if (isChecked) {
                progress += 100 / data.size
            } else {
                progress -= 100 / data.size
            }

            binding.progressBar.progress = progress
            binding.tvProgress.text = binding.progressBar.progress.toString() + " %"

            val taskRequest = TaskRequest(task.taskId, task.description, task.title, task.difficulty, isChecked, task.point, task.dueDate ?: "", task.usersAssignee)
            if (userData != null) {
                viewModel?.updateTask(userData!!.token, taskRequest)
            }
        }

        with(binding) {
            toolbar.title = "Shappe Clound App"
            toolbar.setTitleTextColor(resources.getColor(R.color.white))
            recyclerViewTask.layoutManager = LinearLayoutManager(this@TaskActivity)
            recyclerViewTask.adapter = taskAdapter
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
            }

            updateSuccess.observe(this@TaskActivity) {
                if (!it) {

                }
            }
        }

        with(binding) {
            toolbar.setNavigationOnClickListener { onBackPressed() }
        }

    }
}