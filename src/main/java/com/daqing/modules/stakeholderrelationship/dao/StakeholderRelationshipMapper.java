package com.daqing.modules.stakeholderrelationship.dao;

import com.daqing.modules.stakeholderrelationship.model.StakeholderRelationship;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface StakeholderRelationshipMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(StakeholderRelationship record);

    int insertSelective(StakeholderRelationship record);

    StakeholderRelationship selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(StakeholderRelationship record);

    int updateByPrimaryKey(StakeholderRelationship record);

    List<StakeholderRelationship> selectByLinkId(Map map);
}