package com.daqing.modules.stakeholder.service;

import com.daqing.modules.stakeholder.dao.StakeholderMapper;
import com.daqing.modules.stakeholder.model.Stakeholder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by dongao on 2018/7/2.
 */
@Service
public class StakeholderServiceImpl implements StakeholderService {
    @Autowired
    private StakeholderMapper stakeholderMapper;
    @Override
    public List<Stakeholder> selectAll(){
        return stakeholderMapper.selectAll();
    }
    @Override
    public  Long save(Stakeholder stakeholder){
        stakeholderMapper.insert(stakeholder);
        return stakeholder.getId();
    }
    @Override
    public Stakeholder load(Long id){
        return stakeholderMapper.selectByPrimaryKey(id);
    }
    @Override
    public void update(Stakeholder stakeholder){
        stakeholderMapper.updateByPrimaryKeySelective(stakeholder);
    }
}
