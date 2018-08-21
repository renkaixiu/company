package com.daqing.modules.company.controller;

import com.alibaba.druid.support.json.JSONUtils;
import com.daqing.modules.company.model.Company;
import com.daqing.modules.company.service.CompanyService;
import com.daqing.modules.companystakeholderlink.model.CompanystakeholderLink;
import com.daqing.modules.companystakeholderlink.service.CompanystakeholderLinkService;
import com.daqing.modules.stakeholder.model.Stakeholder;
import com.daqing.modules.stakeholder.service.StakeholderService;
import com.daqing.modules.stakeholderrelationship.model.StakeholderRelationship;
import com.daqing.modules.stakeholderrelationship.service.StakeholderRelationshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

/**
 * Created by dongao on 2018/6/30.
 */
@Controller
@RequestMapping("/company")
public class CompanyController {

    @Autowired
    private CompanyService companyService;
    @Autowired
    private StakeholderService stakeholderService;
    @Autowired
    private CompanystakeholderLinkService companystakeholderLinkService;
    @Autowired
    private StakeholderRelationshipService stakeholderRelationshipService;

    @RequestMapping("/newcomapny")
    public String newcomapny(){
        return "company/new_company";
    }
    @RequestMapping("/toAddCompany")
    public String toAddCompany(Company company, Model model){
        if ("".equals(company.getCompanyName()) || null ==company.getCompanyName() ){
            return "redirect:/company/newcomapny";
        }
        Company com= companyService.selectByName(company.getCompanyName());
        Long returnCompanyId = null;
        if (null == com){//公司不存在
            returnCompanyId = companyService.save(company);
        }else{//存在
            returnCompanyId = com.getId();
        }
        return "redirect:/company/addCompanyInfo?companyId="+returnCompanyId;
    }
    @RequestMapping("/addCompanyInfo")
    public String addCompanyInfo(Company company, Model model,HttpServletRequest request){
        String companyId = request.getParameter("companyId");
        Company returnCompany = companyService.load(Long.valueOf(companyId));
        List<Stakeholder> stakeholderList = stakeholderService.selectAll();
        model.addAttribute("stakeholderList",stakeholderList);
        model.addAttribute("company",returnCompany);
        model.addAttribute("companyId",companyId);
        return "company/company_show";
    }
    @RequestMapping("/getJson")
    @ResponseBody
    public String getJson(HttpServletRequest request) {
        String companyId = request.getParameter("companyId");
        String type = request.getParameter("type");
        Company company = companyService.load(Long.valueOf(companyId));
        List<Map> nodesList = new ArrayList<Map>();
        List<Map> edgesList = new ArrayList<Map>();
        Map resultMap = new HashMap();
        List<CompanystakeholderLink> companystakeholderLinkList = companystakeholderLinkService.selectByCompanyId(Long.valueOf(companyId));

        Map companyNodeMap = new HashMap();
        companyNodeMap.put("id", company.getId());
        companyNodeMap.put("title", company.getCompanyName());
        companyNodeMap.put("label", "company");
        Map companyDataMap = new HashMap();
        companyDataMap.put("data", companyNodeMap);
        Map posMap = new HashMap();
        posMap.put("x","200");
        posMap.put("y","200");
        companyDataMap.put("position", posMap);
        nodesList.add(companyDataMap);
        if (null != companystakeholderLinkList){
            for (CompanystakeholderLink companystakeholderLink:companystakeholderLinkList){
                Map nodeMap = new HashMap();
                nodeMap.put("id", companystakeholderLink.getStakeholderId());
                nodeMap.put("linkId", companystakeholderLink.getId());
                nodeMap.put("class", "stakeholder");
                nodeMap.put("title", companystakeholderLink.getStakeholderName());
                if (1 == companystakeholderLink.getIsInternal()){
                    nodeMap.put("label", "intrenal");
                }else{
                    nodeMap.put("label", "external");
                }
                Map nodeDataMap = new HashMap();
                nodeDataMap.put("data", nodeMap);
                nodesList.add(nodeDataMap);



                Map paramMap = new HashMap();
                paramMap.put("linkId",companystakeholderLink.getId());
                List<StakeholderRelationship> relationshipList = new ArrayList<StakeholderRelationship>();
                if (null != type && type.equals("1")){//关系
                    paramMap.put("isData",2);
                    relationshipList = stakeholderRelationshipService.selectByLinkId(paramMap);
                    if (null != relationshipList && relationshipList.size() > 0){
                        for (StakeholderRelationship stakeholderRelationship:relationshipList){
                            Map edgesMap = new HashMap();
                            Map edgesDataMap = new HashMap();
                            edgesMap.put("source",stakeholderRelationship.getSource());
                            edgesMap.put("target",stakeholderRelationship.getTarget());
                            edgesMap.put("relationship",stakeholderRelationship.getRelationship());
                            if (1== companystakeholderLink.getIsInternal() && !(stakeholderRelationship.getSource().toString().equals(companyId))){
                                //内部的
                                edgesMap.put("label","in");
                            }else if (2== companystakeholderLink.getIsInternal() && !(stakeholderRelationship.getSource().toString().equals(companyId))){
                               //外部的
                                edgesMap.put("label","out");
                            }else{
                                edgesMap.put("label","comp");
                            }
                            edgesDataMap.put("data",edgesMap);
                            edgesList.add(edgesDataMap);
                        }
                    }
                }else if (null != type && type.equals("2")){//数字
                    paramMap.put("isData",1);
                    relationshipList = stakeholderRelationshipService.selectByLinkId(paramMap);
                    if (null != relationshipList && relationshipList.size() > 0){
                        for (StakeholderRelationship stakeholderRelationship:relationshipList){
                            StakeholderRelationship dataShip = stakeholderRelationshipService.load(stakeholderRelationship.getParent());
                            Map edgesMap = new HashMap();
                            Map edgesDataMap = new HashMap();
                            edgesMap.put("source",stakeholderRelationship.getSource());
                            edgesMap.put("target",stakeholderRelationship.getTarget());
                            edgesMap.put("relationship",(null == dataShip.getRelationship()?"":dataShip.getRelationship())+" "+stakeholderRelationship.getRelationship());
                            if (1== companystakeholderLink.getIsInternal() && !(stakeholderRelationship.getSource().toString().equals(companyId))){
                                //内部的
                                edgesMap.put("label","in");
                            }else if (2== companystakeholderLink.getIsInternal() && !(stakeholderRelationship.getSource().toString().equals(companyId))){
                                //外部的
                                edgesMap.put("label","out");
                            }else{
                                edgesMap.put("label","comp");
                            }
                            edgesDataMap.put("data",edgesMap);
                            edgesList.add(edgesDataMap);
                        }
                    }
                }else {
                    Map edgesMap = new HashMap();
                    Map edgesDataMap = new HashMap();
                    edgesMap.put("source",companystakeholderLink.getCompanyId());
                    edgesMap.put("target",companystakeholderLink.getStakeholderId());
                    edgesMap.put("relationship","");
                    edgesMap.put("label","new");
                    edgesDataMap.put("data",edgesMap);
                    edgesList.add(edgesDataMap);
                }

            }
        }

        resultMap.put("nodes",nodesList);
        resultMap.put("edges",edgesList);
        String result = JSONUtils.toJSONString(resultMap);
        return result;
    }
    @RequestMapping("/saveLink")
    public String saveLink(CompanystakeholderLink companystakeholderLink,HttpServletRequest request){
        int count = companystakeholderLinkService.countExist(companystakeholderLink);
        if (count == 0){
            companystakeholderLink.setIsValid(1);
            companystakeholderLink.setCreateDate(new Date());
            companystakeholderLinkService.insertSelective(companystakeholderLink);
        }
        return "redirect:/company/addCompanyInfo?companyId="+companystakeholderLink.getCompanyId();
    }
    @RequestMapping("/saveRelationValue")
    @ResponseBody
    public String saveRelationValue(HttpServletRequest request) {
        Map resMap = new HashMap();
        try {
            String valueData = request.getParameter("valueData");
            String stakeholder = request.getParameter("stakeholder");
            String internal = request.getParameter("internal");
            String companyId = request.getParameter("companyId");
            List<Map> valueList = (List<Map>)JSONUtils.parse(valueData);
            String code = companyService.insertRelationValue(valueList,stakeholder,internal,companyId);
            if ("1".equals(code)){
                resMap.put("code","1");
                resMap.put("msg","success");
            }else{
                resMap.put("code","0");
                resMap.put("msg","error");
            }
        }catch (Exception e){
            e.printStackTrace();
            resMap.put("code","0");
            resMap.put("msg","error");
        }
        return JSONUtils.toJSONString(resMap);
    }
    @RequestMapping("/getRelationValue")
    @ResponseBody
    public String getRelationValue(HttpServletRequest request) {
        Map resMap = new HashMap();
        try {
            String linkId = request.getParameter("linkId");
            CompanystakeholderLink companystakeholderLink = companystakeholderLinkService.load(Long.valueOf(linkId));
            Stakeholder stakeholder = stakeholderService.load(companystakeholderLink.getStakeholderId());
            Map paramMap = new HashMap();
            paramMap.put("linkId",companystakeholderLink.getId());
            List<StakeholderRelationship> relationshipList = stakeholderRelationshipService.selectByLinkId(paramMap);
            List<Map> resultList = new ArrayList<Map>();
            if (null != relationshipList && relationshipList.size() > 0){
                for (StakeholderRelationship relationship:relationshipList) {
                    Map relationMap = new HashMap();
                    if (relationship.getIsData() == 1){//data关系
                        relationMap.put("data",relationship.getRelationship());
                        relationMap.put("dataId",relationship.getId());
                        StakeholderRelationship dataShip = stakeholderRelationshipService.load(relationship.getParent());
                        relationMap.put("relationship",dataShip.getRelationship());
                        relationMap.put("relationshipId",dataShip.getId());
                        if (relationship.getSource().equals(companystakeholderLink.getCompanyId())){
                            relationMap.put("to","1");
                        }else{
                            relationMap.put("to","2");
                        }
                        resultList.add(relationMap);
                    }
                }
            }
            resMap.put("stakeholderName",stakeholder.getStakeholderName());
            resMap.put("stakeholderId",stakeholder.getId());
            resMap.put("isInternal",stakeholder.getIsInternal());
            resMap.put("relationshipList",resultList);
            resMap.put("code","1");
            return JSONUtils.toJSONString(resMap);
        }catch (Exception e){
            e.printStackTrace();
            resMap.put("code","0");
            return JSONUtils.toJSONString(resMap);
        }
    }
    @RequestMapping("/updateRelationValue")
    @ResponseBody
    public String updateRelationValue(HttpServletRequest request) {
        Map resMap = new HashMap();
        try {
            String valueData = request.getParameter("valueData");
            String stakeholder = request.getParameter("stakeholder");
            String stakeholderId = request.getParameter("stakeholderId");
            String internal = request.getParameter("internal");
            String companyId = request.getParameter("companyId");
            String linkId = request.getParameter("linkId");
            List<Map> valueList = (List<Map>)JSONUtils.parse(valueData);
            String code = companyService.updateRelationValue(valueList,stakeholder,internal,companyId,stakeholderId,linkId);
            if ("1".equals(code)){
                resMap.put("code","1");
                resMap.put("msg","success");
            }else{
                resMap.put("code","0");
                resMap.put("msg","error");
            }
        }catch (Exception e){
            e.printStackTrace();
            resMap.put("code","0");
            resMap.put("msg","error");
        }
        return JSONUtils.toJSONString(resMap);
    }

