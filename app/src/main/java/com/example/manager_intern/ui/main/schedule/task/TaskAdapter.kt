package com.example.manager_intern.ui.main.schedule.task

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.example.manager_intern.R
import com.example.manager_intern.base.BaseRecyclerViewAdapter
import com.example.manager_intern.base.BaseViewHolder
import com.example.manager_intern.data.model.Task
import com.example.manager_intern.databinding.ItemScheduleBinding
import java.util.*

class TaskAdapter(list: List<Task>) : BaseRecyclerViewAdapter<Task>(list) {
    override fun setViewHolder(parent: ViewGroup, viewType: Int): BaseViewHolder<Task> {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_schedule, parent, false)
        return ScheduleViewHolder(view)
    }

    inner class ScheduleViewHolder(itemView: View) : BaseViewHolder<Task>(itemView) {

        val binding by viewBinding (ItemScheduleBinding::bind)

        override fun onBind(item: Task) {
            with(binding) {
                val calendar = Calendar.getInstance()
                calendar.time = item.dueDate
                day.text = calendar.get(Calendar.DAY_OF_MONTH).toString()
                day.text = calendar.getDisplayName(Calendar.MONTH, Calendar.LONG, Locale.getDefault())
                time.text = "${calendar.get(Calendar.HOUR_OF_DAY).toString()}: ${calendar.get(Calendar.MINUTE)}"
                title.text = item.title
                description.text = item.description
            }
        }
    }
}