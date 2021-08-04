package com.example.manager_intern.ui.main.user

import android.Manifest
import android.app.Activity
import android.content.Intent
import android.provider.MediaStore
import android.util.Log
import android.view.MenuInflater
import android.view.View
import android.widget.PopupMenu
import com.bumptech.glide.Glide
import com.cloudinary.android.MediaManager
import com.cloudinary.android.callback.ErrorInfo
import com.cloudinary.android.callback.UploadCallback
import com.example.manager_intern.R
import com.example.manager_intern.base.BaseFragment
import com.example.manager_intern.base.BaseViewModel
import com.example.manager_intern.base.viewBinding
import com.example.manager_intern.databinding.ProfileFragBinding
import com.example.manager_intern.extensions.requestPermission
import com.example.manager_intern.ui.edit_profile.EditProfileActivity
import com.example.manager_intern.ui.login.LoginActivity
import com.example.manager_intern.utils.Pref

class UserFragment : BaseFragment<UserViewModel>(R.layout.profile_frag) {

    private val binding by viewBinding(ProfileFragBinding::bind)

    override var viewModelFactory: Class<UserViewModel> = UserViewModel::class.java

    override fun initView() {
        viewModel?.getProfile(Pref.token, Pref.userId)
    }

    override fun initListener() {
        viewModel?.userResponsive?.observe(this) {
            if (it != null) {
                binding.username.text = it.name
                binding.department.text = it.department
                binding.tvGender.text = it.gender
                binding.tvEmail.text = it.email
                binding.tvAddress.text = it.address

                val url = it.avatar.substring(1, it.avatar.length - 1)
                Pref.avatar = url
                Glide.with(this).load(url).circleCrop().into(binding.imgAvatar)
            }
        }

        binding.imgSetting.setOnClickListener {
            showPopup(it)
        }
    }

    private fun showPopup(view: View) {
        val popup = PopupMenu(context, view)
        val inflater: MenuInflater = popup.menuInflater
        inflater.inflate(R.menu.option_menu, popup.menu)

        popup.setOnMenuItemClickListener {
            when (it.itemId) {
                R.id.itemEdit -> {
                    startActivity(Intent(requireContext(), EditProfileActivity::class.java))
                }

                R.id.itemChange -> {
                    startActivity(Intent(requireContext(), ChangePasswordAct::class.java))
                }

                R.id.itemAvatar -> {
                    activity?.requestPermission(
                        Manifest.permission.READ_EXTERNAL_STORAGE,
                        permissionGranted = {
                            dispatchGalleryPhotoIntent()
                        })
                }

                else -> {
                    Pref.isLogin = false
                    BaseViewModel.userResponsive.value = null
                    startActivity(Intent(requireActivity(), LoginActivity::class.java))
                }
            }

            return@setOnMenuItemClickListener true
        }

        popup.show()
    }

    fun dispatchGalleryPhotoIntent() {
        val pickPhoto = Intent(
            Intent.ACTION_PICK,
            MediaStore.Images.Media.EXTERNAL_CONTENT_URI
        )
        pickPhoto.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
        startActivityForResult(pickPhoto, 1)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        if (requestCode == 1 && resultCode == Activity.RESULT_OK && data != null) {
            data.data?.let {
                Glide.with(this).load(it).circleCrop().into(binding.imgAvatar)

                MediaManager.get().upload(it).unsigned("manager").callback(object : UploadCallback {
                    override fun onStart(requestId: String?) {
                        showLoading()
                    }

                    override fun onProgress(requestId: String?, bytes: Long, totalBytes: Long) {

                    }

                    override fun onSuccess(
                        requestId: String?,
                        resultData: MutableMap<Any?, Any?>?
                    ) {
                        val url = resultData?.get("url")
                        Pref.avatar = url as String
                        viewModel?.changeAvatar(Pref.token, Pref.userId, url as String)
                    }

                    override fun onError(requestId: String?, error: ErrorInfo?) {

                    }

                    override fun onReschedule(requestId: String?, error: ErrorInfo?) {

                    }

                }).dispatch()

                Log.d("___TAG", "onActivityResult: $id")


            }
        }
    }
}