package com.example.manager_intern.extensions

import android.app.AlertDialog
import androidx.fragment.app.FragmentActivity
import com.example.manager_intern.R
import com.example.manager_intern.utils.AppUtils
import com.example.manager_intern.utils.DialogUtils
import com.tbruyelle.rxpermissions2.RxPermissions

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

fun FragmentActivity.requestPermission(
    permission: String,
    permissionGranted: (() -> Unit)? = null
) {
    val rxPermissions = RxPermissions(this)
    rxPermissions
        .request(permission)
        .subscribe { granted: Boolean ->
            if (granted) { // Always true pre-M
                permissionGranted?.invoke()
            } else {
                DialogUtils.showMessage(
                    context = this,
                    title = resources.getString(R.string.permission_failed_title),
                    message = resources.getString(R.string.permission_failed_message),
                    positiveText = getString(R.string.cancel),
                    negativeText = getString(R.string.ok),
                    negativeClick = { _, _ ->
                        AppUtils.goToSettings(this, 9999)
                    }
                )
            }
        }
}