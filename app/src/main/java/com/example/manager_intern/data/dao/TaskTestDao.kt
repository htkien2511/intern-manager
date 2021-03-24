package com.example.manager_intern.data.dao

import com.example.manager_intern.data.model.TaskTest

class TaskTestDao {
    public fun getAll(): MutableList<TaskTest> {
        return mockData()
    }

    private fun mockData(): MutableList<TaskTest> {
        return mutableListOf(
            TaskTest("Completed Ui Shapee Clound"),
            TaskTest("Completed Ui Shapee Clound"),
            TaskTest("Completed Ui Shapee Clound"),
            TaskTest("Completed Ui Shapee Clound"),
            TaskTest("Completed Ui Shapee Clound"),
            TaskTest("Completed Ui Shapee Clound"),
            TaskTest("Completed Ui Shapee Clound"),
            TaskTest("Completed Ui Shapee Clound"),
            TaskTest("Completed Ui Shapee Clound")
        )
    }
}