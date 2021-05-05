package com.example.manager_intern.ui.main.home

import android.content.Intent
import android.text.Editable
import android.text.TextWatcher
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.manager_intern.R
import com.example.manager_intern.base.BaseFragment
import com.example.manager_intern.base.BaseViewModel
import com.example.manager_intern.base.viewBinding
import com.example.manager_intern.data.remote.responsive.ProjectData
import com.example.manager_intern.databinding.HomeFragBinding
import com.example.manager_intern.ui.task.TaskActivity

class HomeFragment : BaseFragment<HomeViewModel>(R.layout.home_frag) {

    private val binding by viewBinding(HomeFragBinding::bind)

    private val list = mutableListOf<ProjectData>()
    private lateinit var adapter: HomeAdapter

    override var viewModelFactory: Class<HomeViewModel> = HomeViewModel::class.java

    override fun initView() {
        adapter = HomeAdapter(list) {
            val intent = Intent(requireActivity(), TaskActivity::class.java)
            intent.putExtra("project", it)
            startActivity(intent)
        }

        with(binding) {
            recyclerViewProject.layoutManager = LinearLayoutManager(requireActivity())
            recyclerViewProject.adapter = adapter
        }
    }

    override fun initListener() {
        BaseViewModel.userResponsive.observe(this) {
            if (it != null) {
                viewModel?.getProjectByUserId(it.userData.token, it.userData.id)
            }
        }

        viewModel?.projectResponsive?.observe(this) {
            it.data?.let { data ->
                list.clear()
                list.addAll(data)
                adapter.initData()
                adapter.notifyDataSetChanged()
            }
        }

        binding.searchTask.addTextChangedListener(object : TextWatcher {
            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {

            }

            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
                adapter.filter.filter(s)
            }

            override fun afterTextChanged(s: Editable?) {

            }

        })
    }
}