<template>
  <div>
    <draggable class="main-box" v-model="dragList" :move="onMove" filter=".undraggable">
      <div v-for="(stage,index) in dragList" class="stage-item" :key="index">
        <div class="stage-header">
          <div class="title">{{stage.name}}</div>
          <div>
            <el-button v-if="stage.name == '待开始'" title="添加任务" type="primary" icon="el-icon-plus" circle size="mini" @click="addTaskDialog(index)"></el-button>
<!--            <el-button class="delstage" title="删除阶段" type="danger" icon="el-icon-delete" circle size="mini" @click="delStage(index)"></el-button>-->
          </div>
        </div>
        <draggable tag="span" class="list-group-stage" v-model="stage.list" v-bind="dragOptions" :move="onMove">
          <transition-group tag="ul" type="transition" class="list-group" :name="'flip-list'">
            <li class="list-group-item stage-header" v-for="(element,k) in stage.list" :key="element.order" ondblclick="editTask(element, k)">
              <!--                        <i :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'" @click=" element.fixed=! element.fixed" aria-hidden="true"></i>-->
              <span class="name">{{element.name}}</span>
              <span v-if="stage.name == '已完成'" class="el-icon-error close-item" @click="delTask(index,k)"></span>
            </li>
          </transition-group>
        </draggable>
      </div>
<!--      <div class="undraggable">-->
<!--        <el-button type="text" @click="addStage">添加任务阶段</el-button>-->
<!--      </div>-->

      <el-dialog title="新建任务" :visible.sync="createTaskDialogFormVisible" append-to-body>
        <el-form :model="createTaskForm">
          <el-form-item label="任务内容">
            <el-input type="textarea" placeholder="请输入任务内容" v-model="createTaskForm.content"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="createTaskDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addTask">确 定</el-button>
        </div>
      </el-dialog>
    </draggable>
  </div>

</template>

<script>

import draggable from 'vuedraggable'
import jdkTaskApi from '@/api/task'


const message = [
  "委托代理合同",
  "授权委托书",
  "风险告知书",
];
const message2 = [
  "案情摘要",
  "法律关系分析",
  "法律法规检索",
  "起诉状",
  "调查取证身份信息",
  "调查取证房产信息",
  "调查取证车辆信息",
  "查询其他档案",
  "开庭审理",
];
const message3 = [
  "领取传票",
  "提交代理词",
  "开庭审理",
  "当事人沟通",
  "与法官沟通",
  "领取裁决书",
  "缴费立案",
  "庭前阅卷",
];
const message4 = [
  "通知当事人领取裁决书并签字",
  "结案归档",

];

export default {
  name: 'vueDraggableBoard',
  data () {
    return {
      createTaskDialogFormVisible: false,
      createTaskForm: {
        index: '',
        type: '',
        content: ''
      },
      editTaskDialogFormVisible: false,
      editTaskForm: {
        element: null,
        index: ''
      },
      dragList: null,
      editable: true,
      order: 1000
    }
  },
  components: { draggable },
  computed: {
    dragOptions () {
      return {
        animation: 1,
        group: 'description',
        disabled: !this.editable,
        ghostClass: 'ghost'
      }
    },
    listString () {
      return JSON.stringify(this.dragList, null, 2)
    }
  },
  mounted () {
    // this.onEnd();

    var response = null

    jdkTaskApi.queryTaskList().then(res => {
        console.log("res:" + JSON.stringify(res))
        if (res.code === 1) {
          this.$message({
            type: 'success',
            message: '创建成功 '
          })
          const that = this

          response =  new Map(Object.entries(res.response))
          console.log('response:' + JSON.stringify(response))
          console.log('readyBegin:' + JSON.stringify(response.get('readyBegin')))
          response.forEach((value, key) => {


            console.log(`Key: ${key}, Value: ${value}`);


          });

          this.dragList =  [{
                  list: response.get('readyBegin').map((name, index) => {
                    return {
                      name,
                      order: index + 1,
                      fixed: false
                    };
                  }),
                  order: 10001,
                  name: "待开始",
                  fixed: true
                }, {
                  list: message2.map((name, index) => {
                    return {
                      name,
                      order: index + 20,
                      fixed: false
                    };
                  }),
                  order: 10003,
                  name: "调研准备中",
                  fixed: true
                }, {
                  list: message3.map((name, index) => {
                    return {
                      name,
                      order: index + 40,
                      fixed: false
                    };
                  }),
                  order: 10005,
                  name: "进行中",
                  fixed: true
                }, {
                  list: message4.map((name, index) => {
                    return {
                      name,
                      order: index + 60,
                      fixed: false
                    };
                  }),
                  order: 10007,
                  name: "待验证",
                  fixed: true
                }, {
                  list: message4.map((name, index) => {
                    return {
                      name,
                      order: index + 60,
                      fixed: false
                    };
                  }),
                  order: 10009,
                  name: "已完成",
                  fixed: true
                }]



        } else {
          this.$message({
            type: 'error',
            message: '创建失败 '
          })
        }
    })



  },
  created () {
    // this.getTaskData()

  },
  methods: {
    orderList () {
      this.list = this.list.sort((one, two) => {
        return one.order - two.order;
      })
    },
    onMove ({
      relatedContext,
      draggedContext
    }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      )
    },
    editTask (element, index) {
      this.editTaskForm.index = index
      this.editTaskForm.element = index
      this.editTaskDialogFormVisible = true
    },
    addTaskDialog (index) {
      this.createTaskForm.index = index
      this.createTaskDialogFormVisible = true
    },
    // 添加任务
    addTask () {
      var index = this.createTaskForm.index
      var order = this.order++;

      var data = {
         content: this.createTaskForm.content,
         taskType: "默认类型",
         taskStatus: 10001,
         fixed: false
      }

      jdkTaskApi.saveOrUpdateJdkTask(data).then(res => {
          console.log("res:" + JSON.stringify(res))
          if (res.code === 1) {
            this.$message({
              type: 'success',
              message: '创建成功 '
            })
            const that = this

            this.dragList[index].list.push({
              name: this.createTaskForm.content,
              order: order,
              fixed: false
            })
            this.createTaskDialogFormVisible = false;
          } else {
            this.$message({
              type: 'error',
              message: '创建失败 '
            })
          }
          this.getList()
      })

    },
    // 删除任务
    delTask (index, k) {
      this.dragList[index].list.splice(k, 1);
    },
    // 添加任务阶段
    addStage () {
      var order = this.order++;
      this.dragList.push({
        'list': [],
        'order': order,
        'name': "新增任务阶段" + order,
        'fixed': false
      });
    },
    // 删除任务阶段
    delStage (index) {
      this.dragList.splice(index, 1);
    }
  }
};
</script>

  <style lang="less" scoped>
