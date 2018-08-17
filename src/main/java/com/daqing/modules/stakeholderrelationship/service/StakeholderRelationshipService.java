package com.daqing.modules.stakeholderrelationship.service;

import com.daqing.modules.stakeholderrelationship.model.StakeholderRelationship;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by dongao on 2018/7/4.
 */

public interface StakeholderRelationshipService {
    List<StakeholderRelationship> selectByLinkId(Map map);
    Integer save(StakeholderRelationship stakeholderRelationship);
    StakeholderRelationship load(Integer id);
}
