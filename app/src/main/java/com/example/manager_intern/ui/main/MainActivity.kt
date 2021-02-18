package com.example.manager_intern.ui.main

import androidx.fragment.app.Fragment
import com.example.manager_intern.R
import com.example.manager_intern.base.BaseActivity
import com.example.manager_intern.databinding.MainActBinding
import com.example.manager_intern.ui.main.home.HomeFragment

class MainActivity : BaseActivity() {
    override val binding by viewBinding(MainActBinding::inflate)

    override fun initView() {
        setStatusBarColor(R.color.white)
        loadFragment(HomeFragment())
    }

    override fun initListener() {
        binding.bottomNav.setOnNavigationItemSelectedListener {
            when (it.itemId) {
                R.id.bottomNavHome -> {
                    loadFragment(HomeFragment())
                    true
                }
                R.id.bottomNavScheduler -> {
                    loadFragment(HomeFragment())
                    true
                }
                R.id.bottomNavMessage -> {
                    loadFragment(HomeFragment())
                    true
                }
                else -> false
            }
        }
    }

    private fun loadFragment(fragment: Fragment) {
        supportFragmentManager
            .beginTransaction()
            .replace(R.id.fragmentContainer, fragment)
            .addToBackStack(null)
            .commit()
    }
}