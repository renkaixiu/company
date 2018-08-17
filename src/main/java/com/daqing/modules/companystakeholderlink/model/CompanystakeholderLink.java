package com.daqing.modules.companystakeholderlink.model;

import java.util.Date;

public class CompanystakeholderLink {
    private Long id;

    private Long companyId;

    private Long stakeholderId;

    private Integer isValid;

    private Date createDate;

    private String stakeholderName;

    private int isInternal;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Long companyId) {
        this.companyId = companyId;
    }

    public Long getStakeholderId() {
        return stakeholderId;
    }

    public void setStakeholderId(Long stakeholderId) {
        this.stakeholderId = stakeholderId;
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

    public String getStakeholderName() {
        return stakeholderName;
    }

    public void setStakeholderName(String stakeholderName) {
        this.stakeholderName = stakeholderName;
    }

    public int getIsInternal() {
        return isInternal;
    }

    public void setIsInternal(int isInternal) {
        this.isInternal = isInternal;
    }
}