<template>
    <el-container class="container">
        <!-- 头部 -->
        <el-header>
        <Header></Header>
        </el-header>
        <!-- 主体 -->
        <el-main>
          <el-row>
            <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="16" style="width: 100%">
              <h3>搜索结果：</h3>
            <!-- 搜索文章列表 -->
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
            </el-col>
            <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
          </el-row>
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
      // 文章列表
      articleList: []
    }
  },
  created () {
    this.getListBykeyword()
  },
  components: {
    Header
  },
  methods: {
    // 通过搜索关键词获得文章列表
    async getListBykeyword () {
      const keyword = window.sessionStorage.getItem('keyword')
      const { data, status } = await this.$http.get('/home/index/search?keyword=' + keyword)
      if (status !== 200) {
        console.log(this.$message.error('模糊搜索文章数据列表失败'))
      } else {
        this.articleList = data.articleList
      }
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
// 框架
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
