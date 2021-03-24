package com.example.manager_intern.ui.main.schedule.shift

import android.widget.ArrayAdapter
import com.example.manager_intern.R
import com.example.manager_intern.base.BaseFragment
import com.example.manager_intern.base.viewBinding
import com.example.manager_intern.databinding.ShiftFragBinding

class ShiftFragment : BaseFragment(R.layout.shift_frag) {

    private val shifts = listOf("Morning", "Afternoon", "Leave")

    companion object {
        fun newInstance() = ShiftFragment()
    }

    private val binding by viewBinding(ShiftFragBinding::bind)

    override fun initView() {
        val shiftAdapter =
            ArrayAdapter<String>(requireContext(), android.R.layout.simple_spinner_item, shifts)
        binding.run {
            spinner.adapter = shiftAdapter
            spinner1.adapter = shiftAdapter
            spinner2.adapter = shiftAdapter
            spinner3.adapter = shiftAdapter
            spinner4.adapter = shiftAdapter
        }
    }

    override fun initListener() {

    }
}