package com.example.manager_intern.ui.main.home

import android.graphics.Color
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Filter
import android.widget.Filterable
import androidx.recyclerview.widget.RecyclerView
import com.example.manager_intern.R
import com.example.manager_intern.base.BaseViewHolder
import com.example.manager_intern.data.remote.responsive.ProjectData
import com.example.manager_intern.databinding.ItemProjectBinding
import java.util.*

class HomeAdapter(
    var list: List<ProjectData>,
    val itemHomeClickListener: (ProjectData) -> Unit
) :
    RecyclerView.Adapter<HomeAdapter.TaskViewHolder>(), Filterable {

    var filterList = listOf<ProjectData>()
    var originList = mutableListOf<ProjectData>()

    init {
        initData()
    }

    inner class TaskViewHolder(itemView: View) : BaseViewHolder<ProjectData>(itemView) {

        private val binding by viewBinding(ItemProjectBinding::bind)

        override fun onBind(item: ProjectData) {
            with(binding) {
                titleTask.text = item.title

                val rd = Random()
                val color = Color.argb(255, rd.nextInt(256), rd.nextInt(256), rd.nextInt(256))
                binding.backgroundTask.setBackgroundColor(color)
            }

            itemView.setOnClickListener { itemHomeClickListener(item) }
        }
    }

    override fun getFilter(): Filter =
        object : Filter() {
            override fun performFiltering(constraint: CharSequence?): FilterResults {
                val query = constraint.toString()
                val filterResults = FilterResults()
                filterList = if (query.isEmpty()) {
                    list
                } else (
                        originList.filter { item ->
                            item.title.toLowerCase(Locale.ROOT)
                                .contains(query.toLowerCase(Locale.ROOT))
                        }
                        )

                filterResults.values = filterList

                return filterResults
            }

            override fun publishResults(constraint: CharSequence?, results: FilterResults?) {
                results?.let {
                    list = results.values as List<ProjectData>
                    notifyDataSetChanged()
                }
            }
        }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): TaskViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_project, parent, false)
        return TaskViewHolder(view)
    }

    override fun onBindViewHolder(holder: TaskViewHolder, position: Int) {
        holder.onBind(list[position])
    }

    override fun getItemCount(): Int = filterList.size

    fun initData() {
        originList = list.toMutableList()
        filterList = list.toMutableList()
    }
}