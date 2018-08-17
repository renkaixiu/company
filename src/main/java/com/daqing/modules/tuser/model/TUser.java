package com.daqing.modules.tuser.model;

import java.util.Date;

public class TUser implements java.io.Serializable {
    private Integer id;

    private Double uid;

    private String username;

    private String pass;

    private String passSalt;

    private String fullname;

    private Double roleid;

    private Date createddate;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Double getUid() {
        return uid;
    }

    public void setUid(Double uid) {
        this.uid = uid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username == null ? null : username.trim();
    }

    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass == null ? null : pass.trim();
    }

    public String getPassSalt() {
        return passSalt;
    }

    public void setPassSalt(String passSalt) {
        this.passSalt = passSalt == null ? null : passSalt.trim();
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname == null ? null : fullname.trim();
    }

    public Double getRoleid() {
        return roleid;
    }

    public void setRoleid(Double roleid) {
        this.roleid = roleid;
    }

    public Date getCreateddate() {
        return createddate;
    }

    public void setCreateddate(Date createddate) {
        this.createddate = createddate;
    }
}