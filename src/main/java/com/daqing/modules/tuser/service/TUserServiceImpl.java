package com.daqing.modules.tuser.service;

import com.daqing.modules.tuser.dao.TUserMapper;
import com.daqing.modules.tuser.model.TUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by dongao on 2018/6/25.
 */
@Service
public class TUserServiceImpl implements TUserService {

    @Autowired
    private TUserMapper tUserMapper;
    @Override
    public List<TUser> selectAll() {
        return tUserMapper.selectAll();
    }
}
