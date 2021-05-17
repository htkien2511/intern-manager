package com.example.manager_intern.ui.main.schedule.shift

import android.util.Log
import android.view.View
import com.example.manager_intern.R
import com.example.manager_intern.base.BaseFragment
import com.example.manager_intern.base.BaseViewModel
import com.example.manager_intern.base.viewBinding
import com.example.manager_intern.data.remote.request.ScheduleRequest
import com.example.manager_intern.data.remote.responsive.ScheduleData
import com.example.manager_intern.data.remote.responsive.UserData
import com.example.manager_intern.databinding.ShiftFragBinding
import com.example.manager_intern.ui.main.schedule.ScheduleViewModel
import java.text.DateFormat
import java.text.SimpleDateFormat
import java.util.*

class ShiftFragment : BaseFragment<ScheduleViewModel>(R.layout.shift_frag) {

    override var viewModelFactory: Class<ScheduleViewModel> = ScheduleViewModel::class.java

    private val binding by viewBinding(ShiftFragBinding::bind)

    private lateinit var adapter: ShiftAdapter

    private val dates = mutableListOf<String>()
    private val daysOff = mutableListOf<ScheduleData>()
    private var userData: UserData? = null

    override fun initView() {

    }

    override fun initListener() {
        BaseViewModel.userResponsive.observe(this) {
            if (it != null) {
                userData = it.userData
                viewModel?.getScheduleById(it.userData.token, it.userData.id)
            }
        }

        viewModel?.scheduleData?.observe(this) {
            adapter = ShiftAdapter(getDaysInNetWeek(), it)
            dates.addAll(getDaysInNetWeek())
            daysOff.addAll(it)
            binding.rvSpinner.adapter = adapter
        }

        binding.btnSubmitShift.setOnClickListener {
            val listShift = adapter.listShift
            (0 until listShift.size - 1).forEach { i ->
                if (listShift[i] != 3) {
                    val body = ScheduleRequest("Personal reason", dates[i], listShift[i])
                    if (userData != null) {
                        viewModel?.addLeave(userData!!.token, body)
                    }

                }
            }
        }
    }

    private fun getDaysInNetWeek(): List<String> {
        val format: DateFormat = SimpleDateFormat("yyyy/MM/dd")
        val calendar: Calendar = Calendar.getInstance()
        calendar.firstDayOfWeek = Calendar.MONDAY

        if (calendar.get(Calendar.DAY_OF_WEEK) == 7 || calendar.get(Calendar.DAY_OF_WEEK) == 1) {
            calendar.add(Calendar.DAY_OF_WEEK, 7)
            binding.btnSubmitShift.visibility = View.VISIBLE
        }

        calendar.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY)

        val days = mutableListOf<String>()
        for (i in 0..4) {
            days.add(format.format(calendar.time))
            calendar.add(Calendar.DAY_OF_MONTH, 1)
        }

        return days
    }
}