package com.example.manager_intern.base

import android.view.View
import androidx.recyclerview.widget.RecyclerView
import androidx.viewbinding.ViewBinding

abstract class BaseViewHolder<E>(itemView: View) : RecyclerView.ViewHolder(itemView) {

    abstract fun onBind(item: E)

    inline fun <T : ViewBinding> RecyclerView.ViewHolder.viewBinding(
        crossinline bindingBind: (View) -> T
    ) = lazy(LazyThreadSafetyMode.NONE) {
        bindingBind.invoke(itemView)
    }
}