package com.daqing.modules.companystakeholderlink.service;

import com.daqing.modules.companystakeholderlink.dao.CompanystakeholderLinkMapper;
import com.daqing.modules.companystakeholderlink.model.CompanystakeholderLink;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by dongao on 2018/7/2.
 */
@Service
public class CompanystakeholderLinkServiceImpl implements CompanystakeholderLinkService {
    @Autowired
    private CompanystakeholderLinkMapper companystakeholderLinkMapper;
    @Override
    public int insertSelective(CompanystakeholderLink record){
        return companystakeholderLinkMapper.insertSelective(record);
    }
    @Override
    public Long save(CompanystakeholderLink record){
        companystakeholderLinkMapper.insertSelective(record);
        return record.getId();
    }
    @Override
    public List<CompanystakeholderLink> selectByCompanyId(Long companyId){
        return companystakeholderLinkMapper.selectByCompanyId(companyId);
    }
    @Override
    public int countExist(CompanystakeholderLink companystakeholderLink){
        return companystakeholderLinkMapper.countExist(companystakeholderLink);
    }
    @Override
    public CompanystakeholderLink load(Long id){
        return companystakeholderLinkMapper.selectByPrimaryKey(id);
    }
    @Override
    public void update(CompanystakeholderLink companystakeholderLink){
         companystakeholderLinkMapper.updateByPrimaryKeySelective(companystakeholderLink);
    }
}
