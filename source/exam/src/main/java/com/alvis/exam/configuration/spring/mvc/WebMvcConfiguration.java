package com.alvis.exam.configuration.spring.mvc;

import java.util.List;

import com.alvis.exam.configuration.spring.codecv.CodeCVTokenHandlerInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;

import com.alvis.exam.configuration.property.SystemConfig;
import com.alvis.exam.configuration.spring.wx.TokenHandlerInterceptor;

import lombok.AllArgsConstructor;


/**
 * @author alvis
 */

@Configuration
@AllArgsConstructor
public class WebMvcConfiguration extends WebMvcConfigurationSupport {

    private final TokenHandlerInterceptor tokenHandlerInterceptor;
    private final CodeCVTokenHandlerInterceptor codeCVTokenHandlerInterceptor;
    private final SystemConfig systemConfig;

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addRedirectViewController("/", "/student/index.html");
        registry.addRedirectViewController("/student", "/student/index.html");
        registry.addRedirectViewController("/admin", "/admin/index.html");
        registry.addRedirectViewController("/resume", "/resume/index.html");
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/")
                .setCachePeriod(31556926);
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        //微信小程序
        List<String> securityIgnoreUrls = systemConfig.getWx().getSecurityIgnoreUrls();
        String[] ignores = new String[securityIgnoreUrls.size()];
        registry.addInterceptor(tokenHandlerInterceptor)
                .addPathPatterns("/api/wx/**")
                .excludePathPatterns(securityIgnoreUrls.toArray(ignores));

        //简历网站
        List<String> resumeSecurityIgnoreUrls = systemConfig.getResumeConfig().getSecurityIgnoreUrls();
        String[] resumeIgnores = new String[resumeSecurityIgnoreUrls.size()];
        // codecv的系列操作
        registry.addInterceptor(codeCVTokenHandlerInterceptor)
                .addPathPatterns("/api/codecv/**")
                .excludePathPatterns(resumeSecurityIgnoreUrls.toArray(resumeIgnores));
        super.addInterceptors(registry);
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowCredentials(true)
                .allowedMethods("*")
                .allowedOrigins("*")
                .allowedHeaders("*");
        super.addCorsMappings(registry);
    }

}
