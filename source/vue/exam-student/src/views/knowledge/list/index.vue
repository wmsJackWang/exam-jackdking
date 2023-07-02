<template>
  <div style="margin-top: 10px" class="app-contain">
    <el-tabs tab-position="left"  v-model="tabId"  @tab-click="subjectChange" >
      <el-tab-pane :label="item.name"  :key="item.id" :name="item.id" v-for="item in subjectList" style="margin-left: 20px;" >

        <el-radio-group v-model="queryParam.queryRoot" size="mini" @change="knowledgeClassChange" >
          <el-radio v-for="item in knowledgeClassList" size="mini" :key="item.id" :label="item.id">{{item.value}}</el-radio>
        </el-radio-group>
        <el-row  style="float: right">
          <el-button size="small" v-if="total == 0" @click="searchUpLevel()">返回</el-button>
          <el-button  type="primary" style="margin-right: 20px" size="small" @click="handleCreate()" :disabled="requestLock">创建知识</el-button>
          <el-radio-group v-model="knowledgeType" size="mini" @change="knowledgeTypeChange" >
            <el-radio v-for="item in knowledgeTypeEnum" size="mini" :key="item.key" :label="item.key">{{item.value}}</el-radio>
          </el-radio-group>
        </el-row>
        <el-table v-loading="listLoading" :data="tableData" fit highlight-current-row style="width: 100%">
          <el-table-column prop="id" label="序号" width="90px"/>
          <el-table-column prop="konwledgeType" label="类型" width="90px"/>
          <el-table-column prop="shortText" label="简称" width="90px">
            <template slot-scope="scope">
              <!-- 注意：这个地方要传参数进去才能进行操作  函数名称(scope.row) -->
              <div @click="handleRead(scope.row)">{{ scope.row.shortText }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="content" label="名称"  />
          <el-table-column align="right">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="复习完一次该知识，增加复习分" placement="top">
                <el-button  type="text" size="small" style="margin-left: 10px" @click="addReviewScore(scope.row)">复习分({{ scope.row.reviewScore }})</el-button>
              </el-tooltip>
              <el-button  type="text" size="small" style="margin-left: 10px" @click="searchUpLevel()">上层</el-button>
              <el-button  type="text" size="small" style="margin-left: 10px" @click="searchDownLevel(scope.row.id)">下层</el-button>
              <router-link target="_blank" style="margin-left: 10px" :to="{path:'/graph', query:{id:scope.row.id}}">
                <el-button  type="text" size="small">查看图谱</el-button>
              </router-link>
              <el-button  type="text" size="small" style="margin-left: 10px" @click="handleEdit(scope.row)">编辑</el-button>
              <el-tooltip class="item" effect="dark" content="知识设置为已检测，已经做过这知识的题型" placement="top">
                <el-button  type="text" size="small" style="margin-left: 10px" @click="searchUpLevel(scope.row)">检测状态({{ scope.row.isChecked==1? "已检测" : "未检测" }})</el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :background="false" :page.sync="queryParam.pageIndex" :limit.sync="queryParam.pageSize"
                    @pagination="search" style="margin-top: 20px"/>
      </el-tab-pane>
    </el-tabs>

    <!-- 弹出的页面内容 -->
    <el-dialog :visible.sync="createDialogVisible">
      <el-form :model="createKnowledgeForm" :rules="rules" ref="createKnowledgeForm" label-width="100px">
        <el-form-item label="知识：">
          <!-- 下拉框 -->
          <el-select v-model="createKnowledgeForm.konwledgeType" placeholder="请选择">
            <el-option v-for="item in knowledgeTypeEnum" :key="item.key" :label="item.value" :value="item.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="简略内容">
          <el-input v-model="createKnowledgeForm.shortText" placeholder="简略内容" style="margin-top: 10px;"></el-input>
        </el-form-item>
        <el-form-item label="全部内容">

          <quill-editor
            ref="myQuillEditor"
            v-model="knowledgeForm.content"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)"
          />
        </el-form-item>
        <el-form-item label="知识画板">
          <a href="https://bittechblog.com/excalidraw/index.html" target="_blank">跳转到画板</a>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirmCreate('createKnowledgeForm')" style="float:right">确定</el-button>
        </el-form-item>

      </el-form>
    </el-dialog>

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
          <quill-editor
            ref="myQuillEditor"
            v-model="knowledgeForm.content"
            :options="editorOption"
          />
        </el-form-item>
        <el-form-item label="知识画板">
          <a href="https://bittechblog.com/excalidraw/index.html" target="_blank">跳转到画板</a>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirmUpdate('knowledgeForm')" style="float:right">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 弹出的页面内容 -->
    <el-dialog :visible.sync="readDialogVisible">
      <el-form :model="knowledgeForm" :rules="rules" ref="knowledgeForm" label-width="100px">
        <el-form-item label="知识：">
          <!-- 下拉框 -->
          <el-select v-model="knowledgeForm.konwledgeType" placeholder="请选择" :disabled="true">
            <el-option v-for="item in knowledgeTypeEnum" :key="item.key" :label="item.value" :value="item.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="简略内容">
          <el-input v-model="knowledgeForm.shortText" placeholder="简略内容" style="margin-top: 10px;" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="全部内容">
          <quill-editor
            ref="myQuillEditor"
            v-model="knowledgeForm.content"
            :options="editorOption"
          />
        </el-form-item>
        <el-form-item label="知识画板">
          <a href="https://bittechblog.com/excalidraw/index.html" target="_blank">跳转到画板</a>
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
import { quillEditor } from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // 引入样式
import 'quill/dist/quill.snow.css' // snow theme
import 'quill/dist/quill.bubble.css' // bubble theme

