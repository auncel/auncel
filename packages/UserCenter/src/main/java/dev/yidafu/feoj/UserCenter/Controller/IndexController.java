package dev.yidafu.feoj.UserCenter.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class IndexController {
  @RequestMapping("/")
  public String index() {
    return "API Page";
  }
}