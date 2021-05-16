package com.example.manager_intern.data.model

enum class Shift(val des: String, val value: Int) {
    MORNING("Morning", 1),
    AFTERNOON("Afternoon", 2),
    LEAVE("Leave", 0),
    FULL("Full", 3)
}