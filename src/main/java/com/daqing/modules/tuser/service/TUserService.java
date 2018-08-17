package com.daqing.modules.tuser.service;

import com.daqing.modules.tuser.model.TUser;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by dongao on 2018/6/25.
 */

public interface TUserService {
    List<TUser> selectAll();
}
