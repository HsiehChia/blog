<template>
    <div class="grid-content">
        <el-dropdown @command="handleUser"  size="medium" split-button type="warning">
            用户：{{username}}
            <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-if="role_id == '1'" command="manage">后台管理</el-dropdown-item>
            <el-dropdown-item command="fix">修改用户信息</el-dropdown-item>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
export default {
  data () {
    return {
      username: window.sessionStorage.getItem('username'),
      role_id: window.sessionStorage.getItem('role_id')
    }
  },
  methods: {
    handleUser (command) {
      if (command === 'logout') {
        window.sessionStorage.clear()
        this.$router.push('/login')
      } else if (command === 'fix') {
        this.$router.push('/fix')
      } else {
        this.$router.push('/admin')
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
