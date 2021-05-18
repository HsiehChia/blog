<template>
    <el-container class="container">
        <!-- 头部 -->
        <el-header>
        <Header></Header>
        </el-header>
        <!-- 主体 -->
        <el-main>Msg Main</el-main>
        <!-- 底部 -->
        <el-footer>Footer</el-footer>
    </el-container>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  components: {
    Header
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
