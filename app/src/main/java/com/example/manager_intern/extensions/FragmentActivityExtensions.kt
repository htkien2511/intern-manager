package com.example.manager_intern.extensions

import android.app.AlertDialog
import androidx.fragment.app.FragmentActivity
import com.example.manager_intern.R
import java.lang.Exception

private var alertDialog: AlertDialog? = null

fun FragmentActivity.showProgress() {
    if (!isFinishing) {
        closeProgress()
        val view = layoutInflater.inflate(R.layout.progress_bar, null, false)
        val builder = AlertDialog
            .Builder(this, R.style.AppCompat_Progress)
            .setCancelable(false)
            .setView(view)

        alertDialog = builder.create()
        alertDialog!!.show()
    }
}

fun FragmentActivity.closeProgress() {
    try {
        if (alertDialog != null && alertDialog!!.isShowing) {
            alertDialog!!.cancel()
            alertDialog = null
        }
    } catch (e: Exception) {
        e.printStackTrace()
    }
}