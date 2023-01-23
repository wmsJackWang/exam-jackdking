<template>
  <div style="margin-top: 10px" class="app-contain">
    <el-tabs tab-position="left"  v-model="tabId"  @tab-click="subjectChange" >
      <el-tab-pane :label="item.name"  :key="item.id" :name="item.id" v-for="item in subjectList" style="margin-left: 20px;" >
        <el-row  style="float: right">
          <el-radio-group v-model="queryParam.konwledgeType" size="mini" @change="knowledgeTypeChange" >
            <el-radio v-for="item in knowledgeTypeEnum" size="mini" :key="item.key" :label="item.key">{{item.value}}</el-radio>
          </el-radio-group>
        </el-row>
        <el-table v-loading="listLoading" :data="tableData" fit highlight-current-row style="width: 100%">
          <el-table-column prop="id" label="序号" width="90px"/>
          <el-table-column prop="konwledgeType" label="类型" width="90px"/>
          <el-table-column prop="shortText" label="简称" width="90px"/>
          <el-table-column prop="content" label="名称"  />
          <el-table-column align="right">
            <template slot-scope="scope">
              <router-link target="_blank" :to="{path:'/do',query:{id:scope.row.id}}">
                <el-button  type="text" size="small">查看图谱</el-button>
              </router-link>
              <el-button  type="text" size="small" style="margin-left: 10px" @click="handleEdit(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :background="false" :page.sync="queryParam.pageIndex" :limit.sync="queryParam.pageSize"
                    @pagination="search" style="margin-top: 20px"/>
      </el-tab-pane>
    </el-tabs>

    <!-- 弹出的页面内容 -->
    <el-dialog :visible.sync="editDialogVisible">
      <el-form :model="knowledgeForm" :rules="rules" ref="knowledgeForm" label-width="100px">
        <el-form-item label="知识：">
          <!-- 下拉框 -->
          <el-select v-model="knowledgeForm.konwledgeType" placeholder="请选择">
            <el-option v-for="item in knowledgeTypeEnum" :key="item.key" :label="item.value" :value="item.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="简略内容">
          <el-input v-model="knowledgeForm.shortText" placeholder="简略内容" style="margin-top: 10px;"></el-input>
        </el-form-item>
        <el-form-item label="全部内容">
            <el-input type="textarea" v-model="knowledgeForm.content" ref="myQuillEditor" rows="10"></el-input>
<!--            <quill-editor v-model="knowledgeForm.content" ref="myQuillEditor" style="height: 500px;" :options="editorOption">-->
<!--            </quill-editor>-->
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirmUpdate('knowledgeForm')" style="float:right">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Pagination from '@/components/Pagination'
import knowledgeApi from '@/api/knowledge/knowledge'
import subjectApi from '@/api/subject'

export default {
  components: { Pagination },
  data () {
    return {
      knowledgeForm: {
        id: undefined,
        konwledgeType: undefined,
        shortText: undefined,
        content: undefined
      },
      editDialogVisible: false,
      queryParam: {
        konwledgeType: 'Q',
        subjectId: 0,
        pageIndex: 1,
        pageSize: 10
      },
      tabId: '',
      listLoading: true,
      subjectList: [],
      tableData: [],
      total: 0,
      rules: {
      }
    }
  },
  created () {
    this.initSubject()
  },
  methods: {
    handleEdit (row) {
      this.editDialogVisible = true
      console.log('row:' + JSON.stringify(row))
      this.knowledgeForm = Object.assign({}, row)
      console.log('knowledgeForm:' + JSON.stringify(this.knowledgeForm))
      this.knowledgeForm.konwledgeType = row.konwledgeType

      this.$nextTick(() => {
        this.$refs['knowledgeForm'].clearValidate()
      })
    },
    initSubject () {
      let _this = this
      subjectApi.list().then(re => {
        _this.subjectList = re.response
        let subjectId = _this.subjectList[0].id
        _this.queryParam.subjectId = subjectId
        _this.tabId = subjectId.toString()
        _this.search()
      })
    },
    search () {
      this.listLoading = true
      knowledgeApi.pageList(this.queryParam).then(data => {
        const re = data.response.page
        this.tableData = re.list
        console.log('data:' + JSON.stringify(data))
        console.log('tableData:' + JSON.stringify(this.tableData))
        this.total = re.total
        this.queryParam.pageIndex = re.pageNum
        this.listLoading = false
      })
    },
    knowledgeTypeChange (val) {
      this.search()
    },
    subjectChange (tab, event) {
      this.queryParam.subjectId = Number(this.tabId)
      this.search()
    },
    confirmUpdate () {
      this.$refs['knowledgeForm'].validate((valid) => {
        if (valid) {
          knowledgeApi.update(this.knowledgeForm).then(response => {
            this.editDialogVisible = false
            this.$notify.success({
              title: '成功',
              message: '更新成功'
            })
            this.getList()
          }).catch(response => {
            this.$notify.error({
              title: '更新失败',
              message: response.data.errmsg
            })
          })
        }
      })
    }
  },
  computed: {
    ...mapState('enumItem', {
      knowledgeTypeEnum: state => state.knowledge.knowledgeTypeEnum
    })
  }
}
</script>
