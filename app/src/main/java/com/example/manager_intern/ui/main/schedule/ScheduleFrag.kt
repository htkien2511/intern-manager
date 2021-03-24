package com.example.manager_intern.ui.main.schedule

import com.example.manager_intern.R
import com.example.manager_intern.base.BaseFragment
import com.example.manager_intern.base.viewBinding
import com.example.manager_intern.databinding.ScheduleFragBinding
import com.example.manager_intern.ui.main.schedule.shift.ShiftFragment
import com.example.manager_intern.ui.main.schedule.task.TaskFragment

class ScheduleFrag : BaseFragment(R.layout.schedule_frag) {

    private val binding by viewBinding(ScheduleFragBinding::bind)

    private lateinit var adapter: SchedulePagerAdapter

    override fun initView() {
        activity?.let {
            adapter = SchedulePagerAdapter(it.supportFragmentManager, listOf(TaskFragment.newInstance(), ShiftFragment.newInstance()))
        }

        with(binding) {
            viewPager.adapter = adapter
            tabLayout.setupWithViewPager(viewPager)
        }
    }

    override fun initListener() {

    }
}