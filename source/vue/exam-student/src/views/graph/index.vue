<template>

  <div style="margin-top: 10px;height:100%;width: 100%" class="app-contain">
    <div v-if="showMenu" ref="popMenu" class="position-absolute popup-menu flex flex-col">
      <div v-for="item in menuData" :key="item.key"
           class="popup-menu-item pointer flex flex-center-cz padding-left-m" :data-id="item.id"
           @click="itemClick" >{{item.name}}
      </div>
    </div>
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

    <el-dialog :visible.sync="updateDialogVisible">
      <el-form :model="updateKnowledgeForm" :rules="rules" ref="updateKnowledgeForm" label-width="100px">
        <el-form-item label="知识：">
          <!-- 下拉框 -->
          <el-select v-model="updateKnowledgeForm.konwledgeType" placeholder="请选择">
            <el-option v-for="item in knowledgeTypeEnum" :key="item.key" :label="item.value" :value="item.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="简略内容">
          <el-input v-model="updateKnowledgeForm.shortText" @input="handleInput" placeholder="简略内容" style="margin-top: 10px;"></el-input>
        </el-form-item>
        <el-form-item label="全部内容">
          <quill-editor
            ref="myQuillEditor"
            v-model="updateKnowledgeForm.content"
          />
        </el-form-item>
        <el-form-item label="知识画板">
          <a href="https://bittechblog.com/excalidraw/index.html" target="_blank">跳转到画板</a>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirmUpdate()" style="float:right">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Charts from '@/components/Echarts'
