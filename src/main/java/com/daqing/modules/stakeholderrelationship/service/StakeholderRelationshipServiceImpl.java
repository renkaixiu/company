package com.daqing.modules.stakeholderrelationship.service;

import com.daqing.modules.stakeholder.service.StakeholderService;
import com.daqing.modules.stakeholderrelationship.dao.StakeholderRelationshipMapper;
import com.daqing.modules.stakeholderrelationship.model.StakeholderRelationship;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by dongao on 2018/7/4.
 */
@Service
public class StakeholderRelationshipServiceImpl implements StakeholderRelationshipService {
    @Autowired
    private StakeholderRelationshipMapper stakeholderRelationshipMapper;
    @Override
    public List<StakeholderRelationship> selectByLinkId(Map map){
        return stakeholderRelationshipMapper.selectByLinkId(map);
    }
    @Override
    public Integer save(StakeholderRelationship stakeholderRelationship){
        stakeholderRelationshipMapper.insertSelective(stakeholderRelationship);
        return stakeholderRelationship.getId();
    }
    @Override
    public StakeholderRelationship load(Integer id){
        return stakeholderRelationshipMapper.selectByPrimaryKey(id);
    }
    @Override
    public  void update(StakeholderRelationship stakeholderRelationship){
        stakeholderRelationshipMapper.updateByPrimaryKeySelective(stakeholderRelationship);
    }
    @Override
    public  List<StakeholderRelationship> countDataByCompanyId(Map map){
        return stakeholderRelationshipMapper.countDataByCompanyId(map);
    }
}
