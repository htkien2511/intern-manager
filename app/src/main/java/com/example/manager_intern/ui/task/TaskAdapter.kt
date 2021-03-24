package com.example.manager_intern.ui.task

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.example.manager_intern.R
import com.example.manager_intern.base.BaseRecyclerViewAdapter
import com.example.manager_intern.base.BaseViewHolder
import com.example.manager_intern.data.model.TaskTest
import com.example.manager_intern.databinding.ItemTaskBinding

class TaskAdapter(tasks: List<TaskTest>) : BaseRecyclerViewAdapter<TaskTest>(tasks) {

    inner class TaskViewHolder(itemView: View) : BaseViewHolder<TaskTest>(itemView) {
        val binding by viewBinding(ItemTaskBinding::bind)
        override fun onBind(item: TaskTest) {
            binding.tvTask.text = item.title
        }
    }

    override fun setViewHolder(parent: ViewGroup, viewType: Int): BaseViewHolder<TaskTest> {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_task, parent, false)
        return TaskViewHolder(view)
    }
}