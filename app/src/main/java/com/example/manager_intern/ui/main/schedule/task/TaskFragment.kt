package com.example.manager_intern.ui.main.schedule.task

import android.widget.LinearLayout
import com.example.manager_intern.R
import com.example.manager_intern.base.BaseFragment
import com.example.manager_intern.base.viewBinding
import com.example.manager_intern.data.dao.TaskDao
import com.example.manager_intern.data.model.Task
import com.example.manager_intern.databinding.TaskFragBinding
import java.util.*

class TaskFragment : BaseFragment(R.layout.task_frag) {

    companion object {
        fun newInstance() = TaskFragment()
    }

    private val binding by viewBinding(TaskFragBinding::bind)

    private lateinit var list: MutableList<Task>
    private lateinit var adapter: TaskAdapter
    private lateinit var dao: TaskDao

    override fun initView() {
        dao = TaskDao()
        list = dao.getAll()
        adapter = TaskAdapter(list)

        with(binding) {
            calendarView.apply {
                firstDayOfWeek = Calendar.MONDAY
                calendarOrientation = LinearLayout.HORIZONTAL
                weekendDays = setOf(Calendar.SATURDAY.toLong(), Calendar.SUNDAY.toLong())
                currentDayTextColor = R.color.primarySecond
                selectedDayBackgroundColor = R.color.primarySecond
            }

            listSchedule.adapter = adapter
        }
    }

    override fun initListener() {

    }
}