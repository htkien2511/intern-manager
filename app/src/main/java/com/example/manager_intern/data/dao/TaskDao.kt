package com.example.manager_intern.data.dao

import com.example.manager_intern.data.model.Task
import java.util.*

class TaskDao {
    public fun getAll(): MutableList<Task> {
        return mockData()
    }

    private fun mockData(): MutableList<Task> {
        return mutableListOf(
            Task("Training Android", Date(), "Training android of fox code studio"),
            Task("Training IOS", Date(), "Training android of fox code studio"),
            Task("Final Project", Date(), "Training android of fox code studio"),
            Task("Training IOS", Date(), "Training android of fox code studio"),
            Task("Training IOS", Date(), "Training android of fox code studio"),
            Task("Training IOS", Date(), "Training android of fox code studio"),
            Task("Training IOS", Date(), "Training android of fox code studio"),
            Task("Training IOS", Date(), "Training android of fox code studio"),
            Task("Training IOS", Date(), "Training android of fox code studio"),
            Task("Training IOS", Date(), "Training android of fox code studio"),
            Task("Training IOS", Date(), "Training android of fox code studio"),
            Task("Training IOS", Date(), "Training android of fox code studio"),
            Task("Training Android", Date(), "Training android of fox code studio"),
            Task("Training IOS", Date(), "Training android of fox code studio"),
            Task("Final Project", Date(), "Training android of fox code studio"),
            Task("Training IOS", Date(), "Training android of fox code studio"),
            Task("Training IOS", Date(), "Training android of fox code studio"),
            Task("Training IOS", Date(), "Training android of fox code studio"),
            Task("Training IOS", Date(), "Training android of fox code studio"),
            Task("Training IOS", Date(), "Training android of fox code studio"),
            Task("Training IOS", Date(), "Training android of fox code studio"),
            Task("Training IOS", Date(), "Training android of fox code studio"),
            Task("Training IOS", Date(), "Training android of fox code studio"),
            Task("Training IOS", Date(), "Training android of fox code studio")
        )
    }
}