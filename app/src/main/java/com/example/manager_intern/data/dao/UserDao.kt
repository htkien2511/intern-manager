package com.example.manager_intern.data.dao

import com.example.manager_intern.data.remote.responsive.UserResponsive

class UserDao {
    public fun getAll(): MutableList<UserResponsive> {
        return mockData()
    }

    private fun mockData(): MutableList<UserResponsive> {
        return mutableListOf(

        )
    }
}