package com.alvis.exam.service;

import com.alvis.exam.domain.User;
import com.alvis.exam.domain.UserEventLog;
import com.alvis.exam.domain.UserToken;
import com.alvis.exam.viewmodel.admin.user.UserEventPageRequestVM;
import com.github.pagehelper.PageInfo;

import java.util.List;

public interface UserTokenService extends BaseService<UserToken> {

    /**
     * 微信token绑定
     *
     * @param user user
     * @return UserToken
     */
    UserToken bind(User user);

    /**
     * 检查微信openId是否绑定过
     *
     * @param openId openId
     * @return UserToken
     */
    UserToken checkBind(String openId);

    /**
     * 根据token获取UserToken，带缓存的
     *
     * @param token token
     * @return UserToken
     */
    UserToken getToken(String token);

    /**
     * 插入用户Token
     *
     * @param user user
     * @return UserToken
     */
    UserToken insertUserToken(User user);

    /**
     * 微信小程序退出，清除缓存
     *
     * @param userToken userToken
     */
    void unBind(UserToken userToken);

	UserToken existOrCreate(String openid)throws Exception;

	UserToken refreshUserToken(User user)throws Exception;
}
