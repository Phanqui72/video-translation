package com.mgr.api.dto.project;

import com.mgr.api.dto.account.AccountAutoCompleteDto;
import lombok.Data;

import java.util.Date;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

@Data
public class ProjectDto {
    @JsonSerialize(using = ToStringSerializer.class)
    private Long id;
    private String title;
    private String description;
    private String thumbnailUrl;
    private String projectStatus;
    private String visibility;
    private AccountAutoCompleteDto account;
    private Integer videoCount;
    private Date createdDate;
    private Date modifiedDate;
    private int status;
}
