package com.example.manager_intern.ui.main.user

import android.content.Intent
import android.view.MenuInflater
import android.view.View
import android.widget.PopupMenu
import com.example.manager_intern.R
import com.example.manager_intern.base.BaseFragment
import com.example.manager_intern.base.BaseViewModel
import com.example.manager_intern.base.viewBinding
import com.example.manager_intern.databinding.ProfileFragBinding
import com.example.manager_intern.ui.edit_profile.EditProfileActivity
import com.example.manager_intern.ui.login.LoginActivity
import com.example.manager_intern.utils.Pref


class UserFragment : BaseFragment<UserViewModel>(R.layout.profile_frag) {

    private val binding by viewBinding(ProfileFragBinding::bind)

    override var viewModelFactory: Class<UserViewModel> = UserViewModel::class.java

    override fun initView() {

    }

    override fun initListener() {
        BaseViewModel.userResponsive.observe(this) {
            if (it != null) {
                binding.username.text = it.userData.name
                binding.department.text = it.userData.department
                binding.tvGender.text = it.userData.gender
                binding.tvEmail.text = it.userData.email
                binding.tvAddress.text = it.userData.address
            }
        }

        binding.imgSetting.setOnClickListener {
            showPopup(it)
        }

//        binding.btnLogout.setOnClickListener {
//            Pref.isLogin = false
//            BaseViewModel.userResponsive.value = null
//            startActivity(Intent(requireActivity(), LoginActivity::class.java))
//        }
//
//        binding.edit.setOnClickListener {  }
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
}