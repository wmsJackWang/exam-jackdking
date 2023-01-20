<template>
  <Charts ref="charts" v-show="type === 2" :chartList="searchList" />
</template>

<script>
import Charts from '@/components/Echarts'

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { Charts },
  data () {
    return {
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
      searchList: {
        'seriesData': [
          {
            id: 1,
            name: 'mysql',
            categary: '1',
            symbolSize: 60
          },
          {
            id: 2,
            name: 'innodb',
            categary: '1',
            symbolSize: 40
          },
          {
            id: 3,
            name: '索引',
            categary: '2'
          },
          {
            id: 4,
            name: '事务',
            categary: ''
          },
          {
            id: 7,
            name: '间隙锁',
            categary: ''
          },
          {
            id: 5,
            name: 'B-树',
            categary: ''
          },
          {
            id: 6,
            name: 'B+树',
            categary: '2'
          },
          {
            id: 8,
            name: '范围锁',
            categary: ''
          },
          {
            id: 9,
            name: '行锁',
            categary: ''
          },
          {
            id: 10,
            name: '意向锁',
            categary: ''
          }
        ],
        'linksData': [
          {
            source: '2',
            target: '3',
            name: 'Q'
          },
          {
            source: '3',
            target: '4',
            name: ''
          },
          {
            source: '3',
            target: '5',
            name: ''
          },
          {
            source: '5',
            target: '6',
            name: ''
          },
          {
            source: '5',
            target: '7',
            name: ''
          },
          {
            source: '5',
            target: '8',
            name: ''
          },
          {
            source: '9',
            target: '10',
            name: ''
          },
          {
            source: '10',
            target: '9',
            name: ''
          },
          {
            source: '1',
            target: '2',
            name: ''
          },
          {
            source: '1',
            target: '10',
            name: ''
          }

        ]
      }
    }
  },
  created () {
  },
  methods: {
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
