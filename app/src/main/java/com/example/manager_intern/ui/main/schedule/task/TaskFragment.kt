package com.example.manager_intern.ui.main.schedule.task

import android.content.Context
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout
import com.example.manager_intern.R
import com.example.manager_intern.base.BaseFragment
import com.example.manager_intern.base.viewBinding
import com.example.manager_intern.data.remote.responsive.ProjectData
import com.example.manager_intern.databinding.TaskFragBinding
import com.example.manager_intern.ui.main.schedule.ScheduleViewModel
import java.util.*

class TaskFragment : BaseFragment<ScheduleViewModel>(R.layout.task_frag) {

    private val binding by viewBinding(TaskFragBinding::bind)

    override var viewModelFactory: Class<ScheduleViewModel> = ScheduleViewModel::class.java

    private val list = mutableListOf<ProjectData>()
    private lateinit var adapter: TaskAdapter

    override fun onAttach(context: Context) {
        super.onAttach(context)
    }

    override fun onStart() {
        super.onStart()
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return super.onCreateView(inflater, container, savedInstanceState)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
    }

    override fun initView() {
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