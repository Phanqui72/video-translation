package com.mgr.api.controller;

import com.mgr.api.constant.MgrConstant;
import com.mgr.api.dto.ApiMessageDto;
import com.mgr.api.dto.ErrorCode;
import com.mgr.api.exception.BadRequestException;
import com.mgr.api.exception.NotFoundException;
import com.mgr.api.form.account.ForgetPasswordForm;
import com.mgr.api.form.account.RegisterForm;
import com.mgr.api.form.account.ResetPasswordForm;
import com.mgr.api.model.Account;
import com.mgr.api.model.Group;
import com.mgr.api.repository.AccountRepository;
import com.mgr.api.repository.GroupRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;

@RestController
@RequestMapping("/v1/landing")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Slf4j
public class LandingController extends ABasicController {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @PostMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
    @Transactional
    public ApiMessageDto<String> register(@Valid @RequestBody RegisterForm registerForm, BindingResult bindingResult) {
        Account account = accountRepository.findFirstByUsername(registerForm.getUsername()).orElse(null);
        if (account != null) {
            throw new BadRequestException("Username is existed!", ErrorCode.ACCOUNT_ERROR_USERNAME_EXISTED);
        }
        
        account = accountRepository.findFirstByEmail(registerForm.getEmail()).orElse(null);
        if (account != null) {
            throw new BadRequestException("Email is existed!", ErrorCode.ACCOUNT_ERROR_EMAIL_EXISTED);
        }

        // Find default group for users
        Group group = groupRepository.findFirstByKind(MgrConstant.USER_KIND_USER).orElse(null);
        if (group == null) {
            throw new BadRequestException("Default user group not found!", ErrorCode.GROUP_ERROR_NOT_FOUND);
        }

        account = new Account();
        account.setUsername(registerForm.getUsername());
        account.setPassword(passwordEncoder.encode(registerForm.getPassword()));
        account.setFullName(registerForm.getFullName());
        account.setEmail(registerForm.getEmail());
        account.setPhone(registerForm.getPhone());
        account.setKind(MgrConstant.USER_KIND_USER);
        account.setGroup(group);
        account.setStatus(MgrConstant.STATUS_ACTIVE); // Auto-active for now
        account.setIsSuperAdmin(false);
        
        accountRepository.save(account);
        return makeSuccessResponse("Đăng ký tài khoản thành công.");
    }

    @PostMapping(value = "/request-forget-password", produces = MediaType.APPLICATION_JSON_VALUE)
    @Transactional
    public ApiMessageDto<String> requestForgetPassword(@Valid @RequestBody ForgetPasswordForm forgetPasswordForm, BindingResult bindingResult) {
        Account account = accountRepository.findFirstByEmail(forgetPasswordForm.getEmail()).orElse(null);
        if (account == null) {
            throw new NotFoundException("Email không tồn tại trong hệ thống!", ErrorCode.ACCOUNT_ERROR_NOT_FOUND);
        }

        String otp = RandomStringUtils.randomNumeric(6);
        account.setResetPwdCode(otp);
        account.setResetPwdTime(new Date());
        account.setAttemptCode(0);
        accountRepository.save(account);

        return makeSuccessResponse("Mã xác nhận (OTP) của bạn là: " + otp);
    }

    @PostMapping(value = "/forget-password", produces = MediaType.APPLICATION_JSON_VALUE)
    @Transactional
    public ApiMessageDto<String> forgetPassword(@Valid @RequestBody ResetPasswordForm resetPasswordForm, BindingResult bindingResult) {
        // This is a simplified reset logic
        // In real world, we would search by token/otp
        Account account = accountRepository.findFirstByResetPwdCode(resetPasswordForm.getToken()).orElse(null);
        
        if (account == null) {
            throw new BadRequestException("Mã xác nhận không hợp lệ!", ErrorCode.ACCOUNT_ERROR_WRONG_OTP);
        }

        // Check expiry (e.g., 15 minutes)
        long diff = new Date().getTime() - account.getResetPwdTime().getTime();
        if (diff > 15 * 60 * 1000) {
            throw new BadRequestException("Mã xác nhận đã hết hạn!", ErrorCode.ACCOUNT_ERROR_OTP_EXPIRED);
        }

        account.setPassword(passwordEncoder.encode(resetPasswordForm.getNewPassword()));
        account.setResetPwdCode(null);
        account.setResetPwdTime(null);
        accountRepository.save(account);

        return makeSuccessResponse("Đổi mật khẩu thành công.");
    }
}
