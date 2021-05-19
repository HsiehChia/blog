<template>
    <div>
        <!-- 导航区 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin' }">后台管理</el-breadcrumb-item>
            <el-breadcrumb-item>账户管理</el-breadcrumb-item>
            <el-breadcrumb-item>数据统计</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图区 -->
        <el-card class="box-card">
            <div id="articleHitsChart" style="height: 300px; width:450px; float: left;"></div>
            <div id="articlePercentChart" style="height: 300px; width:500px; float: left;"></div>
            <div id="total" style="height: 300px; width:250px; float: left;">
              <h4>文章总数：{{articleTotal}}</h4>
              <h4>点击总数：{{hitsTotal}}</h4>
              <h4>用户总数：{{userTotal}}</h4>
              <h4>分类总数：{{cateTotal}}</h4>
            </div>
            <div id="cateHitsChart" style="height: 300px; width:700px; float: left;"></div>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      userList: [],
      articleList: [],
      categoryList: [],
      articleTotal: 0,
      hitsTotal: 0,
      userTotal: 0,
      cateTotal: 0,
      // 文章点击图表
      articleHitsChart: null,
      articleHitsOption: {
        title: {
          text: '文章点击率',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [],
          name: 'id',
          nameLocation: 'end'
        },
        yAxis: {
          type: 'value',
          name: '文章点击',
          nameLocation: 'end'
        },
        series: [{
          name: '点击',
          type: 'line',
          areaStyle: {},
          data: []
        }]
      },
      // 文章分类占比
      articlePercentChart: null,
      cateNum: [],
      articlePercentOption: {
        title: {
          text: '文章分类占比',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '分类名称',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1048, name: '搜索引擎' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      // 文章分类点击率
      cateHitsChart: null,
      cateHitsOption: {
        title: {
          text: '分类点击率',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [],
          name: '类名',
          nameLocation: 'end'
        },
        yAxis: {
          type: 'value',
          name: '总点击',
          nameLocation: 'end'
        },
        series: [{
          type: 'bar',
          // areaStyle: {},
          data: [],
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }]
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    // 获取所有数据
    async getData () {
      const { data, status } = await this.$http.get('/data')
      if (status !== 200) {
        this.$message.error('获取数据出错')
      } else {
        this.userList = data.userList
        this.articleList = data.articleList
        this.categoryList = data.categoryList
      }
      this.dataDeal()
    },
    // 数据处理
    dataDeal () {
      // 文章点击图表数据
      for (let i = 0; i < this.articleList.length; i++) {
        this.articleHitsOption.xAxis.data[i] = this.articleList[i].id
        this.articleHitsOption.series[0].data[i] = this.articleList[i].hits
      }
      // 获取文章点击图表
      this.articleHitsChart = this.$echarts.init(document.getElementById('articleHitsChart'))
      this.articleHitsOption && this.articleHitsChart.setOption(this.articleHitsOption)

      // 文章分类占比图表数据
      for (let i = 0; i < this.categoryList.length; i++) {
        this.cateNum[i] = {}
        this.cateNum[i].name = this.categoryList[i].name
        this.cateNum[i].num = 0
        this.cateNum[i].hits = 0
        for (let j = 0; j < this.articleList.length; j++) {
          if (this.categoryList[i].id === this.articleList[j].category_id) {
            this.cateNum[i].num += 1
            this.cateNum[i].hits += this.articleList[j].hits
          }
        }
      }
      for (let i = 0; i < this.cateNum.length; i++) {
        this.articlePercentOption.series[0].data[i] = {}
        this.articlePercentOption.series[0].data[i].name = this.cateNum[i].name
        this.articlePercentOption.series[0].data[i].value = this.cateNum[i].num
      }
      // 获取文章分类占比图表
      this.articlePercentChart = this.$echarts.init(document.getElementById('articlePercentChart'))
      this.articlePercentOption && this.articlePercentChart.setOption(this.articlePercentOption)

      // 分类点击率
      for (let i = 0; i < this.cateNum.length; i++) {
        this.cateHitsOption.xAxis.data[i] = this.cateNum[i].name
        this.cateHitsOption.series[0].data[i] = this.cateNum[i].hits
        this.hitsTotal += this.cateNum[i].hits
      }
      // 获取分类点击率图表
      this.cateHitsChart = this.$echarts.init(document.getElementById('cateHitsChart'))
      this.cateHitsOption && this.cateHitsChart.setOption(this.cateHitsOption)

      this.articleTotal = this.articleList.length
      this.userTotal = this.userList.length
      this.cateTotal = this.categoryList.length
    }
  }
}
</script>

<style lang="less" scoped>

</style>
