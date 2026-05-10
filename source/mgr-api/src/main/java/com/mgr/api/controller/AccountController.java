package com.mgr.api.controller;

import com.mgr.api.constant.MgrConstant;
import com.mgr.api.dto.ApiMessageDto;
import com.mgr.api.dto.ApiResponse;
import com.mgr.api.dto.ErrorCode;
import com.mgr.api.dto.ResponseListDto;
import com.mgr.api.dto.account.AccountDto;
import com.mgr.api.exception.BadRequestException;
import com.mgr.api.exception.NotFoundException;
import com.mgr.api.exception.UnauthorizationException;
import com.mgr.api.form.account.CreateAccountAdminForm;
import com.mgr.api.form.account.UpdateAccountAdminForm;
import com.mgr.api.form.account.UpdateProfileAdminForm;
import com.mgr.api.mapper.AccountMapper;
import com.mgr.api.model.Account;
import com.mgr.api.model.Group;
import com.mgr.api.model.criteria.AccountCriteria;
import com.mgr.api.repository.AccountRepository;
import com.mgr.api.repository.GroupRepository;
import com.mgr.api.service.MgrApiService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/v1/account")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Slf4j
public class AccountController extends ABasicController {
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private AccountMapper accountMapper;

    @Autowired
    private MgrApiService mgrApiService;

