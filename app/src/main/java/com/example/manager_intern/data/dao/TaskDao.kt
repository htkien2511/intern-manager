package com.example.manager_intern.data.dao

import com.example.manager_intern.data.model.Task
import java.time.LocalDateTime
import java.util.*

class TaskDao {
    public fun getAll(): MutableList<Task> {
        return mockData()
    }

    private fun mockData(): MutableList<Task> {
        return mutableListOf(
            Task("Training Android", Calendar.getInstance().time, "Training android of fox code studio"),
            Task("Training IOS", Calendar.getInstance().time, "Training android of fox code studio"),
            Task("Final Project", Calendar.getInstance().time, "Training android of fox code studio"),
            Task("Training IOS", Calendar.getInstance().time, "Training android of fox code studio"),
            Task("Training IOS", Calendar.getInstance().time, "Training android of fox code studio"),
            Task("Training IOS", Calendar.getInstance().time, "Training android of fox code studio"),
            Task("Training IOS", Calendar.getInstance().time, "Training android of fox code studio"),
            Task("Training IOS", Calendar.getInstance().time, "Training android of fox code studio"),
            Task("Training IOS", Calendar.getInstance().time, "Training android of fox code studio"),
            Task("Training IOS", Calendar.getInstance().time, "Training android of fox code studio"),
            Task("Training IOS", Calendar.getInstance().time, "Training android of fox code studio"),
            Task("Training IOS", Calendar.getInstance().time, "Training android of fox code studio"),
            Task("Training Android", Calendar.getInstance().time, "Training android of fox code studio"),
            Task("Training IOS", Calendar.getInstance().time, "Training android of fox code studio"),
            Task("Final Project", Calendar.getInstance().time, "Training android of fox code studio"),
            Task("Training IOS", Calendar.getInstance().time, "Training android of fox code studio"),
            Task("Training IOS", Calendar.getInstance().time, "Training android of fox code studio"),
            Task("Training IOS", Calendar.getInstance().time, "Training android of fox code studio"),
            Task("Training IOS", Calendar.getInstance().time, "Training android of fox code studio"),
            Task("Training IOS", Calendar.getInstance().time, "Training android of fox code studio"),
            Task("Training IOS", Calendar.getInstance().time, "Training android of fox code studio"),
            Task("Training IOS", Calendar.getInstance().time, "Training android of fox code studio"),
            Task("Training IOS", Calendar.getInstance().time, "Training android of fox code studio"),
            Task("Training IOS", Calendar.getInstance().time, "Training android of fox code studio")
        )
    }
}