package com.example.manager_intern.ui.feedback

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.manager_intern.R
import com.example.manager_intern.data.remote.responsive.FeedbackData
import com.example.manager_intern.databinding.ItemFeedbackBinding

class FeedbackAdapter(val list: List<FeedbackData>) :
    RecyclerView.Adapter<FeedbackAdapter.FeedbackViewHolder>() {

    inner class FeedbackViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {

        private val binding = ItemFeedbackBinding.bind(itemView)

        fun onBind(item: FeedbackData) {
            binding.tvFeedback.text = item.feedbackContent
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): FeedbackViewHolder {
        return FeedbackViewHolder(
            LayoutInflater.from(parent.context).inflate(R.layout.item_feedback, parent, false)
        )
    }

    override fun onBindViewHolder(holder: FeedbackViewHolder, position: Int) {
        holder.onBind(list[position])
    }

    override fun getItemCount(): Int = list.size
}