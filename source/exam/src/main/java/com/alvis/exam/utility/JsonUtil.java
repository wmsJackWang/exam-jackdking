package com.alvis.exam.utility;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.alibaba.fastjson.JSON;
import com.alvis.exam.domain.Message;

public class JsonUtil {
    private static final Logger logger = LoggerFactory.getLogger(JsonUtil.class);

    public static void main(String[] args) {
    	Message msg = new Message();
    	msg.setContent("hello");
    	msg.setCreateTime(new Date());
    	System.out.println(toJsonStr(msg));
	}
    
    public static <T> String toJsonStr(T o) {
        return JSON.toJSONString(o);
    }

    public static <T> T toJsonObject(String json, Class<T> valueType) {
        return JSON.parseObject(json, valueType);
    }


    public static <T> List<T> toJsonListObject(String json, Class<T> valueType) {

        return JSON.parseArray(json, valueType);
    }

    public static <T> T toJsonObject(InputStream stream, Class<T> valueType) {
        return JSON.parseObject(ConvertStream2Json(stream), valueType);
    }
    
    private static String ConvertStream2Json(InputStream inputStream)
    {
        String jsonStr = "";
        // ByteArrayOutputStream相当于内存输出流
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        byte[] buffer = new byte[1024];
        int len = 0;
        // 将输入流转移到内存输出流中
        try
        {
            while ((len = inputStream.read(buffer, 0, buffer.length)) != -1)
            {
                out.write(buffer, 0, len);
            }
            // 将内存流转换为字符串
            jsonStr = new String(out.toByteArray());
        }
        catch (IOException e)
        {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return jsonStr;
    }
}
