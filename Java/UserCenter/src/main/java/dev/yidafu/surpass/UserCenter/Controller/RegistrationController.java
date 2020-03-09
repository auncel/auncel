package dev.yidafu.auncel.UserCenter.Controller;

import dev.yidafu.auncel.UserCenter.dao.UsersMapper;
import dev.yidafu.auncel.UserCenter.dto.RegistrationLoginParam;
import dev.yidafu.auncel.UserCenter.entity.Users;
import dev.yidafu.auncel.UserCenter.utils.Email;
import dev.yidafu.auncel.UserCenter.utils.Encryption;
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
