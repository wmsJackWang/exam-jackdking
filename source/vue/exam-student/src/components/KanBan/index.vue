<template>
  <div class="task">
    <div class="task-search">
      <el-form :inline="true" class="task-search-form" size="mini">
        <el-form-item label="项目名称:">
          <!-- <el-select placeholder="请选择项目" clearable>
              <el-option
                v-for="item in projectList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select> -->
        </el-form-item>
      </el-form>
    </div>
    <div class="task-kanban">
      <div
        @drop="onDrop(item, index)"
        class="task-item"
        v-for="(item, index) in data"
        :key="index"
      >
        <div class="task-flag">
          <div class="h3-title">
            <h3>{{ item.name }}</h3>
          </div>
          <div class="add-task">
            <el-button type="primary" circle size="mini" @click="addTask"
              ><i class="el-icon-plus"></i
            ></el-button>
          </div>
        </div>

        <div class="task-type">
          <draggable
            class="draggable-left"
            :options="optionsLeft"
            :list="item.content"
            @end="onEnd"
            @add="onadd"
          >
            <transition-group tag="ul" class="task-item-ul">
              <li
                @dragend="ondragend(item, index)"
                v-for="element in item.content"
                :key="element.id"
              >
                <div class="task-item-li">
                  <div class="task-header">
                    <div class="task-no">#{{ element.id }}</div>
                    <div class="task-executer">{{ element.executer }}</div>
                  </div>
                  <div class="task-content">
                    <div class="priority-flag">
                      <span>{{ element.priority }}</span>
                    </div>
                    <div class="task-title">
                      <span>{{ element.title }}</span>
                    </div>
                  </div>
                  <div class="task-bottom">
                    <div class="start-date">
                      <span>{{ element.start_date }}</span>
                    </div>
                    <div class=".middle-date">
                      <span>-</span>
                    </div>
                    <div class="end-date">
                      <span>{{ element.end_date }}</span>
                    </div>
                  </div>
                </div>
              </li>
            </transition-group>
          </draggable>
          <div class="placeholder" v-if="item.content.length == 0">
            <h1>添加元素</h1>
          </div>
        </div>

        <!-- 任务阶段名称 -->
        <!-- <div><p>{{ item.name }}</p></div> -->
      </div>
      <!-- <div class="task-item-todo">
          <div class="task-flag">
            <div class="h3-todo">
              <h3>{{ data.todo.name }}</h3>
            </div>
            <div class="add-task">
              <el-button type="primary" circle size="mini" @click="addTask"
                ><i class="el-icon-plus"></i
              ></el-button>
            </div>
          </div>

          <div class="todo">
            <draggable
              class="draggable-left"
              :options="optionsLeft"
              :list="data.todo.content"
              @end="onEnd"
            >
              <transition-group tag="ul" class="task-item-ul">
                <li v-for="item in data.todo.content" :key="item.id">
                  <div class="task-item-li">
                    <div class="task-header">
                      <div class="task-no">#{{ item.id }}</div>
                      <div class="task-executer">{{ item.executer }}</div>
                    </div>
                    <div class="task-content">
                      <div class="priority-flag">
                        <span>{{ item.priority }}</span>
                      </div>
                      <div class="task-title">
                        <span>{{ item.title }}</span>
                      </div>
                    </div>
                    <div class="task-bottom">
                      <div class="start-date">
                        <span>{{ item.start_date }}</span>
                      </div>
                      <div class=".middle-date">
                        <span>-</span>
                      </div>
                      <div class="end-date">
                        <span>{{ item.end_date }}</span>
                      </div>
                    </div>
                  </div>
                </li>
              </transition-group>
            </draggable>
            <div class="placeholder" v-if="data.todo.content.length == 0">
              <h1>添加元素</h1>
            </div>
          </div>
        </div>
        <div class="task-item-doing">
          <div class="task-flag">
            <div class="h3-todo">
              <h3>{{ data.doing.name }}</h3>
            </div>
            <div class="add-task">
              <el-button type="primary" circle size="mini"
                ><i class="el-icon-plus"></i
              ></el-button>
            </div>
          </div>

          <div class="doing">
            <draggable
              class="draggable-right"
              :list="data.doing.content"
              handle=".handle"
              :options="optionsRight"
              @end="onEnd"
            >
              <transition-group tag="ul">
                <li v-for="item in data.doing.content" :key="item.id" class="handle">
                  <div class="task-item-li">
                    <div class="task-header">
                      <div class="task-no">#{{ item.id }}</div>
                      <div class="task-executer">{{ item.executer }}</div>
                    </div>
                    <div class="task-content">
                      <div class="priority-flag">
                        <span>{{ item.priority }}</span>
                      </div>
                      <div class="task-title">
                        <span>{{ item.title }}</span>
                      </div>
                    </div>
                    <div class="task-bottom">
                      <div class="start-date">
                        <span>{{ item.start_date }}</span>
                      </div>
                      <div class=".middle-date">
                        <span>-</span>
                      </div>
                      <div class="end-date">
                        <span>{{ item.end_date }}</span>
                      </div>
                    </div>
                  </div>
                </li>
              </transition-group>
            </draggable>
          </div>
        </div>
        <div class="task-item-waiting">
          <div class="task-flag">
            <div class="h3-todo">
              <h3>{{ data.waiting.name }}</h3>
            </div>
            <div class="add-task">
              <el-button type="primary" circle size="mini"
                ><i class="el-icon-plus"></i
              ></el-button>
            </div>
          </div>

          <div class="waiting">
            <draggable
              class="draggable-right"
              :list="data.waiting.content"
              handle=".handle"
              :options="optionsRight"
              @end="onEnd"
            >
              <transition-group tag="ul">
                <li v-for="item in data.waiting.content" :key="item.id" class="handle">
                  <div class="task-item-li">
                    <div class="task-header">
                      <div class="task-no">#{{ item.id }}</div>
                      <div class="task-executer">{{ item.executer }}</div>
                    </div>
                    <div class="task-content">
                      <div class="priority-flag">
                        <span>{{ item.priority }}</span>
                      </div>
                      <div class="task-title">
                        <span>{{ item.title }}</span>
                      </div>
                    </div>
                    <div class="task-bottom">
                      <div class="start-date">
                        <span>{{ item.start_date }}</span>
                      </div>
                      <div class=".middle-date">
                        <span>-</span>
                      </div>
                      <div class="end-date">
                        <span>{{ item.end_date }}</span>
                      </div>
                    </div>
                  </div>
                </li>
              </transition-group>
            </draggable>
          </div>
        </div>

        <div class="task-item-testing">
          <div class="task-flag">
            <div class="h3-todo">
              <h3>{{ data.testing.name }}</h3>
            </div>
            <div class="add-task">
              <el-button type="primary" circle size="mini"
                ><i class="el-icon-plus"></i
              ></el-button>
            </div>
          </div>

          <div class="test">
            <draggable
              class="draggable-right"
              :list="data.testing.content"
              handle=".handle"
              :options="optionsRight"
            >
              <transition-group tag="ul">
                <li v-for="item in data.testing.content" :key="item.id" class="handle">
                  <div class="task-item-li">{{ item.title }}</div>
                </li>
              </transition-group>
            </draggable>
          </div>
        </div>
        <div class="task-item-done">
          <div class="task-flag">
            <div class="h3-todo">
              <h3>{{ data.done.name }}</h3>
            </div>
            <div class="add-task">
              <el-button type="primary" circle size="mini"
                ><i class="el-icon-plus"></i
              ></el-button>
            </div>
          </div>

          <div class="done">
            <draggable
              class="draggable-done"
              :list="data.done.content"
              handle=".handle"
              :options="optionsDone"
            >
              <transition-group tag="ul">
                <li v-for="item in data.done.content" :key="item.id" class="handle">
                  <div class="task-item-li">{{ item.title }}</div>
                </li>
              </transition-group>
            </draggable>
          </div>
        </div> -->
    </div>

    <!--
