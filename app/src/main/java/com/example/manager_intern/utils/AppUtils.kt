package com.example.manager_intern.utils

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.provider.Settings
import com.example.manager_intern.BuildConfig

object AppUtils {
    fun openGooglePlay(context: Context, packageId: String) {
        try {
            val url = "market://details?id=$packageId"
            context.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(url)))
        } catch (e: Exception) {
            val url = "https://play.google.com/store/apps/details?id=$packageId"
            context.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(url)))
        }
    }

    //Goto setting
    fun goToSettings(activity: Activity, requestCode: Int) {
        val intent = Intent(
            Settings.ACTION_APPLICATION_DETAILS_SETTINGS,
            Uri.parse("package:${BuildConfig.APPLICATION_ID}")
        ).apply {
            addCategory(Intent.CATEGORY_DEFAULT)
            flags = Intent.FLAG_ACTIVITY_NEW_TASK
        }
        activity.startActivityForResult(intent, requestCode)
    }

    fun goToWirelessSettings(activity: Activity, requestCode: Int) {
        val intent = Intent(Settings.ACTION_WIRELESS_SETTINGS)
        activity.startActivityForResult(intent, requestCode)
    }
}
