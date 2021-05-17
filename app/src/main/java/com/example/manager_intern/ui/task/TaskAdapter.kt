package com.example.manager_intern.ui.task

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.manager_intern.R
import com.example.manager_intern.data.remote.responsive.TaskData
import com.example.manager_intern.databinding.ItemTaskBinding
import com.example.manager_intern.ui.feedback.FeedbackAdapter

class TaskAdapter(
    private val tasks: List<TaskData>,
    val onCheckedListener: (TaskData, Boolean) -> Unit, val itemClick: (Int) -> Unit
) : RecyclerView.Adapter<TaskAdapter.TaskViewHolder>() {


    inner class TaskViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val binding = ItemTaskBinding.bind(itemView)
        private lateinit var adapter: FeedbackAdapter

        init {
            binding.chkIsDone.setOnCheckedChangeListener { _, isChecked ->
                onCheckedListener(tasks[adapterPosition], isChecked)
            }
        }

        fun onBind(item: TaskData) {
            itemView.setOnClickListener { itemClick(item.taskId) }
            binding.tvTask.text = item.title
            binding.chkIsDone.isChecked = item.isDone
        }
    }

    override fun getItemCount(): Int = tasks.size

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): TaskViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_task, parent, false)
        return TaskViewHolder(view)
    }

    override fun onBindViewHolder(holder: TaskViewHolder, position: Int) {
        holder.onBind(tasks[position])
    }
}