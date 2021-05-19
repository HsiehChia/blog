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
            <el-col :span="16">
              <div class="grid-content bg-purple-light">
                <!-- 文章标题 -->
                <h2>{{pageArticle.title}}</h2>
                <span>{{pageArticle.createTime}}</span>
                <el-button
                @click="goCate"
                round type="primary">返回分类</el-button>
                <span>浏览次数：{{pageArticle.hits + 1}}</span>
                <el-image
                style="width: 100%; height: 200px"
                fits="cover"
                :src="getThumbnail(pageArticle.thumbnail)">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline articleItem-i"></i>
                  </div>
                </el-image>
                <p>{{pageArticle.content}}</p>
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
      // 页面信息
      pageArticle: {}
    }
  },
  created () {
    const pageArticleId = window.sessionStorage.getItem('pageArticleId')
    this.getArticle(pageArticleId)
  },
  components: {
    Header
  },
  methods: {
    // 获取当前文章信息
    async getArticle (pageArticleId) {
      const { data, status } = await this.$http.get('/article/id?id=' + pageArticleId)
      if (status !== 200) {
        console.log(this.$message.error('当前文章信息获取失败'))
      } else {
        this.pageArticle = data.articleInfo[0]
      }
      this.addHits(pageArticleId)
    },
    // 当前文章点击+1
    async addHits (id) {
      const { status } = await this.$http.post('/article/addHits', { id: id })
      if (status !== 200) {
        this.$message.error('增加点击失败')
      } else {
        this.$message.success('点击+1')
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
    // 返回分类
    goCate () {
      this.$router.push('/cate')
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

// 主体
.bg-purple {
  background: #fff;
  // background: #d3dce6;
}
.bg-purple-light {
  background: #f8f9fc;
}
.grid-content {
  min-height: 36px;
}
.articleItem-i {
  display: block;
  text-align: center;
  line-height: 270px;
  background-color: #eee;
}
</style>
