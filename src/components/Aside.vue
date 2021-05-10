<template>
    <div>
        <div class="title">博客后台管理系统</div>
        <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            background-color="#86ebc8"
            text-color="#333"
            active-text-color="#fff"
            unique-opened
            @open="handleOpen"
            @close="handleClose"
            :router="true">

            <!-- 用户管理 -->
            <el-submenu index="1">
                <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span slot="title">用户管理</span>
                </template>
                 <el-menu-item index="user">
                    用户列表
                </el-menu-item>
            </el-submenu>

            <!-- 文章管理 -->
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-s-management"></i>
                    <span>文章管理</span>
                </template>
                <el-menu-item index="addArticle">
                    发布文章
                </el-menu-item>
                <el-menu-item index="article">
                    文章列表
                </el-menu-item>
            </el-submenu>

            <!-- 类目管理 -->
            <el-submenu index="3">
                <template slot="title">
                <i class="el-icon-paperclip"></i>
                <span slot="title">类目管理</span>
                </template>
                <el-menu-item index="cate">
                    类目列表
                </el-menu-item>
            </el-submenu>

            <!-- 权限管理 -->
            <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-set-up"></i>
                    <span>权限管理</span>
                </template>
                <el-menu-item index="role">
                    角色列表
                </el-menu-item>
                <el-menu-item index="auth">
                    权限列表
                </el-menu-item>
            </el-submenu>

            <!-- 账户管理 -->
            <el-submenu index="5">
                <template slot="title">
                <i class="el-icon-s-tools"></i>
                <span slot="title">账户管理</span>
                </template>
                <el-menu-item index="account">
                    修改密码
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
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
// 标题
.title {
    width: 100%;
    height: 60px;
    line-height: 60px;
    font-size: 20px;
    font-weight: 700;
    text-align: center;
}
</style>
