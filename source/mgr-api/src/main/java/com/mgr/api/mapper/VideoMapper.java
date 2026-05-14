package com.mgr.api.mapper;

import com.mgr.api.dto.video.VideoDto;
import com.mgr.api.model.Video;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface VideoMapper {

    @Mapping(source = "id", target = "id")
    @Mapping(source = "project.id", target = "projectId")
    @Mapping(source = "project.title", target = "projectTitle")
    @Mapping(source = "originalFilename", target = "originalFilename")
    @Mapping(source = "storageUrl", target = "storageUrl")
    @Mapping(source = "durationSeconds", target = "durationSeconds")
    @Mapping(source = "resolution", target = "resolution")
    @Mapping(source = "fileSize", target = "fileSize")
    @Mapping(source = "fileFormat", target = "fileFormat")
    @Mapping(source = "languageSource", target = "languageSource")
    @Mapping(source = "uploadStatus", target = "uploadStatus")
    @Mapping(source = "contentType", target = "contentType")
    @Mapping(source = "createdDate", target = "createdDate")
    @Mapping(source = "modifiedDate", target = "modifiedDate")
    @Mapping(source = "status", target = "status")
    @BeanMapping(ignoreByDefault = true)
    @Named("fromVideoToDto")
    VideoDto fromVideoToDto(Video video);

    @IterableMapping(elementTargetType = VideoDto.class, qualifiedByName = "fromVideoToDto")
    @Named("fromEntityToVideoDtoList")
    List<VideoDto> fromEntityToVideoDtoList(List<Video> videos);
}
