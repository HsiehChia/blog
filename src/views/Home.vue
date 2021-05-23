<template>
  <el-container class="container">
    <!-- 头部 -->
    <el-header>
      <Header></Header>
    </el-header>
    <!-- 主体 -->
    <el-main>
      <!-- 热门推荐 -->
      <el-carousel :interval="200000" type="card" arrow="always">
        <el-carousel-item v-for="item in hotArticleList" :key="item.id">
          <div class="hot-item">
          <h3 class="hot-title">{{ item.title }}</h3>
          <el-image
          class="hot-img"
          :src="getThumbnail(item.thumbnail)">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline articleItem-i"></i>
            </div>
          </el-image>
          </div>
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
        <div class="articleItem"
        v-for="article in articleList"
        :key="article.id">
          <el-image
          style="width: 100%; height: 200px"
          fits="cover"
          :src="getThumbnail(article.thumbnail)">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline articleItem-i"></i>
            </div>
          </el-image>
          <span class="articleItem-span">{{ '标题：' + article.title }}</span><br/>
          <span>浏览次数：{{article.hits }}</span>
          <div class="articleItem-button">
            <el-button
            @click="details(article.id)"
            round type="primary">点击查看详情</el-button>
          </div>
        </div>
      </div>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="p"
        :page-size="pageNum"
        layout="total, prev, pager, next, jumper"
        :total="articleTotal">
      </el-pagination>
    </el-main>
    <!-- 底部 -->
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
import Header from '@/components/front/Header.vue'

export default {
  name: 'Home',
  data () {
    return {
      // 所有文章信息
      articleList: [],
      // 用户数据总数
      articleTotal: 0,
      // 页面总数
      pageNum: 10,
      num: 10,
      // 当前页面
      p: 2,
      // 热门文章列表
      hotArticleList: [],
      // 查询数据
      queryInfo: {
        query: '1'
      }
    }
  },
  created () {
    this.getArticleList()
    this.getHotArticleList()
    this.reloadPage()
  },
  mounted () {
    this.reloadPage()
  },
  methods: {
    // 强制刷新当前页
    reloadPage () {
      if (window.sessionStorage.getItem('activePath') === 'home') {
        location.reload()
        window.sessionStorage.setItem('activePath', '')
      }
    },
    // 获取所有文章
    async getArticleList (query) {
      query = '?p=' + this.queryInfo.query
      const { data, status } = await this.$http.get('/home/index' + query)
      if (status !== 200) {
        this.$message.console.error('文章加载失败')
      } else {
        this.hotArticleList = data.page.hotArticleList
        this.pageNum = data.page.pageNum
        this.articleTotal = data.page.articleTotal
        this.p = Number(data.page.p)
        this.articleList = data.page.articlePageList
      }
    },
    // 获取所有热门文章
    async getHotArticleList () {
      const { data, status } = await this.$http.get('/home/index/hot')
      if (status !== 200) {
        this.$message.console.error('文章加载失败')
      } else {
        this.hotArticleList = data.hotArticleList
      }
    },
    // 监听page-size改变
    handleSizeChange (size) {
      console.log(`每页 ${size} 条`)
    },
    // 监听current-page.sync改变
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.queryInfo.query = val
      this.getArticleList()
    },
    // 设置显示图片
    getThumbnail (thumbnail) {
      try {
        return require('@/assets/upload/' + thumbnail)
      } catch (e) {
        return ''
      }
    },
    // 查看文章详情
    details (id) {
      window.sessionStorage.setItem('pageArticleId', id)
      this.$router.push('/detail')
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
  .hot-item {
    padding: 0;
    width: 100%;
    height: 300px;
    position: relative;
  }
  .hot-img {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 230px;
  }
  .hot-item h3{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 70px;
    line-height: 70px;
    padding: 0 50px;
    color: #333;
    margin: 0;
    background-color: #d1d1d1;
  }
  .image-slot {
    width: 100%;
    height: 230px;
    line-height: 230px;
  }
  // 最新文章
  .articleList {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
  }
  .articleItem{
    width: 23%;
    height: 300px;
    border: 1px solid #ccc;
    margin: 20px 10px;
    border-radius: 5px;
    transition: all 0.2s ease-in-out 0.1s;
    position: relative;
  }
  .articleItem:hover {
    transform: translate3d(-2px, -2px ,0);
    box-shadow: 3px 3px 15px 2px #d1d1d1;
  }
  .articleItem-i {
    display: block;
    text-align: center;
    line-height: 270px;
    background-color: #eee;
  }
  .articleItem-span {
    padding: 0 3px;
  }
  .articleItem-button {
    position: absolute;
    bottom: 5px;
    right: 5px;
  }
</style>
