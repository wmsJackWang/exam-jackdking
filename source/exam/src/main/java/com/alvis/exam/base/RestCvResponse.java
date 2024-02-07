package com.alvis.exam.base;

/**
 * @author alvis
 */
public class RestCvResponse<T> {
    private int code;
    private String msg;
    private T data;

    private String token;

    public RestCvResponse(int code, String message) {
        this.code = code;
        this.msg = message;
    }

    public RestCvResponse(int code, String message, T response) {
        this.code = code;
        this.msg = message;
        this.data = response;
    }

    public RestCvResponse(int code, String message, T response, String token) {
        this.code = code;
        this.msg = message;
        this.data = response;
        this.token = token;
    }

    public static RestCvResponse fail(String message){
        return new RestCvResponse<>(SystemCode.InnerError.getCode(), message);
    }

    public static RestCvResponse fail(){
        return new RestCvResponse<>(SystemCode.InnerError.getCode(), SystemCode.InnerError.getMessage());
    }

    public static RestCvResponse fail(Integer code, String msg) {
        return new RestCvResponse<>(code, msg);
    }

    public static RestCvResponse ok() {
        SystemCode systemCode = SystemCode.SUCCESS;
        return new RestCvResponse<>(systemCode.getCode(), systemCode.getMessage());
    }

    public static <F> RestCvResponse<F> ok(F response) {
        SystemCode systemCode = SystemCode.SUCCESS;
        return new RestCvResponse<>(systemCode.getCode(), systemCode.getMessage(), response);
    }
    public static <F> RestCvResponse<F> ok(F response, String token) {
        SystemCode systemCode = SystemCode.SUCCESS;
        return new RestCvResponse<>(systemCode.getCode(), systemCode.getMessage(), response, token);
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
