package com.alvis.exam.module;

import com.alibaba.fastjson.JSON;
import com.alvis.exam.ExamApplicationTests;
import com.alvis.exam.base.RestResponse;
import com.alvis.exam.controller.wx.student.KonwledgeStoreController;
import com.alvis.exam.domain.KonwledgeStore;
import com.alvis.exam.viewmodel.student.exam.KonwledgeStorePageResponseVM;
import com.github.pagehelper.PageInfo;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = ExamApplicationTests.class)
@Slf4j
public class KonwledgeTest {

    @Autowired
    private KonwledgeStoreController konwledgeStoreController;

    @Test
    public void test() {
        KonwledgeStore konwledgeStore = new KonwledgeStore();
        konwledgeStore.setUserid(188L);
        konwledgeStore.setContent("测试"+System.currentTimeMillis());
        konwledgeStoreController.addSave(konwledgeStore);

        RestResponse<PageInfo<KonwledgeStorePageResponseVM>> restResponse = konwledgeStoreController.list(konwledgeStore);
        log.info("restResponse：{}", JSON.toJSONString(restResponse));

    }
}
