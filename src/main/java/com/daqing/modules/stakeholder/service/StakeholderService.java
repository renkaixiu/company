package com.daqing.modules.stakeholder.service;

import com.daqing.modules.stakeholder.model.Stakeholder;

import java.util.List;

/**
 * Created by dongao on 2018/7/2.
 */
public interface StakeholderService {
    List<Stakeholder> selectAll();
    Long save(Stakeholder stakeholder);
    Stakeholder load(Long id);
}
