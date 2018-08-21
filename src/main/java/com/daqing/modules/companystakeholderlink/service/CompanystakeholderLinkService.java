package com.daqing.modules.companystakeholderlink.service;

import com.daqing.modules.companystakeholderlink.model.CompanystakeholderLink;

import java.util.List;

/**
 * Created by dongao on 2018/7/2.
 */
public interface CompanystakeholderLinkService {
    int insertSelective(CompanystakeholderLink record);
    Long save(CompanystakeholderLink record);
    List<CompanystakeholderLink> selectByCompanyId(Long companyId);
    int countExist(CompanystakeholderLink companystakeholderLink);
    CompanystakeholderLink load(Long id);
    void update(CompanystakeholderLink companystakeholderLink);
}
