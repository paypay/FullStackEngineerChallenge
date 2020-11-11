package jp.net.paypay.employee.controller;

import jp.net.paypay.employee.base.Result;
import jp.net.paypay.employee.entity.User;
import jp.net.paypay.employee.util.IDUtil;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

import java.util.Collections;

@RequestMapping("/users")
@RestController
@ApiIgnore("mock user api")
@Slf4j
public class UserController {

  @PostMapping("/login")
  public Result<AuthInfo> login(@RequestBody LoginRequest loginRequest) {
    log.info("login username:{} , password:{}", loginRequest.getUsername(), loginRequest.getPassword());
    return Result.result(AuthInfo.builder().accessToken(IDUtil.getAccessToken()).build());
  }

  @PostMapping("/info")
  public Result<UserInfoResponse> userInfo() {
    User user = new User();
    user.setUsername("admin");
    user.setName("xiaomo");
    user.setAvatar("https://image.xiaomo.info/logo/avatar.png");
    user.setId(IDUtil.getId());
    user.setIntroduction("xiaomo");
    user.setRoles(Collections.singletonList("admin"));
    return Result.result(new UserInfoResponse(user));
  }

  @PostMapping("/logout")
  public Result<Boolean> logout() {
    return Result.result(true);
  }

  @Data
  @Builder
  public static class AuthInfo {
    private String accessToken;
  }

  @Data
  public static class LoginRequest {
    private String username;
    private String password;
  }

  @Data
  @AllArgsConstructor
  public static class UserInfoResponse {
    private User user;
  }
}
