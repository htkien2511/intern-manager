package com.example.manager_intern.ui.main.home

import android.content.Intent
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.manager_intern.R
import com.example.manager_intern.base.BaseFragment
import com.example.manager_intern.base.viewBinding
import com.example.manager_intern.data.dao.TaskDao
import com.example.manager_intern.data.model.Task
import com.example.manager_intern.databinding.HomeFragBinding
import com.example.manager_intern.ui.task.TaskActivity

class HomeFragment : BaseFragment(R.layout.home_frag) {

    private val binding by viewBinding(HomeFragBinding::bind)

    private lateinit var list: MutableList<Task>
    private lateinit var adapter: HomeAdapter
    private lateinit var dao: TaskDao
    private lateinit var temps: MutableList<Task>

    override fun initView() {
        list = mutableListOf()

        dao = TaskDao()
        list.addAll(dao.getAll())
        temps = list.subList(0, list.size)
        adapter = HomeAdapter(list) {
            val intent = Intent(requireActivity(), TaskActivity::class.java)
            startActivity(intent)
        }

        with(binding) {
            recyclerViewProject.layoutManager = LinearLayoutManager(requireActivity())
            recyclerViewProject.adapter = adapter
        }
    }

    override fun initListener() {

    }
}