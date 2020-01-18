package dev.yidafu.surpass.UserCenter.Controller;

import dev.yidafu.surpass.UserCenter.dao.UsersMapper;
import dev.yidafu.surpass.UserCenter.dto.RegistrationLoginParam;
import dev.yidafu.surpass.UserCenter.entity.Users;
import dev.yidafu.surpass.UserCenter.utils.Email;
import dev.yidafu.surpass.UserCenter.utils.Encryption;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RegistrationController {

  @Autowired
  private UsersMapper usersMapper;
  
  @RequestMapping("/login")
  public boolean login(@RequestBody RegistrationLoginParam loginParam) {
    String usernameOrEmail = loginParam.getUsernameOrEmail();
    String password = loginParam.getPassword();

    Users user;
    if (Email.isEmail(usernameOrEmail)) {
      user = usersMapper.getPwdByEmail(usernameOrEmail);
    } else {
      user = usersMapper.getPwdByUsername(usernameOrEmail);
    }
    if (user != null) {
      return new Encryption().verify(user.getPassword(), password);
    } else {
      return false;
    }
  }
}
