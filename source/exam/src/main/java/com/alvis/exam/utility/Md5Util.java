
package com.alvis.exam.utility;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.xml.bind.DatatypeConverter;
import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;


/**
 * @author alvis
 */
public class Md5Util {

    private static final Logger logger = LoggerFactory.getLogger(Md5Util.class);

    public static String encode(String pwd) {
        String hash = null;
        try {
            hash = DatatypeConverter.printHexBinary(
                    MessageDigest.getInstance("MD5").digest(pwd.getBytes("UTF-8")));
        } catch (NoSuchAlgorithmException e) {
            logger.error(e.getMessage(), e);
        } catch (UnsupportedEncodingException e) {
            logger.error(e.getMessage(), e);
        }
        return hash;
    }
    
    public static void main(String[] args) {
		System.out.println(encode("12"));//6512BD43D9CAA6E02C990B0A82652DCA
		//C20AD4D76FE97759AA27A0C99BFF6710

	}
}
