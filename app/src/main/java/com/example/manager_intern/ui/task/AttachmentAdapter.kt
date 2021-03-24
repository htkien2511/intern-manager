package com.example.manager_intern.ui.task

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.example.manager_intern.R
import com.example.manager_intern.base.BaseRecyclerViewAdapter
import com.example.manager_intern.base.BaseViewHolder
import com.example.manager_intern.data.model.Attachment
import com.example.manager_intern.databinding.ItemAttachmentBinding

class AttachmentAdapter(attachments: List<Attachment>) :
    BaseRecyclerViewAdapter<Attachment>(attachments) {
    inner class AttachmentViewHolder(itemView: View) : BaseViewHolder<Attachment>(itemView) {
        val binding by viewBinding(ItemAttachmentBinding::bind)
        override fun onBind(item: Attachment) {
            binding.tvAttachment.text = item.title
        }
    }

    override fun setViewHolder(parent: ViewGroup, viewType: Int): BaseViewHolder<Attachment> {
        val view =
            LayoutInflater.from(parent.context).inflate(R.layout.item_attachment, parent, false)
        return AttachmentViewHolder(view)
    }
}