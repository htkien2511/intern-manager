package com.example.manager_intern.ui.task

import androidx.recyclerview.widget.LinearLayoutManager
import com.example.manager_intern.R
import com.example.manager_intern.base.BaseActivity
import com.example.manager_intern.data.remote.responsive.ProjectData
import com.example.manager_intern.data.remote.responsive.TaskData
import com.example.manager_intern.databinding.DetailTaskActBinding

class TaskActivity : BaseActivity<TaskViewModel>() {

    override var viewModelFactory = TaskViewModel::class.java
    private var projectData: ProjectData? = null
    private lateinit var taskAdapter: TaskAdapter
    private val data = mutableListOf<TaskData>()

    override val binding by viewBinding(DetailTaskActBinding::inflate)

    override fun initView() {
        taskAdapter = TaskAdapter(data) {
            var progress = binding.progressBar.progress
            if (it) {
                progress += 100 / data.size
            } else {
                progress -= 100 / data.size
            }

            binding.tvProgress.text = "$progress %"
            binding.progressBar.progress = progress
        }

        with(binding) {
            toolbar.title = "Shappe Clound App"
            toolbar.setTitleTextColor(resources.getColor(R.color.white))
            recyclerViewTask.layoutManager = LinearLayoutManager(this@TaskActivity)
            recyclerViewTask.adapter = taskAdapter
        }

        projectData = intent.getSerializableExtra("project") as ProjectData?
        projectData?.let {
            binding.tvTitle.text = it.title
            binding.tvDescription.text = it.description
            binding.tvDuedate.text = it.dueDate 
            viewModel?.getTasksOfProject(it.id)
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
        }

        with(binding) {
            toolbar.setNavigationOnClickListener { onBackPressed() }
        }
    }
}