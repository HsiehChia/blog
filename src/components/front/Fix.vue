<template>
  <el-container class="container">
    <!-- 头部 -->
    <el-header>
      <Header></Header>
    </el-header>
    <!-- 主体 -->
    <el-main>
      <el-row>
        <el-col :span="6"><div class="grid-content"></div></el-col>
        <el-col :span="12">
          <div class="grid-content">
            <!-- 修改表单 -->
            <el-form ref="editUserFormRef"
            :model="editUserForm"
            :rules="userFormRules"
            label-width="100px">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="editUserForm.username"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input show-password v-model="editUserForm.password"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="editUserForm.email"></el-input>
              </el-form-item>
              <el-form-item label="地址" prop="address">
                <el-input v-model="editUserForm.address"></el-input>
              </el-form-item>
            </el-form>

            <!-- 底部按钮 -->
            <span slot="footer" class="dialog-footer">
              <el-button @click="11">取 消</el-button>
              <el-button type="primary" @click="fixUser">确 定</el-button>
            </span>
          </div>
        </el-col>
        <el-col :span="6"><div class="grid-content"></div></el-col>
      </el-row>
    </el-main>
    <!-- 底部 -->
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
import Header from '@/components/front/Header.vue'

export default {
  name: 'Home',
  data () {
    return {
      // 表单用户验证规则
      userFormRules: {
        // 用户名验证
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 2, max: 25, message: '长度在 2 到 25 个字符', trigger: 'blur' }
        ],
        // 密码验证
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入用户邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入用户地址', trigger: 'blur' },
          { min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur' }
        ]
      },
      // 修改用户表单
      editUserForm: {
        id: 1,
        username: 'helper',
        password: 2123355,
        email: 'qq@qq.com',
        address: 'china'
      }
    }
  },
  created () {
    const id = window.sessionStorage.getItem('user_id')
    this.getUserById(id)
  },
  methods: {
    // 通过登录id获取当前用户信息
    async getUserById (id) {
      console.log(id)
      const { data, status } = await this.$http.post('/login/userInfo', { id: id })
      if (status !== 200) {
        console.log(this.$message.error('当前用户信息获取失败'))
      } else {
        this.editUserForm = data.userInfo[0]
      }
    },
    // 修改用户
    fixUser () {
      this.$refs.editUserFormRef.validate(async valid => {
        if (valid) {
          const { status } = await this.$http.post('/login/fix', this.editUserForm)
          if (status !== 200) {
            this.$message.error('修改用户数据失败')
          } else {
            this.$message.success('修改用户数据成功')
            this.$router.push('/home')
            window.sessionStorage.setItem('activePath', 'home')
          }
        }
      })
    }
  },
  components: {
    Header
  }
}
</script>
<style lang="less" scoped>
// 页面主体
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
// 表单
.grid-content {
  min-height: 36px;
}
</style>
