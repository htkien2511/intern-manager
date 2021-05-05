package com.example.manager_intern.ui.main.schedule

import androidx.annotation.NonNull
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentManager
import androidx.fragment.app.FragmentPagerAdapter
import com.example.manager_intern.base.BaseFragment

class SchedulePagerAdapter(@NonNull manager: FragmentManager, private val fragments: List<Fragment>) : FragmentPagerAdapter(manager, BEHAVIOR_RESUME_ONLY_CURRENT_FRAGMENT) {

    companion object {
        const val TASK_TITLE = "Task in day"
        const val SHIFT_TITLE = "Shift work"
    }

    override fun getCount(): Int = fragments.size

    override fun getItem(position: Int): Fragment = fragments[position]

    override fun getPageTitle(position: Int): CharSequence {
        return if (position == 0) {
            TASK_TITLE
        } else {
            SHIFT_TITLE
        }
    }
}