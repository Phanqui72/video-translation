package com.mgr.api.dto.video;

import lombok.Data;

import java.util.Date;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

@Data
public class VideoDto {
    @JsonSerialize(using = ToStringSerializer.class)
    private Long id;
    @JsonSerialize(using = ToStringSerializer.class)
    private Long projectId;
    private String projectTitle;
    private String originalFilename;
    private String storageUrl;
    private Integer durationSeconds;
    private String resolution;
    private Long fileSize;
    private String fileFormat;
    private String languageSource;
    private String uploadStatus;
    private String contentType;
    private Date createdDate;
    private Date modifiedDate;
    private int status;
}
