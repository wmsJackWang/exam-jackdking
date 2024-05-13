<template>
  <div style="margin-top: 10px" class="app-contain">
    <el-tabs tab-position="top"  v-model="tabId"  @tab-click="subjectChange" >
      <el-tab-pane :label="item.name"  :key="item.id" :name="item.id" v-for="item in subjectList" style="margin-left: 20px;" >

        <el-row style="height: 40px">
          <span style="font-size: 14px; color: rgb(96, 98, 102);"> 知识类型：</span>
          <el-radio-group v-model="queryParam.queryRoot" size="mini" @change="knowledgeClassChange" >
            <el-radio-button v-for="item in knowledgeClassList" size="mini" :key="item.id" :label="item.id">{{item.value}}</el-radio-button>
          </el-radio-group>
        </el-row>
        <el-row style="height: 40px">
          <span style="font-size: 14px; color: rgb(96, 98, 102);"> QIRC类型：</span>
          <el-radio-group v-model="knowledgeType" size="mini" @change="knowledgeTypeChange" >
            <el-radio-button v-for="item in knowledgeTypeEnum" size="mini" :key="item.key" :label="item.key">{{item.value}}</el-radio-button>
          </el-radio-group>
        </el-row>
        <el-row style="height: 40px; float: right">
          <el-button size="small" v-if="total == 0" @click="searchUpLevel()" class="el-icon-back" round> 返回上一层</el-button>
          <el-button style="margin-right: 20px" size="small" @click="handleCreate()" :disabled="requestLock" class="el-icon-circle-plus" round> 创建知识</el-button>
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
          <el-table-column prop="content" label="名称">

            <template slot-scope="scope">
              <!-- 注意：这个地方要传参数进去才能进行操作  函数名称(scope.row) -->
              <div @dblclick="handleRead(scope.row)" v-html='scope.row.content'></div>
            </template>
          </el-table-column>
          <el-table-column align="right">
            <template slot-scope="scope">
              <router-link target="_blank" style="margin-left: 10px" :to="{path:'/graph', query:{id:scope.row.id}}">
                <el-button  type="text" size="small">知识图谱</el-button>
              </router-link>
              <el-button  type="text" size="small" style="margin-left: 10px" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button  type="text" size="small" style="margin-left: 10px" @click="searchUpLevel()">上一层</el-button>
              <el-button  type="text" size="small" style="margin-left: 10px" @click="searchDownLevel(scope.row.id)">下一层</el-button>
              <el-tooltip class="item" effect="dark" content="复习完一次该知识，增加复习分" placement="top">
                <el-button  type="text" size="small" style="margin-left: 10px" @click="addReviewScore(scope.row)">复习分({{ scope.row.reviewScore }})</el-button>
              </el-tooltip>
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
    <el-dialog
      title="QIRC知识模型"
      :visible.sync="dialogVisible"
      :width="width"
      >
      <img src="@/assets/qirc.png" @load="onLoadImg">
    </el-dialog>

    <el-dialog
      title="知识类目(科目)"
      :visible.sync="dialogSubjectVisible"
    >
      <div style="padding: 10px;">
        <el-table :data="tableSubjectData" border style="width: 100%">
