<template>
    <div>
        <el-row>
            <el-col :span="12">
                <div class="grid-content">
                  <el-button plain icon="el-icon-s-home" @click="toHome">首页</el-button>
                  <el-button plain icon="el-icon-s-management" @click="toCate">文章分类</el-button>
                  <el-button plain icon="el-icon-s-promotion" @click="toMsg">留言板</el-button>
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
