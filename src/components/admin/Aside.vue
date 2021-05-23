<template>
    <div>
        <div class="title">博客后台管理系统</div>
        <el-menu
            :default-active="activePath"
            class="el-menu-vertical-demo"
            background-color="#d6d9ff"
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
                 <el-menu-item index="user" @click="saveNavState('user')">
                    用户列表
                </el-menu-item>
            </el-submenu>

            <!-- 文章管理 -->
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-s-management"></i>
                    <span>文章管理</span>
                </template>
                <el-menu-item index="article" @click="saveNavState('article')">
                    文章列表
                </el-menu-item>
            </el-submenu>

            <!-- 类目管理 -->
            <el-submenu index="3">
                <template slot="title">
                <i class="el-icon-paperclip"></i>
                <span slot="title">类目管理</span>
                </template>
                <el-menu-item index="cate" @click="saveNavState('cate')">
                    类目列表
                </el-menu-item>
            </el-submenu>

            <!-- 权限管理 -->
            <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-set-up"></i>
                    <span>权限管理</span>
                </template>
                <el-menu-item index="role" @click="saveNavState('role')">
                    角色列表
                </el-menu-item>
                <el-menu-item index="auth" @click="saveNavState('auth')">
                    权限列表
                </el-menu-item>
            </el-submenu>

            <!-- 留言管理 -->
            <el-submenu index="5">
                <template slot="title">
                    <i class="el-icon-chat-dot-square"></i>
                    <span>留言管理</span>
                </template>
                <el-menu-item index="msg" @click="saveNavState('msg')">
                    留言列表
                </el-menu-item>
            </el-submenu>

            <!-- 账户管理 -->
            <el-submenu index="6">
                <template slot="title">
                <i class="el-icon-s-tools"></i>
                <span slot="title">账户管理</span>
                </template>
                <el-menu-item index="datacount" @click="saveNavState('datacount')">
                    数据统计
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {
  data () {
    return {
      activePath: ''
    }
  },
  created () {
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    // 保存导航链接激活状态
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
    },
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