import { mapState } from 'vuex'
import knowledgeAPI from '@/api/knowledge/knowledge'
import { quillEditor } from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // 引入样式
import 'quill/dist/quill.snow.css' // snow theme
import 'quill/dist/quill.bubble.css' // bubble theme

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { Charts, quillEditor },
  data () {
    return {
      dataMap: new Map(),
      showMenu: false,
      clientX: '',
      clientY: '',
      menuData: [{ id: 'rename', name: '重命名', key: '1' }, { id: 'remove', name: '移动', key: '2' }, { id: 'delete', name: '删除', key: '3' }], // 菜单数据
      createKnowledgeForm: {
        id: undefined,
        konwledgeType: undefined,
        infotextcontentid: undefined,
        shortText: undefined,
        content: undefined,
        parentKonwledgeId: undefined
      },
      updateKnowledgeForm: {
        id: undefined,
        konwledgeType: undefined,
        infotextcontentid: undefined,
        shortText: undefined,
        content: undefined,
        parentKonwledgeId: undefined
      },
      createDialogVisible: false,
      updateDialogVisible: false,
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

        console.log('length:' + response.nodes.length)

        for (let i = 0; i < response.nodes.length; i++) {
          console.log(i + 'index' + JSON.stringify(response.nodes[i]))
          _this.dataMap.set(response.nodes[i].id + '', response.nodes[i])
        }

        console.log('map:' + JSON.stringify(_this.dataMap.size))
      })
    }
  },
  computed: {
    ...mapState('enumItem', {
      knowledgeTypeEnum: state => state.knowledge.knowledgeTypeEnum
    })
  },
  methods: {
    handleInput (e) {
      this.updateKnowledgeForm = JSON.parse(JSON.stringify(this.updateKnowledgeForm))
    },
    show (event) {
      console.log('父组件传过来的event', event)
      let x = event.offsetX // 鼠标点击的x坐标
      let y = event.offsetY // 鼠标点击的y坐标
      let menuWidth = 150// 菜单宽度，这个与.popup-menu样式对应的宽度一致
      let menuHeight = this.menuData.length * 30 + 20 // 菜单高度，根据菜单项自动计算的高度

      console.log('x:' + x + 'y:' + y)
      this.clientX = (parseFloat(x) - 10) + 'px'
      this.clientY = (parseFloat(y) + 10) + 'px'

      let windowWidth = document.documentElement.clientWidth // 实时屏幕宽度
      let windowHeight = document.documentElement.clientHeight // 实时屏幕高度

      if (parseFloat(x) + menuWidth > windowWidth) {
        this.clientX = (parseFloat(windowWidth) - menuWidth - 50) + 'px'
      }
      if (parseFloat(y) + menuHeight > windowHeight) {
        this.clientY = (parseFloat(windowHeight) - menuHeight - 50) + 'px'
      }
      console.log('1x:' + this.clientX + '  1y:' + this.clientY)
      // this.clientX = '100px'
      // this.clientY = '100px'
      this.showMenu = true
      // event.stopPropagation()// 阻止事件冒泡
      document.addEventListener('click', this.closeMenu, false)// 添加关闭事件
    },
    closeMenu () {
      console.log('销毁监听事件。')
      document.removeEventListener('click', this.closeMenu, false)// 销毁关闭事件
      this.showMenu = false
    },
    itemClick (event) {
      let id = event.target.getAttribute('data-id')// 获取菜单项id
      // this.$emit('menuClick', id)// 传参调用父组件事件，让父组件知道是点击到哪个菜单项
      alert(id)
      console.log('x: ' + event.offsetX + '  y:' + event.offsetY)
    },
    handleUpdate (row) {
      console.log('row:' + JSON.stringify(this.searchList.seriesData[0]))
      // this.map.get(row.id).name = this.map.get(row.id).name + '测试'
      console.log('row1:' + JSON.stringify(this.dataMap))

      this.updateDialogVisible = true
      console.log('row:' + JSON.stringify(row))
      this.updateKnowledgeForm = Object.assign({}, row)
      let data = Object.assign({}, row)
      this.updateKnowledgeForm.id = data.id
      this.updateKnowledgeForm.shortText = data.name
      this.updateKnowledgeForm.konwledgeType = data.knowledgeType
      this.updateKnowledgeForm.content = data.content
      console.log('knowledgeForm:' + JSON.stringify(this.knowledgeForm))
    },
    handleCreate () {
      this.createDialogVisible = true
      this.$nextTick(() => {
        this.$refs['createKnowledgeForm'].clearValidate()
      })
    },
    confirmUpdate () {
      console.log('updateKnowledgeForm:' + JSON.stringify(this.updateKnowledgeForm))
      this.$refs['updateKnowledgeForm'].validate((valid) => {
        if (valid) {
          knowledgeAPI.update(this.updateKnowledgeForm).then(response => {
            this.updateDialogVisible = false
            this.$notify.success({
              title: '成功',
              message: '更新成功'
            })
            // this.$router.go(0)
            let node = this.dataMap.get(this.updateKnowledgeForm.id + '')
            node.content = this.updateKnowledgeForm.content
            node.shortText = this.updateKnowledgeForm.shortText
            node.konwledgeType = this.updateKnowledgeForm.konwledgeType
            console.log('update node:' + JSON.stringify(node))
          }).catch(response => {
            this.$notify.error({
              title: '更新失败',
              message: response.data.errmsg
            })
          })
        }
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
    contextMenuGraphNode (data, maxId, event) {
      console.log('Execute contextmenuGraphNode:' + JSON.stringify(data) + 'maxId:' + maxId + 'this.maxId:' + this.maxId)
      console.log('x:' + event.offsetX + 'y:' + event.offsetY)
      // this.show(event) // 展示菜单
      this.handleUpdate(data)
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
<style>
.popup-menu {

  width: 150px;
  padding: 10px;
  border-radius: 10px;
  background-color:#fff;
  border-style: solid;
  border-width: 1px;
  border-color: rgba(0, 0, 0, .2);
  z-index: 999;
}

.popup-menu-item {
  height: 30px;
}
.popup-menu-item:hover {
  border-radius: 5px;
  background: rgba(0, 0, 0, .1);
}

</style>
