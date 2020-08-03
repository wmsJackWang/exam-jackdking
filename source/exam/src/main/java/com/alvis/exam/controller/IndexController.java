package com.alvis.exam.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class IndexController {
	
    @GetMapping("admin1")
    public ModelAndView  admin(){
    	
    	ModelAndView mv =new ModelAndView();
    	mv.setViewName("/admin/index");
        return mv; // 这里返回的是文件名，这里会展示 404.html
    }
    
    @GetMapping("student1")
    public ModelAndView  student(){

    	ModelAndView mv =new ModelAndView();
    	mv.setViewName("/student/index");
        return mv; // 这里返回的是文件名，这里会展示 404.html
    }
    

}
