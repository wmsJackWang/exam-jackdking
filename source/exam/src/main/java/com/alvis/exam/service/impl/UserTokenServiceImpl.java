package com.alvis.exam.service.impl;

import com.alvis.exam.configuration.property.SystemConfig;
import com.alvis.exam.configuration.spring.cache.CacheConfig;
import com.alvis.exam.domain.User;
import com.alvis.exam.domain.UserEventLog;
import com.alvis.exam.domain.UserToken;
import com.alvis.exam.domain.enums.RoleEnum;
import com.alvis.exam.domain.enums.UserStatusEnum;
import com.alvis.exam.event.UserEvent;
import com.alvis.exam.repository.UserTokenMapper;
import com.alvis.exam.service.UserService;
import com.alvis.exam.service.UserTokenService;
import com.alvis.exam.utility.DateTimeUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.UUID;

@Service
public class UserTokenServiceImpl extends BaseServiceImpl<UserToken> implements UserTokenService {
	
	
	private static final Logger log = LoggerFactory.getLogger(UserTokenServiceImpl.class);


    private final static String CACHE_NAME = "Token";
    private final UserTokenMapper userTokenMapper;
    private final UserService userService;
    private final SystemConfig systemConfig;
    private final CacheConfig cacheConfig;
    private final RedisTemplate<String, Object> redisTemplate;
    

    private final ApplicationEventPublisher eventPublisher;

    @Autowired
    public UserTokenServiceImpl(UserTokenMapper userTokenMapper, UserService userService, SystemConfig systemConfig, CacheConfig cacheConfig, RedisTemplate<String, Object> redisTemplate
    							,ApplicationEventPublisher eventPublisher) {
        super(userTokenMapper);
        this.userTokenMapper = userTokenMapper;
        this.userService = userService;
        this.systemConfig = systemConfig;
        this.cacheConfig = cacheConfig;
        this.redisTemplate = redisTemplate;
        this.eventPublisher = eventPublisher;
    }


    @Override
    @Transactional
    public UserToken bind(User user) {
        user.setModifyTime(new Date());
        userService.updateByIdFilter(user);
        return insertUserToken(user);
    }


    @Override
    public UserToken checkBind(String openId) {
        User user = userService.selectByWxOpenId(openId);
        if (null != user) {
            return insertUserToken(user);
        }
        return null;
    }

    @Override
    @Cacheable(value = CACHE_NAME, key = "#token", unless = "#result == null")
    public UserToken getToken(String token) {
        return userTokenMapper.getToken(token);	
    }

    @Override
    public UserToken insertUserToken(User user) {
        Date startTime = new Date();
        Date endTime = DateTimeUtil.addDuration(startTime, systemConfig.getWx().getTokenToLive());
        UserToken userToken = new UserToken();
        userToken.setToken(UUID.randomUUID().toString());
        userToken.setUserId(user.getId());
        userToken.setWxOpenId(user.getWxOpenId());
        userToken.setCreateTime(startTime);
        userToken.setEndTime(endTime);
        userToken.setUserName(user.getUserName());
        userService.updateByIdFilter(user);
        userTokenMapper.insertSelective(userToken);
        String key = cacheConfig.simpleKeyGenerator(CACHE_NAME, userToken.getToken());
        redisTemplate.opsForValue().set(key, userToken, systemConfig.getWx().getTokenToLive());
        return userToken;
    }

    @Override
    @Transactional
    public void unBind(UserToken userToken) {
        User user = userService.selectById(userToken.getUserId());
        user.setModifyTime(new Date());
        user.setWxOpenId(null);
        userService.updateById(user);
        userTokenMapper.deleteByPrimaryKey(userToken.getId());
        String key = cacheConfig.simpleKeyGenerator(CACHE_NAME, userToken.getToken());
        redisTemplate.delete(key);
    }


	@Override
	public UserToken existOrCreate(String openId) {
		// TODO Auto-generated method stub
		User user = userService.selectByWxOpenId(openId);
		if(user==null)
		{
			user = new User();
	        user.setUserUuid(UUID.randomUUID().toString());
	        user.setRole(RoleEnum.STUDENT.getCode());
	        user.setStatus(UserStatusEnum.Enable.getCode());
	        user.setLastActiveTime(new Date());
	        user.setCreateTime(new Date());
	        user.setDeleted(false);
			user.setWxOpenId(openId);
			user.setUserName("共图社社员"+user.getUserUuid().substring(0, 6));//默认微信openid就是登入用户名
			user.setUserLevel(1);//默认用户年限级别为1
	        userService.insertByFilter(user);
	        UserEventLog userEventLog = new UserEventLog(user.getId(), user.getUserName(), user.getRealName(), new Date());
	        userEventLog.setContent("欢迎 " + user.getUserName() + " 注册来到学之思考试系统");
	        eventPublisher.publishEvent(new UserEvent(userEventLog));
		}
		
		log.info("用戶信息：{}",user.toString());
		
	    return insertUserToken(user);
	}

}
