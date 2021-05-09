<template>
  <el-container class="container">
    <!-- 侧边栏 -->
    <el-aside width="280px">
      <Aside></Aside>
    </el-aside>
    <el-container>
      <!-- 头部 -->
      <el-header>
        <el-row>
          <el-col :span="22">
            <div class="grid-content">
              <el-button @click="goBack" icon="el-icon-s-home" round>返回首页</el-button>
                欢迎管理员{{username}}登录管理系统
            </div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content">
              <el-button plain @click="logout">退出</el-button>
            </div>
            </el-col>
        </el-row>
      </el-header>
      <!-- 主体 -->
      <el-main>
        <ArticleList></ArticleList>
      </el-main>
      <!-- 底部 -->
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script>
import Aside from '@/components/Aside.vue'
import ArticleList from '@/components/ArticleList.vue'

export default {
  data () {
    return {
      username: window.sessionStorage.getItem('username')
    }
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    goBack () {
      this.$router.push('/home')
    }
  },
  components: {
    Aside,
    ArticleList
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
}
.el-aside {
  background-color: #146649;
  color: #fff;
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
</style>
