package com.mgr.api.dto.account;

import lombok.Data;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

@Data
public class AccountAutoCompleteDto {
    @JsonSerialize(using = ToStringSerializer.class)
    private Long id;
    private String fullName;
    private String avatarPath;
}
