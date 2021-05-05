package com.example.manager_intern.ui.main.schedule.shift

import com.example.manager_intern.R
import com.example.manager_intern.base.BaseFragment
import com.example.manager_intern.base.viewBinding
import com.example.manager_intern.databinding.ShiftFragBinding
import com.example.manager_intern.ui.main.schedule.ScheduleViewModel
import java.text.DateFormat
import java.text.SimpleDateFormat
import java.util.*

class ShiftFragment : BaseFragment<ScheduleViewModel>(R.layout.shift_frag) {

    override var viewModelFactory: Class<ScheduleViewModel> = ScheduleViewModel::class.java

    private val binding by viewBinding(ShiftFragBinding::bind)

    override fun initView() {
       val adapter = ShiftAdapter(getDaysInNetWeek())
       binding.rvSpinner.adapter = adapter
    }

    override fun initListener() {

    }

    fun getDaysInNetWeek() : List<String> {
        val format: DateFormat = SimpleDateFormat("dd-MM-yyyy")
        val calendar: Calendar = Calendar.getInstance()
        calendar.add(Calendar.DAY_OF_MONTH, 7)
        calendar.firstDayOfWeek = Calendar.MONDAY
        calendar.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY)

        val days = mutableListOf<String>()
        for (i in 0..6) {
            days.add(format.format(calendar.time))
            calendar.add(Calendar.DAY_OF_MONTH, 1)
        }

        return days
    }
}