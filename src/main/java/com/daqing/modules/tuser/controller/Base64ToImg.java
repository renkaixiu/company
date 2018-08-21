/*
package com.daqing.modules.tuser.controller;

*/
/**
 * Created by dongao on 2018/7/24.
 *//*

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;


*/
/**
 * 项目名称：测试项目
 * 类  名  称：Base64ToImg
 * 类  描  述：Base 64编码转换成图片
 * 创  建  人：Frist
 * 创建时间：2016年9月21日 下午5:23:19
 * 修  改  人：Frist
 * 修改时间：2016年9月21日 下午5:23:19
 * 修改备注：
 *
 * @version 1.0
 *//*


public class Base64ToImg {

    public static void main(String[] args) {
       */
/* String img = getImg("\\\\http://my.zhaopin.com/pic/2013/7/29/5935CF5D3B9349CAA95B66FD189FC5BA.jpg");//存放编码
        GenerateImg(img, "E://1.jpg");*//*

        System.out.println(getImg("D://1.jpg"));

    }

    //将图片文件转化为字节数组字符串，并对其进行Base64编码处理
    public static String getImg(String imgPath) {
        byte[] bytes = null;

        try {

            InputStream inputStream = new FileInputStream(imgPath);//将图片转换成字节数组
            bytes = new byte[inputStream.available()];
            inputStream.read(bytes);
            inputStream.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
        BASE64Encoder encoder = new BASE64Encoder();
        return encoder.encode(bytes);
    }

    //对字节数组Base64编码
    public static boolean GenerateImg(String str, String imgPath) {//生成图片
        boolean flag = true;
        BASE64Decoder decoder = new BASE64Decoder();
        try {
            if (str != null) {
                byte[] b = decoder.decodeBuffer(str);
                for (int i = 0; i < b.length; i++) {
                    if (b[i] < 0) {
                        b[i] += 256;
                    }
                }
                OutputStream out = new FileOutputStream(imgPath);
                out.write(b);
                out.flush();
                out.close();
                flag = true;
            } else {
                System.out.println("Base64编码不能为null");
                flag = false;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return flag;
    }
}

*/
