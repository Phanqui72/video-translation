package com.mgr.api.form.account;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class ResetPasswordForm {
    @NotEmpty(message = "token is required")
    @ApiModelProperty(required = true)
    private String token;

    @NotEmpty(message = "newPassword is required")
    @ApiModelProperty(required = true)
    private String newPassword;
}
