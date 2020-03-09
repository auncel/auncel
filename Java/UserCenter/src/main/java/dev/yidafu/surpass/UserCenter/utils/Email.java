package dev.yidafu.auncel.UserCenter.utils;

import java.util.regex.Pattern;


public class Email {
  public static boolean isEmail(String str) {
    if (str == null || str.length() == 0) {
      return false;
    }
    String emailPattern = "^[A-Za-z\\d]+([-_.][A-Za-z\\d]+)*@([A-Za-z\\d]+[-.])+[A-Za-z\\d]{2,4}$";
    return Pattern.matches(emailPattern, str);
  }
}
