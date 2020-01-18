package dev.yidafu.surpass.UserCenter.dto;

public class RegistrationLoginParam {
  private String usernameOrEmail;
  private String password;

  public void setPassword(String password) {
    this.password = password;
  }

  public void setUsernameOrEmail(String usernameOrEmail) {
    this.usernameOrEmail = usernameOrEmail;
  }

  public String getPassword() {
    return password;
  }

  public String getUsernameOrEmail() {
    return usernameOrEmail;
  }
}
