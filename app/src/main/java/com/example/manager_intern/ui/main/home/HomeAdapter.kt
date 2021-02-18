package com.example.manager_intern.ui.main.home

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.example.manager_intern.R
import com.example.manager_intern.base.BaseRecyclerViewAdapter
import com.example.manager_intern.base.BaseViewHolder
import com.example.manager_intern.data.model.Task
import com.example.manager_intern.databinding.ItemTaskBinding
import com.example.manager_intern.utils.Constants
import com.google.android.gms.ads.AdView

class HomeAdapter(list: MutableList<Any>) :
    BaseRecyclerViewAdapter<Any>(list) {

    override fun setViewHolder(parent: ViewGroup, viewType: Int): BaseViewHolder<Any> {
        val view: View?
        return when (viewType) {
            Constants.ADS_TYPE -> {
                view = LayoutInflater.from(parent.context)
                    .inflate(R.layout.item_banner_ads, parent, false)
                BannerViewHolder(view)
            }

            else -> {
                view =
                    LayoutInflater.from(parent.context).inflate(R.layout.item_task, parent, false)
                TaskViewHolder(view)
            }
        }
    }

    override fun getItemViewType(position: Int): Int {
        if (position % Constants.ITEMS_PER_ID == 0 && position != 0) {
            return Constants.ADS_TYPE
        }
        return Constants.CONTENT_TYPE
    }

    inner class TaskViewHolder(itemView: View) : BaseViewHolder<Any>(itemView) {

        private val binding by viewBinding(ItemTaskBinding::bind)

        override fun onBind(item: Any) {
            if (item is Task) {
                with(binding) {
                    tvTitleTask.text = item.title
                    tvDescriptionTask.text = item.description
                    tvDueDateTask.text = item.dueDate.toString()
                }
            }

            //itemView.setOnClickListener { itemHomeClickListener(item) }
        }
    }

    inner class BannerViewHolder(itemView: View) : BaseViewHolder<Any>(itemView) {

        override fun onBind(item: Any) {
            if (item is AdView) {
                val adCardView = itemView as ViewGroup
                if (adCardView.childCount > 0) {
                    adCardView.removeAllViews()
                }

                if (item.parent != null) {
                    (item.parent as ViewGroup).removeView(item)
                }

                adCardView.addView(item)
            }
        }
    }
}