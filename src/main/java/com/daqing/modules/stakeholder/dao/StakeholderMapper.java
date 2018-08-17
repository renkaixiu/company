package com.daqing.modules.stakeholder.dao;

import com.daqing.modules.stakeholder.model.Stakeholder;

import java.util.List;

public interface StakeholderMapper {
    int deleteByPrimaryKey(Long id);

    int insert(Stakeholder record);

    int insertSelective(Stakeholder record);

    Stakeholder selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Stakeholder record);

    int updateByPrimaryKey(Stakeholder record);

    List<Stakeholder> selectAll();
}