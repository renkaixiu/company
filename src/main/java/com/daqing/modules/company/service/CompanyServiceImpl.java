package com.daqing.modules.company.service;

import com.daqing.modules.company.dao.CompanyMapper;
import com.daqing.modules.company.model.Company;
import com.daqing.modules.companystakeholderlink.model.CompanystakeholderLink;
import com.daqing.modules.companystakeholderlink.service.CompanystakeholderLinkService;
import com.daqing.modules.stakeholder.model.Stakeholder;
import com.daqing.modules.stakeholder.service.StakeholderService;
import com.daqing.modules.stakeholderrelationship.model.StakeholderRelationship;
import com.daqing.modules.stakeholderrelationship.service.StakeholderRelationshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created by dongao on 2018/7/1.
 */
@Service
public class CompanyServiceImpl implements CompanyService {
    @Autowired
    private CompanyMapper companyMapper;
    @Autowired
    private StakeholderService stakeholderService;
    @Autowired
    private CompanystakeholderLinkService companystakeholderLinkService;
    @Autowired
    private StakeholderRelationshipService stakeholderRelationshipService;
    @Override
    public Long save(Company company){
        company.setIsValid(1);
        company.setCreateDate(new Date());
        companyMapper.insert(company);
        return company.getId();

    }
    @Override
    public Company load(Long id){
        return companyMapper.selectByPrimaryKey(id);
    }

    @Override
    public Company selectByName(String companyName){
        return companyMapper.selectByName(companyName);
    }
    @Override
    @Transactional
    public String insertRelationValue(List<Map> valueList, String stakeholderName, String internal,String companyId){
        Stakeholder stakeholder = new Stakeholder();
        stakeholder.setStakeholderName(stakeholderName);
        stakeholder.setIsValid(1);
        stakeholder.setIsInternal(Integer.valueOf(internal));
        stakeholder.setCreateDate(new Date());
        stakeholderService.save(stakeholder);

        CompanystakeholderLink companystakeholderLink = new CompanystakeholderLink();
        companystakeholderLink.setCompanyId(Long.valueOf(companyId));
        companystakeholderLink.setStakeholderId(stakeholder.getId());
        companystakeholderLink.setIsValid(1);
        companystakeholderLink.setCreateDate(new Date());
        companystakeholderLinkService.save(companystakeholderLink);

        for (Map map : valueList){
            StakeholderRelationship stakeholderRelationship = new StakeholderRelationship();
            stakeholderRelationship.setCompanyStakeholderLinkId(companystakeholderLink.getId());
            if ("1".equals(map.get("to"))){
                stakeholderRelationship.setSource(Long.valueOf(companyId));
                stakeholderRelationship.setTarget(stakeholder.getId());
            }else{
                stakeholderRelationship.setSource(stakeholder.getId());
                stakeholderRelationship.setTarget(Long.valueOf(companyId));
            }
            stakeholderRelationship.setIsValid(1);
            stakeholderRelationship.setCreateDate(new Date());

            stakeholderRelationship.setIsData(2);//关系
            stakeholderRelationship.setRelationship((String)map.get("value"));
            stakeholderRelationshipService.save(stakeholderRelationship);

            stakeholderRelationship.setIsData(1);//数字
            stakeholderRelationship.setRelationship((String)map.get("data"));
            stakeholderRelationship.setParent(stakeholderRelationship.getId());
            stakeholderRelationship.setId(null);
            stakeholderRelationshipService.save(stakeholderRelationship);



        }
        return "1";
    }
}
