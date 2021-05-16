package com.example.manager_intern.ui.task

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.example.manager_intern.R
import com.example.manager_intern.base.BaseRecyclerViewAdapter
import com.example.manager_intern.base.BaseViewHolder
import com.example.manager_intern.data.remote.responsive.FeedbackData
import com.example.manager_intern.databinding.ItemFeedbackBinding

class FeedbackAdapter(val list: List<FeedbackData>) : BaseRecyclerViewAdapter<FeedbackData>(list) {

    inner class FeedbackViewHolder(itemView: View) : BaseViewHolder<FeedbackData>(itemView) {

        private val binding by viewBinding(ItemFeedbackBinding::bind)

        override fun onBind(item: FeedbackData) {
            binding.tvFeedback.text = item.feedbackContent
        }
    }

    override fun setViewHolder(parent: ViewGroup, viewType: Int): BaseViewHolder<FeedbackData> {
        return FeedbackViewHolder(
            LayoutInflater.from(parent.context).inflate(R.layout.item_feedback, parent, false)
        )
    }
}