<template>
    <div>
        <el-row>
            <el-col :span="12">
                <div class="grid-content">
                  <el-menu
                    :default-active="activeIndex"
                    class="el-menu-demo"
                    mode="horizontal"
                    @select="handleSelect"
                    background-color="#18966a"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    :router="true">
                    <el-menu-item index="home">
                      <i class="el-icon-s-home" style="color:#fff"></i>
                      首页
                    </el-menu-item>
                    <el-menu-item index="cate">
                      <i class="el-icon-s-management" style="color:#fff"></i>
                      文章分类
                    </el-menu-item>
                    <el-menu-item index="msg">
                      <i class="el-icon-s-promotion" style="color:#fff"></i>
                      留言板
                    </el-menu-item>
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
                <Logout></Logout>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Logout from '@/components/Logout.vue'

export default {
  name: 'Header',
  data () {
    return {
      activeIndex: '1',
      search: ''
    }
  },
  methods: {
    toHome () {
      this.$router.push('/home')
    },
    toCate () {
      this.$router.push('/cate')
    },
    toMsg () {
      this.$router.push('/msg')
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  components: {
    Logout
  }
}
</script>

<style lang="less" scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