    @RequestMapping("/getTotalData")
    @ResponseBody
    public String getTotalData(HttpServletRequest request) {
        String companyId = request.getParameter("companyId");
        Company company = companyService.load(Long.valueOf(companyId));
        List<Map> nodesList = new ArrayList<Map>();
        List<Map> edgesList = new ArrayList<Map>();
        Map resultMap = new HashMap();

        Map paramMap = new HashMap();
        paramMap.put("companyId",companyId);
        List<StakeholderRelationship> relationshipList = stakeholderRelationshipService.countDataByCompanyId(paramMap);

        Map companyNodeMap = new HashMap();
        companyNodeMap.put("id", company.getId());
        companyNodeMap.put("title", company.getCompanyName());
        companyNodeMap.put("label", "company");
        Map companyDataMap = new HashMap();
        companyDataMap.put("data", companyNodeMap);
        Map posMap = new HashMap();
        posMap.put("x","200");
        posMap.put("y","200");
        companyDataMap.put("position", posMap);
        nodesList.add(companyDataMap);
        if (null != relationshipList){
            for (StakeholderRelationship relationship:relationshipList){
                Map nodeMap = new HashMap();
                nodeMap.put("id", relationship.getStakeholderId());
                nodeMap.put("linkId", relationship.getCompanyStakeholderLinkId());
                nodeMap.put("class", "stakeholder");
                nodeMap.put("title", relationship.getStakeholderName());
                if (1 == relationship.getIsInternal()){
                    nodeMap.put("label", "intrenal");
                }else{
                    nodeMap.put("label", "external");
                }
                Map nodeDataMap = new HashMap();
                nodeDataMap.put("data", nodeMap);
                nodesList.add(nodeDataMap);

                Map edgesMap = new HashMap();
                Map edgesDataMap = new HashMap();
                edgesMap.put("source",relationship.getSource());
                edgesMap.put("target",relationship.getTarget());
                edgesMap.put("relationship",relationship.getSumData());
                if (1== relationship.getIsInternal() && !(relationship.getSource().toString().equals(companyId))){
                    //内部的
                    edgesMap.put("label","in");
                }else if (2== relationship.getIsInternal() && !(relationship.getSource().toString().equals(companyId))){
                    //外部的
                    edgesMap.put("label","out");
                }else{
                    edgesMap.put("label","comp");
                }
                edgesDataMap.put("data",edgesMap);
                edgesList.add(edgesDataMap);
            }
        }

        resultMap.put("nodes",nodesList);
        resultMap.put("edges",edgesList);
        String result = JSONUtils.toJSONString(resultMap);
        return result;
    }

    @RequestMapping("/deleteLink")
    @ResponseBody
    public String deleteLink(HttpServletRequest request) {
        Map resMap = new HashMap();
        String linkId = request.getParameter("linkId");
        CompanystakeholderLink companystakeholderLink = companystakeholderLinkService.load(Long.valueOf(linkId));
        companystakeholderLink.setIsValid(0);
        companystakeholderLinkService.update(companystakeholderLink);
        resMap.put("code","1");
        return JSONUtils.toJSONString(resMap);
    }
}
