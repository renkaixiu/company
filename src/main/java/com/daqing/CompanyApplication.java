package com.daqing;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;

/**
 * Created by dongao on 2018/6/22.
 */
@SpringBootApplication
@MapperScan("com.daqing.modules.*.dao")
public class CompanyApplication extends SpringBootServletInitializer {
    public static void main(String[] args) {
        SpringApplication.run(CompanyApplication.class,args);
    }
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(CompanyApplication.class);
    }
}
