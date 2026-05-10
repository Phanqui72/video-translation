package com.mgr.api.form.account;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class ForgetPasswordForm {
    @NotEmpty(message = "email is required")
    @ApiModelProperty(required = true)
    private String email;
}
