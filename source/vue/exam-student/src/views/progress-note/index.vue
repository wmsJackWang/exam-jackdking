<template >
  <div id="boxTimeline" v-infinite-scroll="fnLoadMore" :infinite-scroll-distance="ovISD" style="height: 90%">
    <el-timeline id="timeline1">
      <el-timeline-item v-for="(items,index) in tableData" :key="index" :timestamp="items.createTime" placement="top">
        <el-card class="card" :style="{background:'url('+img.url+')'}">
          <div class="card_content">
            <h4 v-html="items.content"></h4>
            <p>跟进人：{{ items.person }}   跟进方式：{{items.type}}</p>
          </div>
        </el-card>
      </el-timeline-item>
      <el-timeline-item v-if="loadPage">
        <el-card ><i class="el-icon-loading"></i> 加载更多中..</el-card>
      </el-timeline-item>
    </el-timeline>
    <el-timeline id="timeline2">
      <el-timeline-item v-for="(items,index) in tableData" :key="index" :timestamp="items.createTime" placement="top">
        <el-card class="card" :style="{background:'url('+img.url+')'}">
          <h4 v-html="items.content"></h4>
          <p>跟进人：{{ items.person }}   跟进方式：{{items.type}}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
<script>
import progressAPI from '@/api/progressNote/progressNote'// 接口地址
export default {
  name: 'inc_detail_log',
  props: ['mid'],
  data () {
    return {
      img: {
        url: require('@/assets/note.jpeg'),
        name: 'bg'
      },
      loadPage: false,
      loadMore: true,
      tableData: [],
      ovISD: 0,
      orgHeight: 0,
      pagination: { pageSize: 10, current: 1, totalCount: 0, pages: 0 }
    }
  },
  mounted () {
    this.filterSearch()
  },
  methods: {
    // resRecordType (type) { return resRecordTypes(type) },
    // resTxt (text) { return resTextRN_br(text) },
    fnLoadMore () {
      if (this.loadMore && this.pagination.current < this.pagination.pages) {
        this.pagination.current++
        this.filterSearch()
      }
    },
    // 列表
    filterSearch (page) {
      if (typeof (page) === 'number') {
        this.pagination.current = page
      }
      this.fetch()
    },
    async fetch () {
      this.loadPage = true
      this.loadMore = false
      progressAPI.getProgressRecordList(this.mid, this.pagination.current, this.pagination.pageSize).then(data => {
        const pagination = { ...this.pagination }
        pagination.totalCount = data.total
        pagination.pages = data.pages
        for (let i in data.rows) {
          data.rows[i].load = false
        }
        this.tableData = this.tableData.concat(data.rows)
        // if (this.pagination.current === 1) this.moveUp()
        this.pagination = pagination
      }).finally(() => {
        this.loadPage = false
        this.loadMore = true
        var org = document.getElementById('timeline1')
        this.orgHeight = org.offsetHeight
        this.ovISD = this.orgHeight + 100
      })
    },
    moveUp () {
      var speed = 70
      var org = document.getElementById('timeline1')
      var org1 = document.getElementById('timeline2')
      var organization = document.getElementById('boxTimeline')
      function Marquee () {
        if (org1.offsetTop - organization.scrollTop <= 100) {
          // vues.methods.fnLoadMore()
          organization.scrollTop -= org.offsetHeight
        } else {
          organization.scrollTop++
        }
      }

      let MyMar = setInterval(Marquee, speed)
      organization.onmouseover = function () { clearInterval(MyMar) }
      organization.onmouseout = function () { MyMar = setInterval(Marquee, speed) }
    },
    handleSizeChange (val) {
      this.pagination = {
        pageSize: val,
        current: 1,
        totalCount: 0
      }
      this.filterSearch()
    }
  }
}
</script>

<style scoped>
#boxTimeline{overflow:auto; padding:20px; height:600px; width:60%; margin:0 auto}
#boxTimeline::-webkit-scrollbar{display: none}
p.pCnt{line-height:1.8em}
.el-timeline h4{margin-top:0; line-height:1.6em}
.card{
  width: 890px;
  height: 500px;
}
.card_content{
  margin-left: 5%;
}
</style>
