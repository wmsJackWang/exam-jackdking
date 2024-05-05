package com.alvis.exam.controller.student;

import com.alibaba.fastjson.JSONObject;
import com.alvis.exam.base.BaseApiController;
import com.alvis.exam.base.RestResponse;
import com.alvis.exam.domain.KonwledgeStore;
import com.alvis.exam.viewmodel.student.exam.KonwledgeStorePageResponseVM;
import com.github.pagehelper.PageInfo;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Copyright (C) 阿里巴巴
 *
 * @ClassName ProgressNoteController
 * @Description TODO
 * @Author jackdking
 * @Date 29/04/2024 4:14 下午
 * @Version 2.0
 **/
@RestController("ProgressNoteController")
@RequestMapping("/api/student/progress")
public class ProgressNoteController extends BaseApiController {

  /**
   * 查询【请填写功能名称】列表
   */
  @PostMapping("/pageList")
  @ResponseBody
  public Object list(@RequestBody KonwledgeStore konwledgeStore)
  {

    JSONObject retJson = new JSONObject();
    retJson.put("total", 20L);
    retJson.put("pages", 12);

    List<JSONObject> rows = new ArrayList<>();

    JSONObject data = new JSONObject();
    data.put("load", true);
    data.put("person", "jack"+konwledgeStore.getPageIndex());
    data.put("type", "test");
    data.put("createTime", "2024/04/29");
    rows.add(data);

    data = new JSONObject();
    data.put("load", true);
    data.put("person", "jack"+konwledgeStore.getPageIndex());
    data.put("type", "test");
    data.put("createTime", "2024/04/29");
    rows.add(data);

    data = new JSONObject();
    data.put("load", true);
    data.put("person", "jack"+konwledgeStore.getPageIndex());
    data.put("type", "test");
    data.put("createTime", "2024/04/29");
    rows.add(data);

    data = new JSONObject();
    data.put("load", true);
    data.put("person", "jack"+konwledgeStore.getPageIndex());
    data.put("type", "test");
    data.put("createTime", "2024/04/29");
    rows.add(data);

    data = new JSONObject();
    data.put("load", true);
    data.put("person", "jack"+konwledgeStore.getPageIndex());
    data.put("type", "test");
    data.put("createTime", "2024/04/29");
    rows.add(data);

    retJson.put("rows", rows);
    return retJson;
  }
}
