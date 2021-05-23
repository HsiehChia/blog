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
                    background-color="#d6d9ff"
                    text-color="#333"
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
                  </el-menu>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content">
                    <el-input v-model="search"
                    clearable
                    placeholder="请输入搜索关键词" class="input-with-select">
                        <el-button @click="getListBykeyword()"
                        slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </div>
            </el-col>
            <el-col :span="6" style="text-align: center;">
                <Logout></Logout>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Logout from '@/components/front/Logout.vue'

export default {
  name: 'Header',
  data () {
    return {
      activeIndex: '1',
      search: ''
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
      window.sessionStorage.setItem('activePath', key)
    },
    getListBykeyword () {
      window.sessionStorage.setItem('keyword', this.search)
      this.$router.push('/pagelist')
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
