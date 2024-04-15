package com.alvis.exam.controller.student;


import com.alvis.exam.base.BaseApiController;
import com.alvis.exam.base.RestResponse;
import com.alvis.exam.domain.Subject;
import com.alvis.exam.domain.User;
import com.alvis.exam.service.SubjectService;
import com.alvis.exam.viewmodel.student.education.SubjectEditRequestVM;
import com.alvis.exam.viewmodel.student.education.SubjectVM;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController("StudentEducationController")
@RequestMapping(value = "/api/student/education")
@AllArgsConstructor
public class EducationController extends BaseApiController {

    private final SubjectService subjectService;

    @RequestMapping(value = "/subject/list", method = RequestMethod.POST)
    public RestResponse<List<SubjectVM>> list() {
        User user = getCurrentUser();
        List<Subject> subjects = subjectService.getSubjectByLevel(user.getUserLevel());
        List<SubjectVM> subjectVMS = subjects.stream().sorted(Comparator.comparing(Subject::getUserid)).map(d -> {
            SubjectVM subjectVM = modelMapper.map(d, SubjectVM.class);
            subjectVM.setId(String.valueOf(d.getId()));
            if (d.getUserid() == 2) {//2 为系统管理员id
                subjectVM.setIsPlatform(true);
            }
            return subjectVM;
        }).collect(Collectors.toList());
        return RestResponse.ok(subjectVMS);
    }

    @RequestMapping(value = "/subject/select/{id}", method = RequestMethod.POST)
    public RestResponse<SubjectEditRequestVM> select(@PathVariable Integer id) {
        Subject subject = subjectService.selectById(id);
        SubjectEditRequestVM vm = modelMapper.map(subject, SubjectEditRequestVM.class);
        return RestResponse.ok(vm);
    }

    @RequestMapping(value = "/subject/add/{name}", method = RequestMethod.POST)
    public RestResponse<SubjectEditRequestVM> add(@PathVariable String name) {

        User user = getCurrentUser();
        List<Subject> subjects = subjectService.getSubjectByLevel(user.getUserLevel());
        Optional op = subjects.stream().filter(subject -> {
            if (StringUtils.equalsIgnoreCase(subject.getName(), name)) {
                return true;
            }
            return false;
        }).findAny();
        if (op.isPresent()) {
            return RestResponse.fail("类目已存在");
        }

        Subject record = new Subject();
        record.setName(name);
        record.setLevel(1);
        record.setLevelName("1-3年");
        record.setPaperType(1);
        record.setUserid(user.getId());
        record.setDeleted(false);

        subjectService.insert(record);
        return RestResponse.ok();
    }

    @RequestMapping(value = "/subject/update/{id}/{name}", method = RequestMethod.POST)
    public RestResponse<SubjectEditRequestVM> update(@PathVariable Integer id, @PathVariable String name) {

        User user = getCurrentUser();
        Subject subject = subjectService.selectById(id);
        if (subject == null) {
            return RestResponse.fail("类目不存在");
        }
        subject.setName(name);
        subjectService.updateById(subject);
        return RestResponse.ok();
    }

    @RequestMapping(value = "/subject/remove/{id}", method = RequestMethod.POST)
    public RestResponse<SubjectEditRequestVM> remove(@PathVariable Integer id) {

        subjectService.deleteById(id);
        return RestResponse.ok();
    }

}
