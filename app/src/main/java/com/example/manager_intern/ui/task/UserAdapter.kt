package com.example.manager_intern.ui.task

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.bumptech.glide.Glide
import com.example.manager_intern.R
import com.example.manager_intern.base.BaseRecyclerViewAdapter
import com.example.manager_intern.base.BaseViewHolder
import com.example.manager_intern.data.remote.responsive.UserResponsive
import com.example.manager_intern.databinding.ItemUserBinding

class UserAdapter(users: List<UserResponsive>) : BaseRecyclerViewAdapter<UserResponsive>(users) {
    inner class UserViewHolder(itemView: View) : BaseViewHolder<UserResponsive>(itemView) {

        val binding by viewBinding(ItemUserBinding::bind)

        override fun onBind(item: UserResponsive) {
            Glide.with(itemView.context)
                .load(item.drawableId)
                .into(binding.imgItemUser)
        }

    }

    override fun setViewHolder(parent: ViewGroup, viewType: Int): BaseViewHolder<UserResponsive> {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_user, parent, false)
        return UserViewHolder(view)
    }
}