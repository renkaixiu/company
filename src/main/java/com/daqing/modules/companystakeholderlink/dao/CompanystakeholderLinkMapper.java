package com.daqing.modules.companystakeholderlink.dao;

import com.daqing.modules.companystakeholderlink.model.CompanystakeholderLink;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface CompanystakeholderLinkMapper {
    int deleteByPrimaryKey(Long id);

    int insert(CompanystakeholderLink record);

    int insertSelective(CompanystakeholderLink record);

    CompanystakeholderLink selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(CompanystakeholderLink record);

    int updateByPrimaryKey(CompanystakeholderLink record);

    List<CompanystakeholderLink> selectByCompanyId(@Param("companyId")Long companyId);

    int countExist(CompanystakeholderLink companystakeholderLink);
}