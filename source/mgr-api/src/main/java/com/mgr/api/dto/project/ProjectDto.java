package com.mgr.api.dto.project;

import com.mgr.api.dto.account.AccountAutoCompleteDto;
import lombok.Data;

import java.util.Date;

@Data
public class ProjectDto {
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
