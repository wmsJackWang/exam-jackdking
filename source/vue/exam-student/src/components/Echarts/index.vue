<template>
  <div id="chart" class="chart"></div>
</template>
<script>

var echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/graph')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  name: 'Charts',
  props: {
    chartList: {
      type: Object,
      required: true
    }
  },
  watch: {
    chartList: {
      immediate: true,
      deep: true,
      handler (val) {
        console.log('handler echarts:' + JSON.stringify(val))
        this.$nextTick(() => {
          this.formatData(val || [], true)

          /*
           * 设置节点最大id
           */
          var maxId = 0
          val.seriesData.forEach(
            (item) => {
              console.log('item:' + JSON.stringify(item))
              if (maxId < item.id) {
                maxId = item.id
              }
            }
          )
          this.maxId = maxId
          console.log('maxId:' + this.maxId)
        })
      }
    }
  },
  data () {
    return {
      maxId: undefined,
      myChart: undefined,
      seriesData: [],
      seriesLinks: [],
      categories: ['mysql'],
      lastClickId: '',
      colors: ['#a3d2ca', '#056676', '#ea2c62', '#16a596', '#03c4a1', '#f5a25d',
        '#8CD282', '#32e0c4', '#00FAE1', '#f05454']
    }
  },
  methods: {
    doubleClickNode (data, maxId) {
      console.log('maxId:' + maxId + '  调用父类方法NodeClick:' + JSON.stringify(data))
      this.$parent.doubleClickGraphNode(data, maxId)
    },
    clickNode (data, maxId) {
      console.log('maxId:' + maxId + '  调用父类方法NodeClick:' + JSON.stringify(data))
      this.$parent.clickGraphNode(data, maxId)
    },
    /**
     * 节点点击事件
     */
    async nodeClick (params) {
      console.log('maxId:' + this.maxId + '点了节点:' + JSON.stringify(params.data), 'clicked')
      this.clickNode(params.data, this.maxId)
    },
    /**
     * 节点双击事件
     */
    async nodeDoubleClick (params) {
      console.log('maxId:' + this.maxId + '双击了节点:' + JSON.stringify(params.data), 'clicked')
      this.doubleClickNode(params.data, this.maxId)
    },
    /**
     * 设置echarts配置项,重绘画布
     */
    initCharts () {
      if (!this.myChart) {
        this.myChart = echarts.init(document.getElementById('chart'))
        this.myChart.on('click', (params) => {
          console.log('params:')
          if (params.dataType === 'node') {
            // 判断点击的是图表的节点部分
            this.nodeClick(params)
          }
        })
        this.myChart.on('dblclick', (params) => {
          console.log('dblclick')
          if (params.dataType === 'node') {
            // 判断点击的是图表的节点部分
            this.nodeDoubleClick(params)
          }
        })
      }
      // 指定图表的配置项和数据
      let option = {
        // 动画更新变化时间
        animationDurationUpdate: 100,
        animationEasingUpdate: 'quinticInOut',
        tooltip: {
          // show: true
          formatter: function (params) {
            return params.data.content
          }
        },
        toolbox: {
          // 显示工具箱
          show: true,
          feature: {
            mark: {
              show: true
            },
            // // 还原
            // restore: {
            //   show: true
            // },
            // 保存为图片
            saveAsImage: {
              show: true
            }
          }
        },
        series: [
          {
            type: 'graph',
            layout: 'force',
            legendHoverLink: true, // 是否启用图例 hover(悬停) 时的联动高亮。
            hoverAnimation: true, // 是否开启鼠标悬停节点的显示动画
            focusNodeAdjacency: true,
            edgeLabel: {
              position: 'middle', // 边上的文字样式
              normal: {
                show: true,
                textStyle: {
                  fontSize: 12
                },
                position: 'middle',
                formatter: function (x) {
                  return x.data.name
                }
              }
            },
            edgeSymbol: ['', 'arrow'],
            force: {
              edgeLength: 100,
              repulsion: 300
            },
            roam: true,
            draggable: false,
            itemStyle: {
              normal: {
                color: '#00FAE1',
                cursor: 'pointer',
                // color:Math.floor(Math.random()*16777215).toString(16),
                // color: ['#fc853e','#28cad8','#9564bf','#bd407e','#28cad8','#fc853e','#e5a214'],
                label: {
                  show: true,
                  position: [-10, -15],
                  textStyle: {
                    // 标签的字体样式
                    color: '#545454', // 字体颜色
                    fontStyle: 'normal', // 文字字体的风格 'normal'标准 'italic'斜体 'oblique' 倾斜
                    fontWeight: 'bold', // 'normal'标准'bold'粗的'bolder'更粗的'lighter'更细的或100 | 200 | 300 | 400...
                    fontFamily: 'sans-serif', // 文字的字体系列
                    fontSize: 12 // 字体大小
                  }

                },
                nodeStyle: {
                  brushType: 'both',
                  borderColor: 'rgba(255,215,0,0.4)',
                  borderWidth: 1
                }
              },
              // 鼠标放上去有阴影效果
              emphasis: {
                shadowColor: '#00FAE1',
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 40

              }
            },
            lineStyle: {
              width: 2

            },
            label: {
              fontSize: 18
            },
            symbolSize: 24, // 节点大小
            links: this.seriesLinks,
            data: this.seriesData,
            categories: this.categories,
            cursor: 'pointer'
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(option)
    },
    /**
     * 格式化数据到表格需要的数据
     */
    formatData (list, reset = false) {
      const that = this
      let nodes = list.seriesData
      this.seriesData = []
      this.seriesLinks = []
      let colorIndex = 0
      let data = []
      let loadedCat = []
      nodes.forEach((item, index) => {
        if (item.categary && loadedCat.indexOf(item.categary) === -1) {
          colorIndex = Math.floor((Math.random() * that.colors.length))
          loadedCat.push(item.categary)
          this.categories.push({ name: item.categary })
        }
        item.itemStyle = {
          color: that.colors[colorIndex],
          borderColor: '#ffffff'
        }
        data.push(item)
      })
      this.seriesData.push(...data)
      this.seriesLinks.push(...list.linksData)
      this.initCharts()
    }

  },
  beforeDestroy () {
  }
}
</script>
<style scoped>
.chart {
  height: 100%;
}
</style>
