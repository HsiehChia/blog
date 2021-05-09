<template>
    <div>
        <div class="title">博客后台管理系统</div>
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#86ebc8"
            text-color="#333"
            active-text-color="#fff"
            @open="handleOpen"
            @close="handleClose">
            <el-menu-item index="1">
                <i class="el-icon-menu"></i>
                <span slot="title">账户管理</span>
            </el-menu-item>
            <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">用户管理</span>
            </el-menu-item>
            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>文章管理</span>
                </template>
                <el-menu-item index="3-1">发布文章</el-menu-item>
                <el-menu-item index="3-2">文章列表</el-menu-item>
            </el-submenu>
            <el-menu-item index="4">
                <i class="el-icon-menu"></i>
                <span slot="title">类目管理</span>
            </el-menu-item>
            <el-submenu index="5">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>权限管理</span>
                </template>
                <el-menu-item index="5-1">角色列表</el-menu-item>
                <el-menu-item index="5-2">权限列表</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="less" scoped>
.title {
    width: 100%;
    height: 60px;
    line-height: 60px;
    font-size: 20px;
    font-weight: 700;
    text-align: center;
}
</style>
