<template>
    <el-container class="container">
        <!-- 头部 -->
        <el-header>
        <Header></Header>
        </el-header>
        <!-- 主体 -->
        <el-main>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="Web前端" name="first">
              <div class="articleList">
                <div class="articleItem">Web前端</div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="MySql" name="second">
              <div class="articleList">
                <div class="articleItem">MySql</div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="NodeJS" name="third">
              <div class="articleList">
                <div class="articleItem">NodeJS</div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="Express" name="fourth">
              <div class="articleList">
                <div class="articleItem">Express</div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-main>
        <!-- 底部 -->
        <el-footer>Footer</el-footer>
    </el-container>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  data () {
    return {
      // 被选中的类目
      activeName: 'first',
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
    // 类目选中后
    handleClick (tab, event) {
      console.log(tab, event)
    },
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
// 文章列表
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
