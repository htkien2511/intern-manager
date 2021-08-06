package com.example.manager_intern.ui.task

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.CheckBox
import androidx.recyclerview.widget.RecyclerView
import com.example.manager_intern.R
import com.example.manager_intern.data.remote.responsive.TaskData
import com.example.manager_intern.databinding.ItemTaskBinding
import com.example.manager_intern.extensions.animateCollapse
import java.text.DateFormat
import java.text.SimpleDateFormat
import java.util.*

class TaskAdapter(
    val tasks: List<TaskData>,
    val onCheckedListener: (TaskData, Boolean) -> Unit, val itemClick: (Int) -> Unit
) : RecyclerView.Adapter<TaskAdapter.TaskViewHolder>() {

    var isChanged = false

    inner class TaskViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val binding = ItemTaskBinding.bind(itemView)

        fun onBind(item: TaskData) {

            binding.run {
                tvTask.setOnClickListener {
                    item.isExpanded = !item.isExpanded
                    notifyItemChanged(adapterPosition)
                }


                chkIsDone.setOnClickListener { v ->
                    run {
                        val isChecked = (v as CheckBox).isChecked
                        item.isDone = isChecked
                        notifyItemChanged(adapterPosition)
                        onCheckedListener(tasks[adapterPosition], isChecked)
                    }
                }

                tvFeedback.setOnClickListener {
                    itemClick(item.taskId)
                }

                if (item.isExpanded) {
                    imgUp.animateCollapse()
                    llDes.visibility = View.VISIBLE
                } else {
                    llDes.visibility = View.GONE
                    imgUp.animateCollapse()
                }

                val format: DateFormat = SimpleDateFormat("yyyy/MM/dd")
                val calendar: Calendar = Calendar.getInstance()
                calendar.firstDayOfWeek = Calendar.MONDAY

                val date = item.dueDate ?: format.format(calendar.time)
                tvTask.text = item.title
                chkIsDone.isChecked = item.isDone
                tvDescription.text = root.context.getString(R.string.des, item.description)
                tvPoint.text = root.context.getString(R.string.point, item.point.toString())
                tvPeople.text = root.context.getString(R.string.people,
                        item.usersAssignee.joinToString(", ") { it.name })
                tvDuedate.text = root.context.getString(R.string.duedate, date)
            }
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