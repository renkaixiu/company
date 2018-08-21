package com.daqing.modules.stakeholderrelationship.model;

import java.util.Date;

public class StakeholderRelationship {
    private Integer id;

    private Integer parent;

    private Long companyStakeholderLinkId;

    private Long source;

    private Long target;

    private Integer isData;

    private Integer isValid;

    private Date createDate;

    private String relationship;

    private String stakeholderName;

    private Long stakeholderId;

    private String sumData;

    private Integer isInternal;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Long getCompanyStakeholderLinkId() {
        return companyStakeholderLinkId;
    }

    public void setCompanyStakeholderLinkId(Long companyStakeholderLinkId) {
        this.companyStakeholderLinkId = companyStakeholderLinkId;
    }

    public Long getSource() {
        return source;
    }

    public void setSource(Long source) {
        this.source = source;
    }

    public Long getTarget() {
        return target;
    }

    public void setTarget(Long target) {
        this.target = target;
    }

    public Integer getIsData() {
        return isData;
    }

    public void setIsData(Integer isData) {
        this.isData = isData;
    }

    public Integer getIsValid() {
        return isValid;
    }

    public void setIsValid(Integer isValid) {
        this.isValid = isValid;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getRelationship() {
        return relationship;
    }

    public void setRelationship(String relationship) {
        this.relationship = relationship == null ? null : relationship.trim();
    }

    public Integer getParent() {
        return parent;
    }

    public void setParent(Integer parent) {
        this.parent = parent;
    }

    public String getStakeholderName() {
        return stakeholderName;
    }

    public void setStakeholderName(String stakeholderName) {
        this.stakeholderName = stakeholderName;
    }

    public Long getStakeholderId() {
        return stakeholderId;
    }

    public void setStakeholderId(Long stakeholderId) {
        this.stakeholderId = stakeholderId;
    }

    public String getSumData() {
        return sumData;
    }

    public void setSumData(String sumData) {
        this.sumData = sumData;
    }

    public Integer getIsInternal() {
        return isInternal;
    }

    public void setIsInternal(Integer isInternal) {
        this.isInternal = isInternal;
    }
}