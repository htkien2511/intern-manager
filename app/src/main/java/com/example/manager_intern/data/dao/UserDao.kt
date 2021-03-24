package com.example.manager_intern.data.dao

import com.example.manager_intern.R
import com.example.manager_intern.data.model.User

class UserDao {
    public fun getAll(): MutableList<User> {
        return mockData()
    }

    private fun mockData(): MutableList<User> {
        return mutableListOf(
            User(R.drawable.clock_blue),
            User(R.drawable.clock_pink),
            User(R.drawable.clock_yello)
        )
    }
}