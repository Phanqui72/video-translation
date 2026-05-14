package com.mgr.api.controller;

import com.mgr.api.constant.MgrConstant;
import com.mgr.api.dto.ApiMessageDto;
import com.mgr.api.dto.ErrorCode;
import com.mgr.api.dto.ResponseListDto;
import com.mgr.api.dto.project.ProjectDto;
import com.mgr.api.exception.BadRequestException;
import com.mgr.api.exception.NotFoundException;
import com.mgr.api.form.project.CreateProjectForm;
import com.mgr.api.form.project.UpdateProjectForm;
import com.mgr.api.mapper.ProjectMapper;
import com.mgr.api.model.Account;
import com.mgr.api.model.Project;
import com.mgr.api.model.criteria.ProjectCriteria;
import com.mgr.api.repository.AccountRepository;
import com.mgr.api.repository.ProjectRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import javax.validation.Valid;

@RestController
@RequestMapping("/v1/project")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Slf4j
public class ProjectController extends ABasicController {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private ProjectMapper projectMapper;

    @PostMapping(value = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
    @Transactional
    public ApiMessageDto<ProjectDto> create(@Valid @RequestBody CreateProjectForm form, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new BadRequestException("Invalid data", ErrorCode.BAD_REQUEST);
        }

        Long accountId = getCurrentUser();
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new NotFoundException("Account not found!", ErrorCode.ACCOUNT_ERROR_NOT_FOUND));

        Project project = projectMapper.fromCreateFormToEntity(form);
        project.setAccount(account);
        projectRepository.save(project);

        log.info("[Project] Created project '{}' for account {}", project.getTitle(), accountId);
        ProjectDto dto = projectMapper.fromProjectToDto(project);
        dto.setVideoCount(0);
        return makeSuccessResponse(dto, "Create project success.");
    }

    @PutMapping(value = "/update", produces = MediaType.APPLICATION_JSON_VALUE)
    @Transactional
    public ApiMessageDto<ProjectDto> update(@Valid @RequestBody UpdateProjectForm form, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new BadRequestException("Invalid data", ErrorCode.BAD_REQUEST);
        }

        Long accountId = getCurrentUser();
        Project project = projectRepository.findByIdAndAccountId(form.getId(), accountId)
                .orElseThrow(() -> new NotFoundException("Project not found!", ErrorCode.PROJECT_ERROR_NOT_FOUND));

        projectMapper.mappingUpdateFormToEntity(form, project);
        projectRepository.save(project);

        log.info("[Project] Updated project '{}' for account {}", project.getTitle(), accountId);
        ProjectDto dto = projectMapper.fromProjectToDto(project);
        dto.setVideoCount((int) projectRepository.countVideosByProjectId(project.getId()));
        return makeSuccessResponse(dto, "Update project success.");
    }

    @GetMapping(value = "/get/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiMessageDto<ProjectDto> get(@PathVariable("id") Long id) {
        Long accountId = getCurrentUser();
        Project project = projectRepository.findByIdAndAccountId(id, accountId)
                .orElseThrow(() -> new NotFoundException("Project not found!", ErrorCode.PROJECT_ERROR_NOT_FOUND));

        ProjectDto dto = projectMapper.fromProjectToDto(project);
        dto.setVideoCount((int) projectRepository.countVideosByProjectId(project.getId()));
        return makeSuccessResponse(dto, "Get project success.");
    }

    @GetMapping(value = "/list", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiMessageDto<ResponseListDto<List<ProjectDto>>> list(ProjectCriteria criteria, Pageable pageable) {
        Long accountId = getCurrentUser();
        criteria.setAccountId(accountId);
        criteria.setStatus(MgrConstant.STATUS_ACTIVE);

        Page<Project> page = projectRepository.findAll(criteria.getSpecification(), pageable);
        ResponseListDto<List<ProjectDto>> responseListDto = new ResponseListDto<>(
                projectMapper.fromEntityToProjectDtoList(page.getContent()),
                page.getTotalElements(),
                page.getTotalPages()
        );
        return makeSuccessResponse(responseListDto, "List project success.");
    }

    @DeleteMapping(value = "/delete/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @Transactional
    public ApiMessageDto<Void> delete(@PathVariable("id") Long id) {
        Long accountId = getCurrentUser();
        Project project = projectRepository.findByIdAndAccountId(id, accountId)
                .orElseThrow(() -> new NotFoundException("Project not found!", ErrorCode.PROJECT_ERROR_NOT_FOUND));

        // Soft delete
        project.setStatus(MgrConstant.STATUS_DELETE);
        projectRepository.save(project);

        log.info("[Project] Soft-deleted project {} for account {}", id, accountId);
        return makeSuccessResponse("Delete project success.");
    }
}
