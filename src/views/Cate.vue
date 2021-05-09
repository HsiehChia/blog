<template>
    <el-container class="container">
        <!-- 头部 -->
        <el-header>
        <Header></Header>
        </el-header>
        <!-- 主体 -->
        <el-main>Cate Main</el-main>
        <!-- 底部 -->
        <el-footer>Footer</el-footer>
    </el-container>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  data () {
    return {
    // 所有类目信息
      categoryList: []
    }
  },
  created () {
    this.getCategoryList()
  },
  components: {
    Header
  },
  methods: {
    async getCategoryList () {
      const { data, status } = await this.$http.get('/cate')
      if (status !== 200) {
        this.$message.console.error('文章加载失败')
      } else {
        this.categoryList = data
        console.log(data)
      }
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
</style>
