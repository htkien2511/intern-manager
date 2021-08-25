package com.example.manager_intern.ui.main.schedule

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
import com.example.manager_intern.utils.Pref
import java.text.DateFormat
import java.text.SimpleDateFormat
import java.util.*

class ShiftFragment : BaseFragment<ScheduleViewModel>(R.layout.shift_frag) {

    override var viewModelFactory: Class<ScheduleViewModel> = ScheduleViewModel::class.java

    private val binding by viewBinding(ShiftFragBinding::bind)

    private lateinit var adapter: ShiftAdapter

    private var count = 0

    private var isSubmit = false

    private val dates = mutableListOf<String>()
    private val daysOff = mutableListOf<ScheduleData>()
    private var userData: UserData? = null
    private var daysOffString = mutableListOf<String>()

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
            dates.clear()
            dates.addAll(getDaysInNetWeek())
            dates.sort()
            daysOff.clear()
            daysOff.addAll(it)
            daysOff.sortBy { d -> d.time }
            daysOffString.clear()
            daysOffString.addAll(it.map { item -> item.time })
            daysOffString.sort()
            binding.rvSpinner.adapter = adapter
            count = 0
        }

        binding.btnSubmitShift.setOnClickListener {
            val listShift = adapter.listShift
            val reasons = adapter.reasons
            (0 until listShift.size).forEach { i ->
                if (daysOffString.contains(dates[i]) && listShift[i] == 3) {
                    val index = daysOffString.indexOf(dates[i]);
                    count++
                    userData?.let { it1 -> viewModel?.deleteSchedule(it1.token, daysOff[index].id) }
                }

                if (listShift[i] != 3) {
                    val body =
                        ScheduleRequest(reasons[i], dates[i], listShift[i], Pref.userId)
                    if (userData != null) {
                        if (daysOffString.contains(dates[i])) {
                            val index = daysOffString.indexOf(dates[i]);
                            viewModel?.updateLeave(userData!!.token, daysOff[index].id, body)
                        } else {
                            count++
                            Log.d("___TAG", "initListener: $count")
                            viewModel?.addLeave(userData!!.token, body)
                        }
                    }
                }
            }
        }

        viewModel?.requestSuccess?.observe(this) {
            if (it != 0 && it == count) {
                userData?.let { user ->
                    Log.d("___TAG", "refresh : ")
                    viewModel?.getScheduleById(user.token, user.id)
                }
            }
        }
    }

    private fun getDaysInNetWeek(): List<String> {
        val format: DateFormat = SimpleDateFormat("yyyy/MM/dd")
        val calendar: Calendar = Calendar.getInstance()
        calendar.firstDayOfWeek = Calendar.MONDAY

        if (calendar.get(Calendar.DAY_OF_WEEK) == 7 || calendar.get(Calendar.DAY_OF_WEEK) == 1 || calendar.get(
                Calendar.DAY_OF_WEEK
            ) == 3
        ) {
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