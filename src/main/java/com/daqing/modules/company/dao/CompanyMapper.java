package com.daqing.modules.company.dao;

import com.daqing.modules.company.model.Company;
import org.apache.ibatis.annotations.Param;

public interface CompanyMapper {
    int deleteByPrimaryKey(Long id);

    int insert(Company record);

    int insertSelective(Company record);

    Company selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Company record);

    int updateByPrimaryKey(Company record);

    Company selectByName(@Param("companyName")String companyName);
}