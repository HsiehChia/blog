<template>
  <el-container class="container">
    <!-- 头部 -->
    <el-header>
      <Header></Header>
    </el-header>
    <!-- 主体 -->
    <el-main>
      <!-- 热门推荐 -->
      <el-carousel :interval="2000" type="card" arrow="always">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
      <!-- 分割线 -->
      <el-divider>
        <i class="el-icon-sunrise"></i>
        <i class="el-icon-sunrise-1"></i>
        <i class="el-icon-sunny"></i>
        <i class="el-icon-sunrise-1"></i>
        <i class="el-icon-sunrise"></i>
      </el-divider>
      <!-- 最新文章列表 -->
      <div class="articleList">
        <div class="articleItem"></div>
      </div>
    </el-main>
    <!-- 底部 -->
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  name: 'Home',
  data () {
    return {
      // 所有文章信息
      articleList: []
    }
  },
  created () {
    this.getArticleList()
  },
  methods: {
    async getArticleList () {
      const { data, status } = await this.$http.get('/article')
      if (status !== 200) {
        this.$message.console.error('文章加载失败')
      } else {
        this.articleList = data
        console.log(data)
      }
    }
  },
  components: {
    Header
  }
}
</script>
<style lang="less" scoped>
// 页面主体
.container {
  height: 100%;
}
.el-header, .el-footer {
  background-color: #18966a;
  color: #fff;
  line-height: 60px;
}
.el-footer{
  text-align: center;
}
.el-main {
  background-color: #fff;
  color: #333;
}
// 热门推荐
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  // 最新文章
  .articleList {
    width: 100%;
    // background-color: #d3dce6;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
  }
  .articleItem{
    width: 23%;
    height: 300px;
    background-color: #99a9bf;
    margin-bottom: 20px;
    border-radius: 5px;
    transition: all 0.3s ease-in-out 0.2s;
  }
  .articleItem:hover {
    cursor: pointer;
    transform: translate3d(-4px, -4px ,0);
    box-shadow: 5px 5px 10px 2px #d1d1d1;
  }
</style>
