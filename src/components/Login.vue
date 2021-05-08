<template>
  <div class="login_container">
      <div class="login_box">
        <!-- avatar -->
        <div class="avatar">
          <img src="../assets/logo.png">
        </div>

        <!-- form -->
        <el-form
        label-width="0"
        class="login_form"
        :model="loginForm"
        :rules="loginFormRules"
        ref="loginFormRef">
        <!-- username item -->
          <el-form-item
            prop="username">
            <el-input
            placeholder="请输入用户名"
            prefix-icon="el-icon-user-solid"
            v-model="loginForm.username">
            </el-input>
          </el-form-item>
          <!-- password item -->
          <el-form-item
          prop="password">
            <el-input
              placeholder="请输入密码"
              prefix-icon="el-icon-lock"
              v-model="loginForm.password"
              show-password>
            </el-input>
          </el-form-item>

          <!-- buttons -->
          <el-form-item class="btns">
            <el-row type="flex" class="row-bg" justify="center">
              <el-col :span="6" :offset="2">
                <el-button @click="login" type="success" plain>登录</el-button>
              </el-col>
              <el-col :span="6">
                <el-button @click="register" type="primary" plain>注册</el-button>
              </el-col>
              <el-col :span="6">
                <el-button @click="resetLoginForm" type="warning" plain>重置</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>

        <!-- backtohome -->
        <el-row :gutter="20" class="backToHome">
          <el-col :span="6" :offset="9">
            <el-link type="primary">点击返回首页</el-link>
          </el-col>
        </el-row>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      // 表单数据绑定
      loginForm: {
        username: '',
        password: ''
      },
      // 表单验证规则
      loginFormRules: {
        // 用户名验证
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 密码验证
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击登录
    login () {
      // 预验证
      this.$refs.loginFormRef.validate(async validate => {
        // 预验证成功，发起登录请求
        if (validate) {
          const res = await this.$http.post('/login', this.loginForm)
          console.log(res)
          const data = res.data
          console.log(data)
          if (data.code === 500) {
            this.$message.error('登录失败：' + data.msg)
          } else {
            this.$message.success(data.msg)
            this.$router.push('/admin')
          }
        }
      })
    },
    // 点击注册
    register () {
      // 预验证
      this.$refs.loginFormRef.validate(validate => {
        // 预验证成功，发起注册请求
        if (validate) {
        }
      })
    },
    // 点击重置按钮
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    }
  }
}
</script>

<style scoped lang="less">
.login_container {
    background-color: #18966a;
    height: 100%;
    position: relative;
}
.login_box {
  width: 500px;
  height: 350px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar {
    height: 100px;
    width: 100px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 5px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.login_form {
  position: absolute;
  width: 100%;
  bottom: 50px;
  padding: 0 20px;
  box-sizing: border-box;
}
.backToHome {
  position: absolute;
  display: block;
  text-align: center;
  width: 100%;
  bottom: 20px;
}
</style>
