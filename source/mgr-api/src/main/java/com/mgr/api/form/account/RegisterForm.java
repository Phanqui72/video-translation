package com.mgr.api.form.account;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

@Data
public class RegisterForm {
    @NotEmpty(message = "username is required")
    @ApiModelProperty(required = true)
    private String username;

    @NotEmpty(message = "password is required")
    @ApiModelProperty(required = true)
    private String password;

    @NotEmpty(message = "fullName is required")
    @ApiModelProperty(required = true)
    private String fullName;

    @NotEmpty(message = "email is required")
    @Email(message = "invalid email")
    @ApiModelProperty(required = true)
    private String email;

    @ApiModelProperty(required = false)
    private String phone;
}
