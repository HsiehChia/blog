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
                <el-card class="box-card">
                <div class="page-title">
                    <h2>{{pageArticle.title}}</h2>
                </div>
                <div class="page-header">
                  <span class="page-num">浏览次数：{{pageArticle.hits + 1}}</span>
                  <span class="page-time">操作时间：{{pageArticle.createTime}}</span>
                  <el-button @click="goBack"
                  class="page-back"
                  round type="primary">返回首页</el-button>
                </div>
                <div class="page-img">
                  <el-image
                  class="page-thumbnail"
                  fits="cover"
                  :src="getThumbnail(pageArticle.thumbnail)">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline articleItem-i"></i>
                    </div>
                  </el-image>
                </div>
                <div class="page-content">
                <p>{{pageArticle.content}}</p>
                </div>
                <el-card class="box-card">
                  <div v-for="msg in msgList" :key="msg.id" class="text item msg">
                    <div class="msg-header">
                      <div class="msg-name">用户：{{msg.username}}</div>
                      <div v-if="msg.role_id === 1" class="msg-tag"><el-tag type="danger"> 管理员 </el-tag></div>
                      <div class="msg-time">{{msg.createTime}}</div>
                    </div>
                    <div class="msg-content">{{'消息内容： ' + msg.msg }}</div>
                  </div>
                </el-card>
                <el-input
                  type="text"
                  clearable
                  placeholder="请输入想要评论的内容"
                  v-model="text"
                  maxlength="100"
                  show-word-limit>
                    <el-button @click="addMsg()"
                    slot="append" icon="el-icon-chat-dot-round">提交评论</el-button>
                </el-input>
                </el-card>
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
      pageArticle: {},
      // 留言信息
      msgList: {}
    }
  },
  created () {
    const pageArticleId = window.sessionStorage.getItem('pageArticleId')
    this.getArticle(pageArticleId)
    this.getMsg(pageArticleId)
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
    // 获取当前文章所有留言
    async getMsg (pageArticleId) {
      const { data, status } = await this.$http.get('/msg/articleId?article_id=' + pageArticleId)
      if (status !== 200) {
        console.log(this.$message.error('当前文章消息获取失败'))
      } else {
        this.msgList = data.msgList
      }
      console.log(this.msgList)
    },
    // 获取当前留言信息
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
    // 返回首页
    goBack () {
      this.$router.push('/home')
    },
    // 添加留言
    addMsg () {}
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
// 文章
.page-title {
  width: 100%;
  height: 60px;
  line-height: 60px;
}
.page-title h2 {
  text-align: center;
}
.page-header {
  width: 100%;
  height: 50px;
  position: relative;
}
.page-num {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(0, -50%);
}
.page-time {
  position: absolute;
  display:block;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.page-back {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(0, -50%);
}
.page-img {
  width: 100%;
  height: 200px;
  position: relative;
}
.page-thumbnail {
  width: 70%;
  height: 100%;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
}
.page-content {
  border-bottom: 1px solid #a7bbd8;
}
.msg {
  position: relative;
  margin: 0 auto;
  height: 80px;
  width: 94%;
  border-bottom: 1px solid #333;
}
.msg-header {
  width: 100%;
  height: 40px;
  line-height: 40px;
  background-color: #d6fd97;
}
.msg-name {
  position: absolute;
  left: 0;
}
.msg-tag {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.msg-time {
  position: absolute;
  right: 0;
}
.msg-content {
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  padding: 5px 3px;
  bottom: 0;
}
</style>
