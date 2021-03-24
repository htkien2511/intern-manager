package com.example.manager_intern.data.dao

import com.example.manager_intern.data.model.Attachment

class AttachmentDao {
    public fun getAll(): MutableList<Attachment> {
        return mockData()
    }

    private fun mockData(): MutableList<Attachment> {
        return mutableListOf(
            Attachment("LinkSex.jav"),
            Attachment("LinkSex.jav"),
            Attachment("LinkSex.jav"),
            Attachment("LinkSex.jav")
        )
    }
}