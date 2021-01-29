package com.alvis.exam.viewmodel.common.user;

import javax.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class UserLoginVM {

    @NotBlank
    private String loginToken;
    
}
