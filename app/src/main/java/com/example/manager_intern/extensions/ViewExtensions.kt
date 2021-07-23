package com.example.manager_intern.extensions

import android.view.View
import android.view.animation.Animation
import android.view.animation.RotateAnimation

fun View.animateExpand() {
    val rotate = RotateAnimation(360f, 180f, Animation.RELATIVE_TO_SELF, 0.5f, Animation.RELATIVE_TO_SELF, 0.5f)
    rotate.duration = 300
    rotate.fillAfter = true
    this.animation = rotate
}

fun View.animateCollapse() {
    val rotate = RotateAnimation(180f, 360f, Animation.RELATIVE_TO_SELF, 0.5f, Animation.RELATIVE_TO_SELF, 0.5f)
    rotate.duration = 300
    rotate.fillAfter = true
    this.animation = rotate
}