todo: {
          name: "TODO",
          content: [
            {
              id: 1001,
              title: "要进行004",
              executer: "张三",
              priority: "较低",
              cstate: "未开始",
              start_date: "2023-4-17",
              end_date: "2023-4-30",
            },
          ],
        },
        doing: {
          name: "DOING",
          content: [
            {
              id: 1004,
              title: "要进行004",
              executer: "李四",
              priority: "较低",
              cstate: "未开始",
              start_date: "2023-4-17",
              end_date: "2023-4-30",
            },
            {
              id: 1005,
              title: "要进行005",
              executer: "李四",
              priority: "普通",
              state: "未开始",
              start_date: "2023-4-17",
              end_date: "2023-4-30",
            },
            {
              id: 1006,
              title: "要进行006",
              executer: "李四",
              priority: "高",
              state: "未开始",
              start_date: "2023-4-17",
              end_date: "2023-4-30",
            },
          ],
        },
        waiting: {
          name: "WaitingTest",
          content: [
            {
              id: 1234,
              title: "要进行004",
              executer: "李四",
              priority: "较低",
              cstate: "未开始",
              start_date: "2023-4-17",
              end_date: "2023-4-30",
            },
            {
              id: 1245,
              title: "要进行005",
              executer: "李四",
              priority: "普通",
              state: "未开始",
              start_date: "2023-4-17",
              end_date: "2023-4-30",
            },
            {
              id: 1222,
              title: "要进行006",
              executer: "李四",
              priority: "高",
              state: "未开始",
              start_date: "2023-4-17",
              end_date: "2023-4-30",
            },
          ],
        },
        testing: {
          name: "Testing",
          content: [
          ],
        },
        done: {
          name: "Done",
          content: [
          ],
        },

     -->
  </div>
