<template>

  <div style="margin-top: 10px" class="app-contain">
    <Charts ref="charts" v-loading="formLoading" v-show="type === 2" :chartList="searchList" />

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
          <el-input type="textarea" v-model="createKnowledgeForm.content" ref="myQuillEditor" rows="10"></el-input>
          <!--            <quill-editor v-model="knowledgeForm.content" ref="myQuillEditor" style="height: 500px;" :options="editorOption">-->
          <!--            </quill-editor>-->
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirmCreate('createKnowledgeForm')" style="float:right">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Charts from '@/components/Echarts'
import { mapState } from 'vuex'
import knowledgeAPI from '@/api/knowledge/knowledge'

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { Charts },
  data () {
    return {
      createKnowledgeForm: {
        id: undefined,
        konwledgeType: undefined,
        shortText: undefined,
        content: undefined,
        parentKonwledgeId: undefined
      },
      createDialogVisible: false,
      formLoading: false,
      nodeQueryParam: {
        graphDeep: 30,
        knowledgeIds: []
      },
      type: 2,
      maxId: undefined,
      queryParam: {
        pageIndex: 1,
        pageSize: 10
      },
      listLoading: false,
      tableData: [],
      total: 0,
      qAnswerLoading: false,
      selectItem: {
        questionType: 0,
        questionItem: null,
        answerItem: null
      },
      rules: {
      },
      searchList: {
        'seriesData': [],
        'linksData': []
        //
        // 'seriesData': [
        //   {
        //     id: 1,
        //     name: 'mysql',
        //     categary: '1',
        //     symbolSize: 60
        //   },
        //   {
        //     id: 2,
        //     name: 'innodb',
        //     categary: '1',
        //     symbolSize: 40
        //   },
        //   {
        //     id: 3,
        //     name: '索引',
        //     categary: '2'
        //   },
        //   {
        //     id: 4,
        //     name: '事务',
        //     categary: ''
        //   },
        //   {
        //     id: 7,
        //     name: '间隙锁',
        //     categary: ''
        //   },
        //   {
        //     id: 5,
        //     name: 'B-树',
        //     categary: ''
        //   },
        //   {
        //     id: 6,
        //     name: 'B+树',
        //     categary: '2'
        //   },
        //   {
        //     id: 8,
        //     name: '范围锁',
        //     categary: ''
        //   },
        //   {
        //     id: 9,
        //     name: '行锁',
        //     categary: ''
        //   },
        //   {
        //     id: 10,
        //     name: '意向锁',
        //     categary: ''
        //   }
        // ],
        // 'linksData': [
        //   {
        //     source: '2',
        //     target: '3',
        //     name: 'Q'
        //   },
        //   {
        //     source: '3',
        //     target: '4',
        //     name: ''
        //   },
        //   {
        //     source: '3',
        //     target: '5',
        //     name: ''
        //   },
        //   {
        //     source: '5',
        //     target: '6',
        //     name: ''
        //   },
        //   {
        //     source: '5',
        //     target: '7',
        //     name: ''
        //   },
        //   {
        //     source: '5',
        //     target: '8',
        //     name: ''
        //   },
        //   {
        //     source: '9',
        //     target: '10',
        //     name: ''
        //   },
        //   {
        //     source: '10',
        //     target: '9',
        //     name: ''
        //   },
        //   {
        //     source: '1',
        //     target: '2',
        //     name: ''
        //   },
        //   {
        //     source: '1',
        //     target: '10',
        //     name: ''
        //   }
        // ]
      }
    }
  },
  created () {
    let id = this.$route.query.id
    this.nodeQueryParam.knowledgeIds.push(id)
    let _this = this
    if (this.nodeQueryParam.knowledgeIds && this.nodeQueryParam.knowledgeIds.length !== 0) {
      _this.formLoading = true
      knowledgeAPI.knowledgeGraph(this.nodeQueryParam).then(re => {
        console.log('re:' + JSON.stringify(re))
        let response = re.response
        _this.searchList.seriesData = response.nodes
        _this.searchList.linksData = response.links
        _this.formLoading = false
      })
    }
  },
  computed: {
    ...mapState('enumItem', {
      knowledgeTypeEnum: state => state.knowledge.knowledgeTypeEnum
    })
  },
  methods: {
    handleCreate () {
      this.createDialogVisible = true
      this.$nextTick(() => {
        this.$refs['createKnowledgeForm'].clearValidate()
      })
    },
    confirmCreate () {
      this.$refs['createKnowledgeForm'].validate((valid) => {
        if (valid) {
          knowledgeAPI.create(this.createKnowledgeForm).then(response => {
            this.createDialogVisible = false
            this.$notify.success({
              title: '成功',
              message: '创建成功'
            })

            var index = response.response
            // 展示一个dialog，将要添加的数据更新到库中去。
            // 先更新到数据库，然后再更新list
            // link类型：Q  I  R  C
            // 数据类型。

            this.searchList.seriesData.push({
              id: index,
              name: this.createKnowledgeForm.shortText,
              content: this.createKnowledgeForm.content,
              symbolSize: 20
            })

            this.searchList.linksData.push(
              {
                source: '' + this.createKnowledgeForm.parentKonwledgeId,
                target: '' + index,
                name: this.createKnowledgeForm.konwledgeType
              })
          }).catch(response => {
            this.$notify.error({
              title: '创建失败',
              message: response.data.errmsg
            })
          })
        }
      })
    },
    doubleClickGraphNode (data, maxId) {
      console.log('Execute NodeDbClick:' + JSON.stringify(data) + 'maxId:' + maxId + 'this.maxId:' + this.maxId)
      this.createDialogVisible = true
      this.$nextTick(() => {
        this.$refs['createKnowledgeForm'].clearValidate()
      })
      this.createKnowledgeForm.parentKonwledgeId = data.id
      // var index = maxId + 1
      // 展示一个dialog，将要添加的数据更新到库中去。
      // 先更新到数据库，然后再更新list
      // link类型：Q  I  R  C
      // 数据类型。

      // this.searchList.seriesData.push({
      //   id: index,
      //   name: 'mysql' + index,
      //   categary: '1',
      //   symbolSize: 10
      // })
      //
      // this.searchList.linksData.push(
      //   {
      //     source: '' + data.id,
      //     target: '' + index,
      //     name: 'Q'
      //   })
    },
    clickGraphNode (data, maxId) {
      console.log('Execute NodeClick:' + JSON.stringify(data) + 'maxId:' + maxId + 'this.maxId:' + this.maxId)
    },
    sleep (n) {
      var start = new Date().getTime()
      //  console.log('休眠前：' + start);
      while (true) {
        if (new Date().getTime() - start > n) {
          break
        }
      }
      console.log('休眠后：' + new Date().getTime())
    }
  }
}
</script>
