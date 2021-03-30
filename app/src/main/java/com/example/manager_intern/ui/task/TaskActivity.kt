package com.example.manager_intern.ui.task

import com.example.manager_intern.R
import com.example.manager_intern.base.BaseActivity
import com.example.manager_intern.data.dao.AttachmentDao
import com.example.manager_intern.data.dao.TaskTestDao
import com.example.manager_intern.data.dao.UserDao
import com.example.manager_intern.databinding.DetailTaskActBinding

class TaskActivity : BaseActivity<TaskViewModel>() {

    override var viewModelFactory = TaskViewModel::class.java

    override val binding by viewBinding(DetailTaskActBinding::inflate)

    private lateinit var taskAdapter: TaskAdapter
    private lateinit var userAdapter: UserAdapter
    private lateinit var attachmentAdapter: AttachmentAdapter

    private lateinit var taskDao: TaskTestDao
    private lateinit var userDao: UserDao
    private lateinit var attachDao: AttachmentDao

    override fun initView() {
        taskDao = TaskTestDao()
        userDao = UserDao()
        attachDao = AttachmentDao()

        taskAdapter = TaskAdapter(taskDao.getAll())
        userAdapter = UserAdapter(userDao.getAll())
        attachmentAdapter = AttachmentAdapter(attachDao.getAll())

        with(binding) {
            toolbar.title = "Shappe Clound App"
            toolbar.setTitleTextColor(resources.getColor(R.color.white))
            recyclerViewTask.adapter = taskAdapter
            recyclerViewAttach.adapter = attachmentAdapter
            recyclerViewUser.adapter = userAdapter
        }

        setStatusBarColor(R.color.primary)
    }

    override fun initListener() {

    }
}