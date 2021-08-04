package com.example.manager_intern.utils

import android.content.Context
import android.content.DialogInterface
import androidx.appcompat.app.AlertDialog
import androidx.fragment.app.FragmentActivity

object DialogUtils {
    private var alertDialog: AlertDialog? = null

    fun closeMessage() {
        try {
            if (alertDialog != null && alertDialog!!.isShowing) {
                alertDialog!!.cancel()
                alertDialog = null
            }
        } catch (ignore: Exception) {
        }
    }

    private fun show(activity: FragmentActivity, builder: AlertDialog.Builder) {
        if (!activity.isFinishing) {
            try {
                closeMessage()
                alertDialog = builder.create()
                alertDialog!!.show()
            } catch (ignore: Throwable) {
            }
        }
    }

    fun showMessage(
        context: Context,
        title: String = "",
        message: String = "",
        positiveText: String = "OK",
        positiveClick: DialogInterface.OnClickListener? = null,
        negativeText: String = "CANCEL",
        negativeClick: DialogInterface.OnClickListener? = null
    ) {
        val builder = AlertDialog.Builder(context)
        builder.setTitle(title)
        builder.setMessage(message)
        if (positiveText.isNotEmpty()) {
            builder.setPositiveButton(positiveText, positiveClick)
        }
        if (negativeText.isNotEmpty()) {
            builder.setNegativeButton(negativeText, negativeClick)
        }
        builder.show()
    }

    fun singleChoice(
        context: Context,
        title: String,
        values: List<String>,
        defaultSelected: Int,
        onResult: (value: String) -> Unit
    ) {
        AlertDialog.Builder(context).apply {
            setTitle(title)
            setSingleChoiceItems(values.toTypedArray(), defaultSelected) { dialog, which ->
                onResult(values[which])
                dialog.dismiss()
            }
            show()
        }
    }
}