    @PostMapping(value = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ACC_C')")
    @Transactional
    public ApiMessageDto<String> createAdmin(@Valid @RequestBody CreateAccountAdminForm createAccountAdminForm, BindingResult bindingResult) {
        Account account = accountRepository.findFirstByUsername(createAccountAdminForm.getUsername()).orElse(null);
        if (!isSuperAdmin()) {
            throw new BadRequestException("Can not create admin", ErrorCode.ACCOUNT_ERROR_UNABLE_CREATE);
        }
        if (account != null) {
            throw new BadRequestException("Username is existed!", ErrorCode.ACCOUNT_ERROR_USERNAME_EXISTED);
        }
        Group group = groupRepository.findById(createAccountAdminForm.getGroupId()).orElse(null);
        if (group == null) {
            throw new NotFoundException("Group not found!", ErrorCode.GROUP_ERROR_NOT_FOUND);
        }
        account = new Account();
        account.setUsername(createAccountAdminForm.getUsername());
        account.setPassword(passwordEncoder.encode(createAccountAdminForm.getPassword()));
        account.setFullName(createAccountAdminForm.getFullName());
        account.setKind(MgrConstant.USER_KIND_ADMIN);
        account.setEmail(createAccountAdminForm.getEmail());
        account.setGroup(group);
        account.setStatus(createAccountAdminForm.getStatus());
        account.setPhone(createAccountAdminForm.getPhone());
        if (StringUtils.isNoneBlank(createAccountAdminForm.getAvatarPath())) {
            account.setAvatarPath(createAccountAdminForm.getAvatarPath());
        }
        accountRepository.save(account);

        return makeSuccessResponse("Create an account admin success.");
    }

    @PutMapping(value = "/update", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ACC_U')")
    public ApiMessageDto<String> updateAdmin(@Valid @RequestBody UpdateAccountAdminForm updateAccountAdminForm, BindingResult bindingResult) {
        if (!isSuperAdmin()) {
            throw new BadRequestException("Can not update admin", ErrorCode.ACCOUNT_ERROR_UNABLE_UPDATE);
        }
        Account account = accountRepository.findById(updateAccountAdminForm.getId()).orElse(null);
        if (account == null) {
            throw new NotFoundException("Account not found!", ErrorCode.ACCOUNT_ERROR_NOT_FOUND);
        }
        Group group = groupRepository.findById(updateAccountAdminForm.getGroupId()).orElse(null);
        if (group == null) {
            throw new NotFoundException("Group not found!", ErrorCode.GROUP_ERROR_NOT_FOUND);
        }
        if (StringUtils.isNoneBlank(updateAccountAdminForm.getPassword())) {
            account.setPassword(passwordEncoder.encode(updateAccountAdminForm.getPassword()));
        }
        account.setFullName(updateAccountAdminForm.getFullName());
        if (StringUtils.isNoneBlank(updateAccountAdminForm.getAvatarPath())) {
            if (account.getAvatarPath() != null && !updateAccountAdminForm.getAvatarPath().equals(account.getAvatarPath())) {
                //delete old image
                mgrApiService.deleteFile(account.getAvatarPath());
            }
            account.setAvatarPath(updateAccountAdminForm.getAvatarPath());
        }
        account.setGroup(group);
        account.setStatus(updateAccountAdminForm.getStatus());
        account.setEmail(updateAccountAdminForm.getEmail());
        account.setPhone(updateAccountAdminForm.getPhone());
        accountRepository.save(account);

        return makeSuccessResponse("Update account admin success.");
    }

    @GetMapping(value = "/get/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ACC_V')")
    public ApiMessageDto<AccountDto> getAccount(@PathVariable("id") Long id) {
        Account account = accountRepository.findById(id).orElse(null);
        if (account == null) {
            throw new NotFoundException("Account not found!", ErrorCode.ACCOUNT_ERROR_NOT_FOUND);
        }
        return makeSuccessResponse(accountMapper.fromAccountToDto(account), "Get account success.");
    }

    @GetMapping(value = "/profile", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiMessageDto<AccountDto> profile() {
        long id = getCurrentUser();
        Account account = accountRepository.findById(id).orElse(null);
        if (account == null) {
            throw new NotFoundException("Account not found!", ErrorCode.ACCOUNT_ERROR_NOT_FOUND);
        }
        return makeSuccessResponse(accountMapper.fromAccountToDto(account), "Get Account success");
    }

    @PutMapping(value = "/update-profile", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiMessageDto<String> updateProfile(@Valid @RequestBody UpdateProfileAdminForm updateProfileAdminForm, BindingResult bindingResult) {
        long id = getCurrentUser();
        var account = accountRepository.findById(id).orElse(null);
        if (account == null) {
            throw new NotFoundException("Account not found!", ErrorCode.ACCOUNT_ERROR_NOT_FOUND);
        }
        if (!passwordEncoder.matches(updateProfileAdminForm.getOldPassword(), account.getPassword())) {
            throw new BadRequestException("Old password is wrong!", ErrorCode.ACCOUNT_ERROR_WRONG_PASSWORD);
        }

        if (StringUtils.isNoneBlank(updateProfileAdminForm.getPassword())) {
            account.setPassword(passwordEncoder.encode(updateProfileAdminForm.getPassword()));
        }
        account.setPhone(updateProfileAdminForm.getPhone());
        account.setFullName(updateProfileAdminForm.getFullName());
        account.setAvatarPath(updateProfileAdminForm.getAvatarPath());
        accountRepository.save(account);

        return makeSuccessResponse("Update admin account success");
    }

    @GetMapping(value = "/list", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ACC_L')")
    public ApiMessageDto<ResponseListDto<AccountDto>> listAccount(AccountCriteria accountCriteria, Pageable pageable) {
        if (!isSuperAdmin()) {
            throw new UnauthorizationException("Not allowed to list account.");
        }
        Page<Account> page = accountRepository.findAll(accountCriteria.getSpecification(), pageable);
        ResponseListDto<AccountDto> responseListDto = new ResponseListDto(accountMapper.fromEntityToAccountDtoList(page.getContent()), page.getTotalElements(), page.getTotalPages());
        return makeSuccessResponse(responseListDto, "List account success.");
    }

    @GetMapping(value = "/auto-complete", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiMessageDto<ResponseListDto<AccountDto>> autoComplete(AccountCriteria accountCriteria, Pageable pageable) {
        accountCriteria.setStatus(MgrConstant.STATUS_ACTIVE);
        pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(),
                Sort.by(Sort.Order.desc("createdDate")));
        Page<Account> page = accountRepository.findAll(accountCriteria.getSpecification(), pageable);
        ResponseListDto<AccountDto> responseListDto = new ResponseListDto(accountMapper.convertAccountToAutoCompleteDto(page.getContent()), page.getTotalElements(), page.getTotalPages());
        return makeSuccessResponse(responseListDto, "List account success.");
    }

    @Transactional
    @DeleteMapping(value = "/delete/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ACC_D')")
    public ApiMessageDto<Void> delete(@PathVariable("id") Long id) {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("[Account] Account not found!", ErrorCode.ACCOUNT_ERROR_NOT_FOUND));
        if (account.getIsSuperAdmin()) {
            throw new BadRequestException("[Account] Account super admin cannot delete", ErrorCode.ACCOUNT_ERROR_UNABLE_DELETE);
        }
        // delete avatar file
        String avatarPath = account.getAvatarPath();
        if (StringUtils.isNoneBlank(avatarPath)) {
            mgrApiService.deleteFile(account.getAvatarPath());
        }
        accountRepository.deleteById(id);
        return makeSuccessResponse("Delete Account success");
    }
}
