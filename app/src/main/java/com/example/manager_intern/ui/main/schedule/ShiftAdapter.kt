package com.example.manager_intern.ui.main.schedule

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.AdapterView
import android.widget.ArrayAdapter
import com.example.manager_intern.R
import com.example.manager_intern.base.BaseRecyclerViewAdapter
import com.example.manager_intern.base.BaseViewHolder
import com.example.manager_intern.data.model.Shift
import com.example.manager_intern.data.remote.responsive.ScheduleData
import com.example.manager_intern.databinding.ItemSpinnerBinding

class ShiftAdapter(
    list: List<String>,
    val scheduleData: List<ScheduleData>,
) : BaseRecyclerViewAdapter<String>(list) {

    val listShift = mutableListOf(3, 3, 3, 3, 3)

    override fun setViewHolder(parent: ViewGroup, viewType: Int): BaseViewHolder<String> {
        return ShiftViewHolder(
            LayoutInflater.from(parent.context).inflate(R.layout.item_spinner, parent, false)
        )
    }

    inner class ShiftViewHolder(itemView: View) : BaseViewHolder<String>(itemView) {

        private val binding by viewBinding(ItemSpinnerBinding::bind)

        init {
            binding.spinner.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
                override fun onItemSelected(
                    parent: AdapterView<*>?,
                    view: View?,
                    position: Int,
                    id: Long
                ) {
                    listShift[adapterPosition] = position
                }

                override fun onNothingSelected(parent: AdapterView<*>?) {

                }

            }
        }

        override fun onBind(item: String) {
            val options = Shift.values().map { it.des }
            val spinnerAdapter =
                ArrayAdapter(itemView.context, android.R.layout.simple_spinner_item, options)

            with(binding) {
                tvDate.text = item
                spinner.adapter = spinnerAdapter
                binding.spinner.setSelection(3)
            }

            if (scheduleData.isNotEmpty()) {
                (scheduleData.indices).forEach { i ->
                    val date = scheduleData[i].time
                    if (item == date) {
                        binding.spinner.setSelection(scheduleData[i].shift)
                    }
                }
            }
        }
    }
}