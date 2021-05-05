package com.example.manager_intern.ui.main.schedule

import android.util.Log
import androidx.viewpager.widget.ViewPager
import com.example.manager_intern.R
import com.example.manager_intern.base.BaseFragment
import com.example.manager_intern.base.viewBinding
import com.example.manager_intern.databinding.ScheduleFragBinding
import com.example.manager_intern.ui.main.schedule.shift.ShiftFragment
import com.example.manager_intern.ui.main.schedule.task.TaskFragment

class ScheduleFragment : BaseFragment<ScheduleViewModel>(R.layout.schedule_frag) {

    private val binding by viewBinding(ScheduleFragBinding::bind)

    override var viewModelFactory: Class<ScheduleViewModel> = ScheduleViewModel::class.java

    private lateinit var adapter: SchedulePagerAdapter

    override fun initView() {

        adapter = SchedulePagerAdapter(
            childFragmentManager,
            listOf(TaskFragment(), ShiftFragment())
        )

        with(binding) {
            viewPager.adapter = adapter
            tabLayout.setupWithViewPager(viewPager)
        }
    }

    override fun initListener() {
        binding.viewPager.setOnPageChangeListener(object : ViewPager.OnPageChangeListener {
            override fun onPageScrolled(
                position: Int,
                positionOffset: Float,
                positionOffsetPixels: Int
            ) {
                Log.d("___TAG", "onPageScrolled: $position")
            }

            override fun onPageSelected(position: Int) {
            }

            override fun onPageScrollStateChanged(state: Int) {
            }

        })
    }
}