export default {
  components: { Pagination, quillEditor },
  data () {
    return {
      pageKnowledgeStack: [],
      knowledgeClassList: [
        {
          id: 1,
          value: '非根知识'
        },
        {
          id: 2,
          value: '根知识'
        },
        {
          id: 3,
          value: '所有'
        }
      ],
      requestLock: false,
      knowledgeForm: {
        id: undefined,
        konwledgeType: undefined,
        shortText: undefined,
        content: undefined,
        isChecked: undefined,
        reviewScore: undefined
      },
      editDialogVisible: false,
      readDialogVisible: false,
      createDialogVisible: false,
      createKnowledgeForm: {
        id: undefined,
        konwledgeType: undefined,
        shortText: undefined,
        content: undefined,
        parentKonwledgeId: undefined
      },
      knowledgeType: 'A',
      queryParam: {
        queryRoot: 1,
        parentKonwledgeId: undefined,
        konwledgeType: undefined,
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
    this.queryParam.parentKonwledgeId = this.$route.query.id
    console.log('parentKonwledgeId:' + this.queryParam.parentKonwledgeId)
    if (this.queryParam.parentKonwledgeId !== undefined) {
      this.queryParam.konwledgeType = undefined
    }
    this.initSubject()
  },
  methods: {
    handleRead (row) {
      this.readDialogVisible = true
      console.log('row:' + JSON.stringify(row))
      this.knowledgeForm = Object.assign({}, row)
      console.log('knowledgeForm:' + JSON.stringify(this.knowledgeForm))
      this.knowledgeForm.konwledgeType = row.konwledgeType

      this.$nextTick(() => {
        this.$refs['knowledgeForm'].clearValidate()
      })
    },
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
    handleCreate () {
      this.createDialogVisible = true
      this.$nextTick(() => {
        this.$refs['createKnowledgeForm'].clearValidate()
      })
    },
    searchDownLevel (id) {
      let param = {}
      param.parentKonwledgeId = this.queryParam.parentKonwledgeId
      param.queryRoot = this.queryParam.queryRoot
      param.knowledgeType = this.knowledgeType
      this.pageKnowledgeStack.push(param)

      this.queryParam.parentKonwledgeId = id
      this.queryParam.queryRoot = 3
      this.knowledgeType = 'A'
      this.queryParam.konwledgeType = 'A'
      this.search()
    },
    searchUpLevel () {
      this.queryParam.queryRoot = 3
      if (this.pageKnowledgeStack.length === 0) {
        this.queryParam.parentKonwledgeId = undefined
        this.queryParam.konwledgeType = 'A'
        this.queryParam.queryRoot = 3
      } else {
        let param = this.pageKnowledgeStack.pop()
        console.log('param:' + JSON.stringify(param))
        this.queryParam.parentKonwledgeId = param.parentKonwledgeId
        this.queryParam.konwledgeType = param.konwledgeType
        this.konwledgeType = param.konwledgeType
        this.queryParam.queryRoot = param.queryRoot
      }
      this.search()
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
      if (this.knowledgeType === 'A') {
        this.queryParam.konwledgeType = undefined
      } else {
        this.queryParam.konwledgeType = this.knowledgeType
      }
      this.listLoading = true
      console.log('this.queryParam:' + JSON.stringify(this.queryParam))
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
    knowledgeClassChange (val) {
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
            this.search()
          }).catch(response => {
            this.$notify.error({
              title: '更新失败',
              message: response.data.errmsg
            })
          })
        }
      })
    },
    addReviewScore (row) {
      console.log('row:' + JSON.stringify(row))
      this.knowledgeForm = Object.assign({}, row)
      console.log('knowledgeForm:' + JSON.stringify(this.knowledgeForm))
      this.knowledgeForm.konwledgeType = row.konwledgeType
      this.knowledgeForm.reviewScore = this.knowledgeForm.reviewScore + 1
      knowledgeApi.update(this.knowledgeForm).then(response => {
        this.editDialogVisible = false
        this.$notify.success({
          title: '成功',
          message: '更新成功'
        })
        this.search()
      }).catch(response => {
        this.$notify.error({
          title: '更新失败',
          message: response.data.errmsg
        })
      })
    },
    confirmCreate () {
      this.requestLock = true
      this.createKnowledgeForm.parentKonwledgeId = this.queryParam.parentKonwledgeId
      this.$refs['createKnowledgeForm'].validate((valid) => {
        if (valid) {
          knowledgeApi.create(this.createKnowledgeForm).then(response => {
            this.createDialogVisible = false
            this.$notify.success({
              title: '成功',
              message: '创建成功'
            })
            this.search()
            this.requestLock = false
          }).catch(response => {
            this.$notify.error({
              title: '创建失败',
              message: response.data.errmsg
            })
            this.requestLock = false
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
