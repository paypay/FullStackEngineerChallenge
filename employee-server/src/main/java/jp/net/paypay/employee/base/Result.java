package jp.net.paypay.employee.base;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
public class Result<T> {

  private int code = Result.Code.SUCCESS.getCode();

  private String message = Result.Code.SUCCESS.getMsg();

  private T data;

  private Result() {}

  public static <T> Result<T> errorResult() {
    Result<T> result = new Result<>();
    result.setCode(Result.Code.SYSTEM_ERROR.getCode());
    result.setMessage(Result.Code.SYSTEM_ERROR.getMsg());
    result.setData(null);
    return result;
  }

  public static <T> Result<T> successResult() {
    Result<T> result = new Result<>();
    result.setCode(Result.Code.SUCCESS.getCode());
    result.setMessage(Result.Code.SUCCESS.getMsg());
    result.setData(null);
    return result;
  }

  public static <T> Result<T> result(Code code) {
    Result<T> result = new Result<>();
    result.setCode(code.getCode());
    result.setMessage(code.getMsg());
    result.setData(null);
    return result;
  }

  public static <T> Result<T> result(T data) {
    Result<T> result = new Result<>();
    result.setCode(Result.Code.SUCCESS.getCode());
    result.setMessage(Result.Code.SUCCESS.getMsg());
    result.setData(data);
    return result;
  }

  public static <T> Result<T> result(Code code, T data) {
    Result<T> result = new Result<>();
    result.setMessage(code.getMsg());
    result.setCode(code.getCode());
    result.setData(data);
    return result;
  }

  @AllArgsConstructor
  @Getter
  public enum Code {
    SUCCESS(200, "success"),
    SYSTEM_ERROR(400,"system error"),
    USER_NOT_FOUND(404, "user not found");

    int code;
    String msg;
  }
}