</template>

<script>

import draggable from "vuedraggable";

export default {
  name: "kanBan",
  data() {
    return {
      //拖出源母元素下标
      ondragendIndex: "",
      //拖入母元素下标
      ondropIndex: "",
      //拖出子元素下标
      oldIndex: "",
      //拖入子元素下标
      newIndex: "",
      projectList: [],
      data: {
        todo: {
          name: "TODO",
          content: [
            {
              id: 1001,
              title: "要进行004",
              executer: "张三",
              priority: "较低",
              cstate: "未开始",
              start_date: "2023-4-17",
              end_date: "2023-4-30",
            },
          ],
        },
        doing: {
          name: "DOING",
          content: [
            {
              id: 1004,
              title: "要进行004",
              executer: "李四",
              priority: "较低",
              cstate: "未开始",
              start_date: "2023-4-17",
              end_date: "2023-4-30",
            },
          ],
        },
        waiting: {
          name: "WaitingTest",
          content: [
            {
              id: 1234,
              title: "要进行004",
              executer: "李四",
              priority: "较低",
              cstate: "未开始",
              start_date: "2023-4-17",
              end_date: "2023-4-30",
            },
          ],
        },
        testing: {
          name: "Testing",
          content: [
          ],
        },
        done: {
          name: "Done",
          content: [
          ],
        },
      },
    };
  },
  components: {
    draggable,
  },
  computed: {
    optionsLeft() {
      return {
        animation: 0,
        group: "items",
      };
    },
    optionsRight() {
      return {
        animation: 150,
        group: {
          name: "items",
        },
      };
    },
    optionsDone() {
      return {
        animation: 150,
        group: "items",
      };
    },
  },
  mounted() {
    //this.onEnd();
  },
  created() {
    this.getTaskData();
  },
  methods: {
    onEnd(e) {
      console.log("end:");
    },
    //监听滑动添加时
    onadd(e) {
      // console.log("add",this.data.this.ondragendIndex);
      this.oldIndex = e.oldIndex;
      this.newIndex = e.newIndex;
      console.log("老坐标:", this.oldIndex);
      console.log("新坐标:", this.newIndex);
      console.log("目标位置:", this.ondropIndex);
      console.log(
        "移动的数据是:",
        this.data[this.ondropIndex].content[this.newIndex]
      );
    },
    //完成母元素拖放后触发,经测试发现此函数可以不使用，不影响数据的移动操作
    ondragend(item, index) {
      // console.log("index=>", index);
      // this.ondragendIndex = index;
      // console.log("母元素拖放完毕", this.ondragendIndex);
    },
    //监听源母元素拖动下标
    onDrop(element, index) {
      this.ondropIndex = index;
      console.log("拖动元素到目标母元素的下标:", this.ondropIndex);
    },
    //添加任务
    addTask() {
      console.log("添加任务数据");
      let newTask = {
        id: 10032,
        title: "中台手工导入短信测试",
        executer: "方刚",
        priority: "普通",
        cstate: "未开始",
        start_date: "2023-4-17",
        end_date: "2023-4-30",
      };
      this.data.todo.content.push(newTask);
    },
    //查询任务数据
    getTaskData() {
      let params = {
        projectId: 1,
      };
      this.$api.get_task(params).then((res) => {
        console.log("任务数据：", res);
      });
    },
  },
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
</style>

