<template>
  <div class="home">

  <el-container>
    <el-header>
      <el-row>
        <el-col :span="12">
          <div class="grid-content">
            <el-menu :default-active="activeIndex"
            class="el-menu-demo"
            background-color="#18966a"
            active-text-color="#E6A23C"
            text-color="#fff"
            mode="horizontal"
            @select="handleSelect">
              <el-menu-item index="1">
                首页
              </el-menu-item>
              <el-submenu index="2">
                <template slot="title">文章分类</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
              </el-submenu>
            </el-menu>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <el-input
              placeholder="请输入搜索内容"
              v-model="search"
              clearable>
            </el-input>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content">
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <el-dropdown @command="handleUser"  size="medium" split-button type="warning">
              用户：User
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="manage">后台管理</el-dropdown-item>
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          </div></el-col>
      </el-row>
    </el-header>
    <el-main>Main</el-main>
    <el-footer>Footer</el-footer>
  </el-container>
  </div>
</template>

<script>
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  data () {
    return {
      activeIndex: '1',
      search: ''
    }
  },
  methods: {
    handleUser (command) {
      if (command === 'logout') {
        window.sessionStorage.clear()
        this.$router.push('/login')
      } else {
        this.$router.push('/admin')
      }
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style lang="less" scoped>
.el-header, .el-footer {
    background-color: #18966a;
    color: #fff;
    line-height: 60px;
  }
  .el-main {
    background-color: #fff;
    color: #333;
    line-height: 160px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #fff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
