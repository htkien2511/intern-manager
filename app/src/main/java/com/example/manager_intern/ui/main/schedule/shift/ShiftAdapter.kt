package com.example.manager_intern.ui.main.schedule.shift

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
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

    override fun setViewHolder(parent: ViewGroup, viewType: Int): BaseViewHolder<String> {
        return ShiftViewHolder(
            LayoutInflater.from(parent.context).inflate(R.layout.item_spinner, parent, false)
        )
    }

    inner class ShiftViewHolder(itemView: View) : BaseViewHolder<String>(itemView) {

        private val binding by viewBinding(ItemSpinnerBinding::bind)

        override fun onBind(item: String) {
            val options = Shift.values().map { it.des }
            val spinnerAdapter =
                ArrayAdapter(itemView.context, android.R.layout.simple_spinner_item, options)

            with(binding) {
                tvDate.text = item
                spinner.adapter = spinnerAdapter
                binding.spinner.setSelection(3)

                if (adapterPosition == 5 || adapterPosition == 6) {
                    binding.spinner.setSelection(2)
                }
            }

            if (scheduleData.isNotEmpty()) {
                (scheduleData.indices).forEach { i ->
                    val date = scheduleData[i].time.split(" ")[0]
                    if (item == date) {
                        binding.spinner.setSelection(scheduleData[i].shift)
                    }
                }
            }
        }
    }
}