package com.mgr.api.form.video;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class UploadVideoForm {
    @NotNull(message = "Project ID is required")
    private Long projectId;

    private String languageSource = "zh";
}
