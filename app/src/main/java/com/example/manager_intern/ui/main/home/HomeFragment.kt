package com.example.manager_intern.ui.main.home

import androidx.recyclerview.widget.LinearLayoutManager
import com.example.manager_intern.R
import com.example.manager_intern.base.BaseFragment
import com.example.manager_intern.base.viewBinding
import com.example.manager_intern.data.dao.TaskDao
import com.example.manager_intern.databinding.HomeFragBinding
import com.example.manager_intern.utils.Constants
import com.google.android.gms.ads.AdRequest
import com.google.android.gms.ads.AdSize
import com.google.android.gms.ads.AdView
import com.google.android.gms.ads.MobileAds

class HomeFragment : BaseFragment(R.layout.home_frag) {

    private val binding by viewBinding(HomeFragBinding::bind)

    private lateinit var list: MutableList<Any>
    private lateinit var adapter: HomeAdapter
    private lateinit var dao: TaskDao

    override fun initView() {
        MobileAds.initialize(requireContext(), Constants.ADS_ID)

        list = mutableListOf()

        dao = TaskDao()
        list.addAll(dao.getAll())
        initAdMobBannerAds()
        adapter = HomeAdapter(list)

        with(binding) {
            recyclerViewTask.layoutManager = LinearLayoutManager(requireActivity())
            recyclerViewTask.adapter = adapter
        }

        loadBannerAds()
    }

    private fun initAdMobBannerAds() {
        for (i in Constants.ITEMS_PER_ID..list.size step Constants.ITEMS_PER_ID) {
            val adView = AdView(requireContext())
            adView.adSize = AdSize.BANNER
            adView.adUnitId = Constants.AD_UNIT_ID
            list.add(i, adView)
        }
    }

    private fun loadBannerAds() {
        for (item in list) {
            if (item is AdView) {
                item.loadAd(AdRequest.Builder().build())
            }
        }
    }

    override fun initListener() {

    }

    override fun onResume() {
        super.onResume()
        for (item in list) {
            if (item is AdView) {
                item.resume()
            }
        }
    }

    override fun onPause() {
        super.onPause()
        for (item in list) {
            if (item is AdView) {
                item.pause()
            }
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        for (item in list) {
            if (item is AdView) {
                item.destroy()
            }
        }
    }
}