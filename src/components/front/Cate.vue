<template>
    <el-container class="container">
        <!-- 头部 -->
        <el-header>
        <Header></Header>
        </el-header>
        <!-- 主体 -->
        <el-main>
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
          <el-tab-pane
          v-for="cate in categoryList"
          :key="cate.id"
          :label="cate.name"
          :name="cate.name">

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
              <span class="articleItem-span">{{ '标题：' + article.title }}</span>
              <span>浏览次数：{{article.hits }}</span>
              <div class="articleItem-button">
                <el-button
                @click="details(article.id)"
                round type="primary">点击查看详情</el-button>
              </div>
            </div>
          </div>

          </el-tab-pane>
        </el-tabs>
        </el-main>
        <!-- 底部 -->
        <el-footer>Footer</el-footer>
    </el-container>
</template>

<script>
import Header from '@/components/front/Header.vue'

export default {
  data () {
    return {
      // 被选中的类目
      activeName: '无分类',
      // 所有类目信息
      categoryList: [],
      // 分类下的文章
      articleList: []
    }
  },
  created () {
    this.getCategoryList()
  },
  components: {
    Header
  },
  methods: {
    // 类目选中后
    handleClick (tab, event) {
      const index = Number(tab.index) + 1
      this.articleListByCateId(index)
      console.log(tab.index, event)
    },
    // 渲染类目列表
    async getCategoryList () {
      const { data, status } = await this.$http.get('/home/cate')
      if (status !== 200) {
        this.$message.error('文章加载失败')
      } else {
        this.categoryList = data.categoryList
      }
    },
    // 通过类目id获得的文章列表
    async articleListByCateId (id) {
      const { data, status } = await this.$http.get('/home/cate/' + id)
      if (status !== 200) {
        this.$message.error('文章加载失败')
      } else {
        this.articleList = data.articleListByCateId
      }
      console.log(this.articleList)
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
  }
}
</script>

<style lang="less" scoped>
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
// 文章列表
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
    line-height: 200px;
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
