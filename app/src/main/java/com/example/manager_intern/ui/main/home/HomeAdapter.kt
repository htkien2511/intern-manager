package com.example.manager_intern.ui.main.home

import android.graphics.Color
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.example.manager_intern.R
import com.example.manager_intern.base.BaseRecyclerViewAdapter
import com.example.manager_intern.base.BaseViewHolder
import com.example.manager_intern.data.model.Task
import com.example.manager_intern.databinding.ItemProjectBinding
import com.example.manager_intern.utils.Constants
import java.util.*

class HomeAdapter(var list: List<Task>, val itemHomeClickListener: (Task) -> Unit) :
    BaseRecyclerViewAdapter<Task>(list) {

    override fun setViewHolder(parent: ViewGroup, viewType: Int): BaseViewHolder<Task> {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_project, parent, false)
        return TaskViewHolder(view)
    }

    override fun getItemViewType(position: Int): Int {
        return Constants.CONTENT_TYPE
    }

    inner class TaskViewHolder(itemView: View) : BaseViewHolder<Task>(itemView) {

        private val binding by viewBinding(ItemProjectBinding::bind)

        override fun onBind(item: Task) {
            with(binding) {
                titleTask.text = item.title

                val rd = Random()
                val color = Color.argb(255, rd.nextInt(256), rd.nextInt(256), rd.nextInt(256))
                binding.backgroundTask.setBackgroundColor(color)
            }

            itemView.setOnClickListener { itemHomeClickListener(item) }
        }
    }
}