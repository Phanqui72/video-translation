package com.mgr.api.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.time.LocalDateTime;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

@Data
public class ABasicAdminDto {
    @JsonSerialize(using = ToStringSerializer.class)
    @ApiModelProperty(name = "id")
    private Long id;
    @ApiModelProperty(name = "status")
    private Integer status;
    @ApiModelProperty(name = "modifiedDate")
    private LocalDateTime modifiedDate;
    @ApiModelProperty(name = "createdDate")
    private LocalDateTime createdDate;
}
