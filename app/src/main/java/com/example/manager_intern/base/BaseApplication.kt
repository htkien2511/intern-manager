package com.example.manager_intern.base

import android.app.Application
import com.cloudinary.android.MediaManager
import com.cloudinary.utils.ObjectUtils

class BaseApplication : Application() {
    override fun onCreate() {
        super.onCreate()

        val config = ObjectUtils.asMap(
            "cloud_name", "i-h-c-b-ch-khoa-n-ng",
            "api_key", "198819525256265",
            "api_secret", "3dec2e3El3YNJpTSGmvVykoeGrQ"
        )

        MediaManager.init(this, config);
    }
}