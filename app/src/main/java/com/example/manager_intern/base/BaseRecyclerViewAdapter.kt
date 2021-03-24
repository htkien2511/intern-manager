package com.example.manager_intern.base

import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView

abstract class BaseRecyclerViewAdapter<E>(private var list: List<E>) :
    RecyclerView.Adapter<BaseViewHolder<E>>() {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): BaseViewHolder<E> {
        return setViewHolder(parent, viewType)
    }

    abstract fun setViewHolder(parent: ViewGroup, viewType: Int): BaseViewHolder<E>

    override fun onBindViewHolder(holder: BaseViewHolder<E>, position: Int) = holder.onBind(list[position])

    override fun getItemCount(): Int = list.size
}