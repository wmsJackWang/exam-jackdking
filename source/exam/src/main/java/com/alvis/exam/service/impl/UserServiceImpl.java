package com.alvis.exam.service.impl;

import com.alvis.exam.domain.other.KeyValue;
import com.alvis.exam.exception.BusinessException;
import com.alvis.exam.configuration.property.SystemConfig;
import com.alvis.exam.configuration.spring.cache.CacheConfig;
import com.alvis.exam.domain.User;
import com.alvis.exam.event.OnRegistrationCompleteEvent;
import com.alvis.exam.repository.UserMapper;
import com.alvis.exam.service.UserService;
import com.alvis.exam.viewmodel.admin.user.UserPageRequestVM;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.redis.cache.RedisCache;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author alvis
 */
@Service
public class UserServiceImpl extends BaseServiceImpl<User> implements UserService {

    private final static String CACHE_NAME = "User";
    private final static String CACHE_OPENID = "OPENID";
    private final UserMapper userMapper;
    private final ApplicationEventPublisher eventPublisher;
    private final RedisTemplate<String, Object> redisTemplate;
    private final CacheConfig cacheConfig;
    private final SystemConfig systemConfig;

    @Autowired
    public UserServiceImpl(UserMapper userMapper, ApplicationEventPublisher eventPublisher, RedisTemplate<String, Object> redisTemplate, 
    		CacheConfig cacheConfig, SystemConfig systemConfig) {
    	
        super(userMapper);
        this.userMapper = userMapper;
        this.eventPublisher = eventPublisher;
        this.redisTemplate = redisTemplate;
        this.cacheConfig = cacheConfig;
        this.systemConfig = systemConfig;
    }


    @Override
    public List<User> getUsers() {
        return userMapper.getAllUser();
    }

    @Override
    public User getUserById(Integer id) {
        return userMapper.getUserById(id);
    }

    @Override
    @Cacheable(value = CACHE_NAME, key = "#username", unless = "#result == null")
    public User getUserByUserName(String username) {
        return userMapper.getUserByUserName(username);
    }

    @Override
    @CacheEvict(value = CACHE_NAME, key = "#record.userName")
    public int insertByFilter(User record) {
        return super.insertByFilter(record);
    }

    @Override
    @CacheEvict(value = CACHE_NAME, key = "#record.userName")
    public int updateByIdFilter(User record) {
        return super.updateByIdFilter(record);
    }

    @Override
    @CacheEvict(value = CACHE_NAME, key = "#record.userName")
    public int updateById(User record) {
        return super.updateById(record);
    }

    @Override
    public User getUserByUserNamePwd(String username, String pwd) {
        return userMapper.getUserByUserNamePwd(username, pwd);
    }

    @Override
    public User getUserByUuid(String uuid) {
        return userMapper.getUserByUuid(uuid);
    }

    @Override
    public List<User> userPageList(String name, Integer pageIndex, Integer pageSize) {
        Map<String, Object> map = new HashMap<>(3);
        map.put("name", name);
        map.put("offset", ((int) pageIndex) * pageSize);
        map.put("limit", pageSize);
        return userMapper.userPageList(map);
    }

    @Override
    public Integer userPageCount(String name) {
        Map<String, Object> map = new HashMap<>(1);
        map.put("name", name);
        return userMapper.userPageCount(map);
    }


    @Override
    public PageInfo<User> userPage(UserPageRequestVM requestVM) {
        return PageHelper.startPage(requestVM.getPageIndex(), requestVM.getPageSize(), "id desc").doSelectPageInfo(() ->
                userMapper.userPage(requestVM)
        );
    }


    @Override
    public void insertUser(User user) {
        userMapper.insertSelective(user);
        eventPublisher.publishEvent(new OnRegistrationCompleteEvent(user));
    }

    @Override
    @Transactional(rollbackFor = BusinessException.class)
    public void insertUsers(List<User> users) {
        userMapper.insertUsers(users);
        throw new BusinessException("test BusinessException roll back");
    }

    @Override
    public void updateUser(User user) {
        userMapper.updateUser(user);
    }

    @Override
    public void updateUsersAge(Integer age, List<Integer> ids) {
        Map<String, Object> map = new HashMap<>(2);
        map.put("idslist", ids);
        map.put("age", age);
        userMapper.updateUsersAge(map);
    }

    @Override
    public void deleteUserByIds(List<Integer> ids) {
        userMapper.deleteUsersByIds(ids);
    }

    @Override
    public Integer selectAllCount() {
        return userMapper.selectAllCount();
    }

    @Override
    public List<KeyValue> selectByUserName(String userName) {
        return userMapper.selectByUserName(userName);
    }

    @Override
    public List<User> selectByIds(List<Integer> ids) {
        return userMapper.selectByIds(ids);
    }

    @Override
    public User selectByWxOpenId(String wxOpenId) {
        return userMapper.selectByWxOpenId(wxOpenId);
    }

    @Override
    @CacheEvict(value = CACHE_NAME, key = "#user.userName")
    @Transactional
    public void changePicture(User user, String imagePath) {
        User changePictureUser = new User();
        changePictureUser.setId(user.getId());
        changePictureUser.setImagePath(imagePath);
        userMapper.updateByPrimaryKeySelective(changePictureUser);
    }


	@Override
	public boolean pushTokenOpenid2Cache(String Token, String openid) {
		// TODO Auto-generated method stub
        String key = cacheConfig.simpleKeyGenerator(CACHE_OPENID, Token);
        redisTemplate.opsForValue().set(key, openid, systemConfig.getWx().getTokenToLive());
        return true;
	}


	@Override
	public String getOpenidByLoginTokenFromCache(String Token) {
		// TODO Auto-generated method stub
		
		String key = cacheConfig.simpleKeyGenerator(CACHE_OPENID, Token);
		String openid = (String)redisTemplate.opsForValue().get(key);
        redisTemplate.delete(key);
		return openid;
	}


	@Override
	public boolean checkLoginTokenIsExist(String Token) {
		// TODO Auto-generated method stub
		
		String key = cacheConfig.simpleKeyGenerator(CACHE_OPENID, Token);
		return redisTemplate.hasKey(key);
	}
	
	
}
