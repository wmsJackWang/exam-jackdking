package com.alvis.exam.viewmodel.resume;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class UserRequestVO {

    @NotBlank
    private String username;

    @NotBlank
    private String password;

    @NotBlank
    private String token;
}
