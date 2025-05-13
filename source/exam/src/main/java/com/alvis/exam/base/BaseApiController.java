package com.alvis.exam.base;


import com.alvis.exam.context.WebContext;
import com.alvis.exam.domain.User;
import com.alvis.exam.utility.ModelMapperSingle;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.util.Base64;

/**
 * @author alvis
 */
public class BaseApiController {
    protected final static String DEFAULT_PAGE_SIZE = "10";
    protected final static ModelMapper modelMapper = ModelMapperSingle.Instance();
    @Autowired
    protected WebContext webContext;

    protected User getCurrentUser() {
        return webContext.getCurrentUser();
    }


    public static void main(String[] args) throws IOException {

        BufferedReader reader = new BufferedReader(new FileReader("longString.txt"));
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            sb.append(line);
        }

        // 示例Base64编码字符串（这里应该是你的Base64字符串）
//        StringBuilder imageData = new StringBuilder("");
        // 移除Base64字符串的开头和结尾的空白符，并替换掉可能的换行符
        String data = sb.toString().split(",")[1];
        // 解码Base64字符串
        byte[] imageBytes = Base64.getDecoder().decode(data);

        // 将字节数组转换为BufferedImage
        try {
            BufferedImage img = ImageIO.read(new ByteArrayInputStream(imageBytes));
            // 输出图片到文件（或者进行其他处理）
            File outputFile = new File("output.png"); // 指定输出文件路径和名称
            ImageIO.write(img, "png", outputFile); // 指定图片格式为PNG
            System.out.println("图片已保存到 " + outputFile.getAbsolutePath());
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}
