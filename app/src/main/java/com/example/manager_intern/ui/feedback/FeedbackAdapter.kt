package com.example.manager_intern.ui.feedback

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.constraintlayout.widget.ConstraintSet
import androidx.recyclerview.widget.RecyclerView
import com.example.manager_intern.R
import com.example.manager_intern.data.remote.responsive.FeedbackData
import com.example.manager_intern.databinding.ItemFeedbackBinding
import com.example.manager_intern.utils.Pref

class FeedbackAdapter(val list: List<FeedbackData>) :
    RecyclerView.Adapter<FeedbackAdapter.FeedbackViewHolder>() {

    inner class FeedbackViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {

        private val binding = ItemFeedbackBinding.bind(itemView)

        fun onBind(item: FeedbackData) {
            binding.tvFeedback.text = item.feedbackContent

            val constraintSet = ConstraintSet()
            constraintSet.clone(binding.root)

            binding.tvUser.text = item.user

            if (item.userId == Pref.userId) {
                constraintSet.connect(
                    binding.rlMessage.id,
                    ConstraintSet.END,
                    ConstraintSet.PARENT_ID,
                    ConstraintSet.END,
                    0
                )
            } else {
                constraintSet.connect(
                    binding.rlMessage.id,
                    ConstraintSet.START,
                    ConstraintSet.PARENT_ID,
                    ConstraintSet.START,
                    0
                )
            }
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