package dev.yidafu.surpass.UserCenter.utils;

import java.security.MessageDigest;

/**
 * @link https://blog.csdn.net/qq_41646484/article/details/98455549
 */
public class Encryption {
  /**
   * 盐值
   */
  String salt = "123456";
  /***
   * MD5加码 生成32位md5码
   */
  public String string2MD5(String inStr) {
    MessageDigest md5 = null;
    try {
      md5 = MessageDigest.getInstance("MD5");
    } catch (Exception e) {
      System.out.println(e.toString());
      e.printStackTrace();
      return "";
    }

    // 加盐
     inStr += salt;
    
    char[] charArray = inStr.toCharArray();
    byte[] byteArray = new byte[charArray.length];

    for (int i = 0; i < charArray.length; i++) {
      byteArray[i] = (byte) charArray[i];
    }
    byte[] md5Bytes = md5.digest(byteArray);
    StringBuffer hexValue = new StringBuffer();
    for (int i = 0; i < md5Bytes.length; i++) {
      int val = ((int) md5Bytes[i]) & 0xff;
      if (val < 16){
        hexValue.append("0");
      }
      hexValue.append(Integer.toHexString(val));
    }
    return hexValue.toString();
  }
  
  public boolean verify(String passwordDb, String passwordUser) {
    return passwordDb.equals(passwordUser);
  }
}
