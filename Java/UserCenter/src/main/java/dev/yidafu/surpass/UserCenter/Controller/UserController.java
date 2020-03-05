package dev.yidafu.auncel.UserCenter.Controller;

import dev.yidafu.auncel.UserCenter.dao.UsersMapper;
import dev.yidafu.auncel.UserCenter.entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {
  @Autowired
  private UsersMapper usersMapper;
  @RequestMapping("/users")
  public List<Users> index() {
    return usersMapper.selectAll();
  }
}
