package com.alvis.exam.configuration.spring.ssl;

import org.apache.catalina.connector.Connector;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

//
//@Configuration
public class TomcatConfig {
	
//    @Value("${http.port}")
//    private Integer port;
//
//    @Bean
//    public TomcatServletWebServerFactory tomcatServletWebServerFactory(){
//        TomcatServletWebServerFactory tomcatServletWebServerFactory = new TomcatServletWebServerFactory();
//        tomcatServletWebServerFactory.addAdditionalTomcatConnectors(httpConnector());
//        return tomcatServletWebServerFactory;
//    }
//
//    public Connector httpConnector(){
//        Connector connector = new Connector("org.apache.coyote.http11.Http11NioProtocol");
//        connector.setPort(port);
//        return connector;
//    }
}