<!--          <el-table-column prop="date" label="id" width="180">-->
<!--            <template slot-scope="scope">-->
<!--              <el-input type="text" v-model="scope.row.date" v-show="scope.row.iseditor" />-->
<!--              <span v-show="!scope.row.iseditor" @dblclick="tableDoubleClick(scope.row, scope)">{{scope.row.date}}</span>-->
<!--            </template>-->
<!--          </el-table-column>-->
          <el-table-column prop="isPlatform" label="类目类型" width="80">
            <template slot-scope="scope">
              <el-tag type="danger" v-show = "scope.row.isPlatform">平台</el-tag>
              <el-tag type="success" v-show = "!scope.row.isPlatform">个人</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="id" label="id" width="80">
            <template slot-scope="scope">
              <span>{{scope.row.id}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="类目名称" width="180">
            <template slot-scope="scope">
              <el-input type="text" v-model="scope.row.name" v-show="scope.row.iseditor" />
              <span v-show="!scope.row.iseditor" @dblclick="tableDoubleClick(scope.row, scope)">{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="270">
            <template slot-scope="scope">
              <el-button v-show="!scope.row.iseditor && !scope.row.isPlatform" type="warning" @click="edit(scope.row, scope)">编辑</el-button>
              <el-button v-show="scope.row.iseditor" type="success" @click="save(scope.row)">保存</el-button>
              <template>
                <el-popconfirm style="margin-left: 10px" v-show="!scope.row.isPlatform" type="danger" title="这是一段内容确定删除吗？" @onConfirm="deleteRow(scope.$index, scope.row)">
                  <el-button slot="reference" type="danger">删除</el-button>
                </el-popconfirm>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-button class="mt-4" style="width: 100%" @click="onAddItem">添加类目</el-button>
    </el-dialog>
    <!-- 弹出的页面内容 -->
    <el-dialog :visible.sync="createDialogVisible">
      <el-form :model="createKnowledgeForm" :rules="rules" ref="createKnowledgeForm" label-width="100px">
        <el-form-item label="知识类目：">
          <!-- 下拉框 -->
          <el-select v-model="createKnowledgeForm.subjectId" placeholder="请选择知识类目">
            <el-option v-for="item in subjectList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <el-tooltip content="创建新的知识类目" placement="top">
            <el-button style="margin-right: 20px; margin-left: 10px" size="small" @click="dialogSubjectVisible = true"  class="el-icon-plus" circle></el-button>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="知识类型：">
          <!-- 下拉框 -->
          <el-select v-model="createKnowledgeForm.konwledgeType" placeholder="请选择知识类型">
            <el-option v-for="item in knowledgeTypeEnum" :key="item.key" :label="item.value" :value="item.key"></el-option>
          </el-select>
          <a @click="dialogVisible = true"  style="margin-right: 20px; margin-left: 10px">详情<i class="el-icon-question"></i></a>
        </el-form-item>
        <el-form-item label="简略内容">
          <el-input v-model="createKnowledgeForm.shortText" placeholder="简略内容" style="margin-top: 10px;"></el-input>
        </el-form-item>
        <el-form-item label="全部内容">

          <quill-editor
            ref="myQuillEditor"
            v-model="createKnowledgeForm.content"
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
        <el-form-item label="知识类目：">
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
        <el-form-item label="知识类目：">
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
import 'quill/dist/quill.bubble.css'

export default {
  components: { Pagination, quillEditor },
  data () {
    return {
      width: '',
      dialogVisible: false,
      dialogSubjectVisible: false,
      tableSubjectData: undefined,
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
      qirc: '@/assets/qirc.png',
      editDialogVisible: false,
      readDialogVisible: false,
      createDialogVisible: false,
      createKnowledgeForm: {
        id: undefined,
        konwledgeType: undefined,
        shortText: undefined,
        content: undefined,
        subjectId: undefined,
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
    edit (row, index) {
      row.iseditor = true
    },
    tableDoubleClick (row, index) {
      console.log('tableDoubleClick')
      if (!row.isPlatform) { // 个人类目才能编辑
        row.iseditor = true
      }
    },
    save (row, index) {
      if (row.id !== undefined) {
        console.log(row.id)
        subjectApi.update(row.id, row.name).then(res => {
          if (res.code === 1) {
            this.$message({
              message: '知识类目更新成功',
              type: 'success'
            })
          }

          // 刷新列表数据
          subjectApi.list().then(re => {
            this.subjectList = re.response
            console.log('subjectList:' + JSON.stringify(this.subjectList))

            this.tableSubjectData = []
            this.subjectList.forEach(subject => {
              this.tableSubjectData.push({
                id: subject.id,
                name: subject.name,
                iseditor: false,
                isPlatform: subject.isPlatform
              })
            })
          })
        })
        row.iseditor = false
      } else {
        subjectApi.add(row.name).then(res => {
          if (res.code === 1) {
            this.$message({
              message: '知识类目创建成功',
              type: 'success'
            })

            // 刷新列表数据
            subjectApi.list().then(re => {
              this.subjectList = re.response
              console.log('subjectList:' + JSON.stringify(this.subjectList))

              this.tableSubjectData = []
              this.subjectList.forEach(subject => {
                this.tableSubjectData.push({
                  id: subject.id,
                  name: subject.name,
                  iseditor: false,
                  isPlatform: subject.isPlatform
                })
              })
            })
          }
        })
      }
    },
    deleteRow (index, row) {
      console.log('index:' + JSON.stringify(index))
      console.log('id:' + JSON.stringify(row.id))

      this.tableSubjectData.splice(index, 1)
      if (row.id === undefined) {

      } else {
        subjectApi.remove(row.id).then(res => {
          if (res.code === 1) {
            this.$message({
              message: '知识类目创建成功',
              type: 'success'
            })

            // 刷新列表数据
            subjectApi.list().then(re => {
              this.subjectList = re.response
              console.log('subjectList:' + JSON.stringify(this.subjectList))

              this.tableSubjectData = []
              this.subjectList.forEach(subject => {
                this.tableSubjectData.push({
                  id: subject.id,
                  name: subject.name,
                  iseditor: false,
                  isPlatform: subject.isPlatform
                })
              })
            })
          } else {
            this.$message.error('创建失败')
          }
        })
      }
    },
    onAddItem () {
      this.tableSubjectData.push({
        name: '新知识类目',
        iseditor: true,
        isPlatform: false
      })
    },
    onLoadImg (e) {
      const img = e.target
      let width = 0
      console.log('width:' + img.width + ' height:' + img.height)
      if (img.fileSize > 0 || (img.width > 1 && img.height > 1)) {
        width = img.width + 40
      }
      this.width = width + 'px'
    },
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
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
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
      this.tableSubjectData = [
      ]
      subjectApi.list().then(re => {
        _this.subjectList = re.response
        console.log('subjectList:' + JSON.stringify(_this.subjectList))
        let subjectId = _this.subjectList[0].id
        _this.queryParam.subjectId = subjectId
        _this.tabId = subjectId.toString()
        _this.search()

        _this.subjectList.forEach(subject => {
          this.tableSubjectData.push({
            id: subject.id,
            name: subject.name,
            iseditor: false,
            isPlatform: subject.isPlatform
          })
        })
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
