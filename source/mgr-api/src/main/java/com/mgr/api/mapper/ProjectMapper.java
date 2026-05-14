package com.mgr.api.mapper;

import com.mgr.api.dto.project.ProjectDto;
import com.mgr.api.form.project.CreateProjectForm;
import com.mgr.api.form.project.UpdateProjectForm;
import com.mgr.api.model.Project;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        uses = {AccountMapper.class})
public interface ProjectMapper {

    @Mapping(source = "id", target = "id")
    @Mapping(source = "title", target = "title")
    @Mapping(source = "description", target = "description")
    @Mapping(source = "thumbnailUrl", target = "thumbnailUrl")
    @Mapping(source = "projectStatus", target = "projectStatus")
    @Mapping(source = "visibility", target = "visibility")
    @Mapping(source = "account", target = "account", qualifiedByName = "fromAccountToAutoCompleteDto")
    @Mapping(source = "createdDate", target = "createdDate")
    @Mapping(source = "modifiedDate", target = "modifiedDate")
    @Mapping(source = "status", target = "status")
    @BeanMapping(ignoreByDefault = true)
    @Named("fromProjectToDto")
    ProjectDto fromProjectToDto(Project project);

    @IterableMapping(elementTargetType = ProjectDto.class, qualifiedByName = "fromProjectToDto")
    @Named("fromEntityToProjectDtoList")
    List<ProjectDto> fromEntityToProjectDtoList(List<Project> projects);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "account", ignore = true)
    @Mapping(target = "videos", ignore = true)
    @Mapping(target = "projectStatus", constant = "draft")
    Project fromCreateFormToEntity(CreateProjectForm form);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "account", ignore = true)
    @Mapping(target = "videos", ignore = true)
    void mappingUpdateFormToEntity(UpdateProjectForm form, @MappingTarget Project project);
}