h3 {
  padding: 12px 0;
  font-size: 16px;
  text-align: center;
  background-color: #6593aa;
  color: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.task-kanban {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 10px;

  /deep/ .task-item {
    // flex-basis: 300px;
    flex-grow: 0;
    background: #6593aa;
    border-radius: 10px;
    width: 15%;
    .task-type {
      padding: 4px;
      margin: 4px;
      background: #e3e9ec;
    }
    .task-flag {
      display: flex;
      flex-direction: row;
      .h3-title {
        flex-grow: 1;
      }
      .add-task {
        flex-grow: 0;
        padding: 10px;
        margin-right: 15px;
      }
    }
  }
}
li {
  height: 80px;
  // padding-top: 3px;
  background: #b1dcf1;
  border: 1px solid rgb(241, 224, 224);
  border-radius: 5px;
  margin-top: 5px;
}
.task-item-li {
  display: flex;
  flex-direction: column;
  .task-header {
    display: flex;
    flex-direction: row;
    .task-no {
      flex-grow: 1;
    }
    .task-executer {
      flex-grow: 1;
    }
  }
  .task-content {
    display: flex;
    flex-direction: row;
    .priority-flag {
      flex-grow: 1;
    }
    .task-title {
      flex-grow: 4;
    }
  }
  .task-bottom {
    display: flex;
    flex-direction: row;
    .start-date {
      flex-grow: 0;
    }
    .middle-date {
      flex-grow: 0;
    }
    .end_date {
      flex-grow: 0;
    }
  }
}
//搜索框样式
.task-search {
  height: 40px;
  margin-top: 2px;
  margin-left: 50px;
  margin-right: 30px;
  margin-bottom: 5px;
  padding: 10px;
  background: #fff;
  border-radius: 10px;
  .el-form {
    margin-top: 5px;
    /deep/ .el-form-item__label {
      font-size: 14px;
      font-weight: bold;
      color: #000;
    }
  }
}

div::-webkit-scrollbar {
    width: 10px;
    height: 10px;
}

div::-webkit-scrollbar-track {
    background: rgb(239, 239, 239);
    border-radius: 2px;
}

div::-webkit-scrollbar-thumb {
    background: #bfbfbf;
    border-radius: 10px;
}

div::-webkit-scrollbar-thumb:hover {
    background: #888;
}

div::-webkit-scrollbar-corner {
    background: #179a16;
}

.main-box {
    overflow-y: hidden;
    overflow-x: auto;
    white-space: nowrap;
    box-sizing: border-box;
    position: relative;
    height: 95%;
    width: 100%;
    padding: 10px;
    background-color: #fff;
}

.flip-list-move {
    transition: transform 0.5s;
}

.no-move {
    transition: transform 0s;
}

.ghost {
    opacity: 0.4;
    background: #c8ebfb;
    border: 1px dashed #ccc
}

.stage-header {
    margin: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: move;
}

.stage-header .name {
    white-space: normal;
    width: 220px;
    margin-left: 5px;
}

.stage-header .title {
    margin: 5px;
    font-size: 16px
}

.stage-item {
    height: 100%;
    border-radius: 4px;
    width: 300px;
    display: inline-flex;
    flex-direction: column;
    margin-right: 20px;
    align-items: stretch;
    background-color: #eee;
    box-shadow: 2px 2px 5px #d2d2d2;
}

.undraggable {
    margin-right: 20px;
    display: inline-flex;
    flex-direction: column;
    position: relative;
    top: -15px;
}

.list-group-stage {
    overflow-y: auto;
}

.list-group {
    min-height: 300px;
    margin-left: -40px;
}

.list-group-item {
    cursor: move;
    margin: 10px !important;
    background-color: #fff;
    border: none;
    border-radius: 4px;
    box-shadow: 2px 2px 5px #d2d2d2;
}

.list-group-item i {
    cursor: pointer;
}

.close-item {
    font-size: 20px;
    cursor: pointer;
    color: #aaa;
    display: none
}

.delstage {
    display: none;
}

.stage-item:hover .delstage {
    display: inline-block;
}

.list-group-item:hover .close-item {
    display: block;
}

</style>
