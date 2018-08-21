package com.daqing.modules.company.service;

import com.daqing.modules.company.model.Company;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by dongao on 2018/7/1.
 */
public interface CompanyService {
  Long save(Company company);
  Company load(Long id);
  Company selectByName(String companyName);
  String insertRelationValue(List<Map> valueList,String stakeholder,String internal,String companyId);
  String updateRelationValue(List<Map> valueList,String stakeholder,String internal,String companyId,String stakeholderId,String linkId);
}
