<template>
    <div>
        <!-- 导航区 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin' }">后台管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图区 -->
        <el-card class="box-card">
            <!-- 搜索框 与 添加按钮 -->
            <el-row :gutter="20">
                <!-- 搜索框 -->
                <el-col :span="8">
                    <div class="grid-content">
                    <el-input v-model="queryInfo.queryInput"
                    @clear="getUserList()"
                    clearable
                    placeholder="请输入用户名字" class="input-with-select">
                        <el-button @click="getUserListByName()"
                        slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                    </div>
                </el-col>
                <!-- 添加按钮 -->
                <el-col :span="6">
                    <div class="grid-content">
                        <el-button
                        @click="addUserDialogVisible = true"
                        type="warning" round>添加用户</el-button>
                    </div>
                </el-col>
            </el-row>

            <!-- 用户数据表格 -->
            <el-table
              :data="userPageList"
              stripe
              style="width: 100%">
              <el-table-column type="index"></el-table-column>
              <el-table-column width="150px" prop="username" label="姓名"></el-table-column>

              <!-- 状态 -->
              <!-- <el-table-column
                label="状态" width="50">
                <template slot-scope="scope">
                  <el-switch @change="userStateChange(scope.row)" v-model="scope.row.openState"></el-switch>
                </template>
              </el-table-column> -->
              <!-- 状态 -->

              <el-table-column width="150px" prop="roleName" label="角色"></el-table-column>
              <el-table-column width="150px" prop="email" label="邮箱"></el-table-column>
              <el-table-column width="150px" prop="address" label="地址"></el-table-column>
              <el-table-column width="180px" prop="createTime" label="操作时间"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-tooltip :enterable="false" class="item" effect="dark" content="编辑" placement="top">
                    <el-button
                    @click="showEditUserDialog(scope.row)"
                    type="primary" icon="el-icon-edit" round></el-button>
                  </el-tooltip>
                  <el-tooltip :enterable="false" class="item" effect="dark" content="删除" placement="top">
                    <el-button
                    @click="deleteUserConfirm(scope.row.id)"
                    type="danger" icon="el-icon-delete" round></el-button>
                  </el-tooltip>
                  <el-tooltip :enterable="false" class="item" effect="dark" content="分配角色" placement="top">
                    <el-button type="warning" icon="el-icon-setting" round></el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>

            <!-- 分页 -->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="p"
              :page-size="pageNum"
              layout="total, prev, pager, next, jumper"
              :total="userTotal">
            </el-pagination>
        </el-card>

        <!-- 添加用户对话框 -->
        <el-dialog
          title="添加用户"
          :visible.sync="addUserDialogVisible"
          width="50%"
          @close="resetAddUserRef">

          <!-- 表单主体区 -->
          <el-form
          :model="addUserForm"
          :rules="userFormRules"
          ref="addUserFormRef"
          label-width="100px" >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="addUserForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input show-password v-model="addUserForm.password"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="addUserForm.email"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address">
              <el-input v-model="addUserForm.address"></el-input>
            </el-form-item>
          </el-form>

          <!-- 底部按钮区 -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="addUserDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addUser">确 定</el-button>
          </span>
        </el-dialog>

        <!-- 修改用户对话框 -->
        <el-dialog
          title="修改用户"
          :visible.sync="editDialogVisible"
          width="50%">

          <!-- 表单主体 -->
          <el-form ref="editUserFormRef"
          :model="editUserForm"
          :rules="userFormRules"
          label-width="100px">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="editUserForm.username"></el-input>
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
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editUser">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 用户列表
      userPageList: [],
      // 用户数据总数
      userTotal: 0,
      // 页面总数
      pageNum: 10,
      num: 10,
      // 当前页面
      p: 2,
      // 查询数据
      queryInfo: {
        query: '1',
        queryInput: ''
      },
      // 用户列表数据
      tableData: [{
        id: 1,
        username: '王小虎',
        roleName: '管理员',
        age: 18,
        email: '222333@qq.com',
        address: '四川省成都市',
        createTime: '2020-2-2',
        openState: true
      }],
      // 添加用户对话框的显示与隐藏
      addUserDialogVisible: false,
      // 修改用户对话框的显示与隐藏
      editDialogVisible: false,
      // 添加用户表单
      addUserForm: {
        username: '',
        password: '',
        email: '',
        address: ''
      },
      // 添加表单用户规则
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
        id: '',
        username: '',
        email: '',
        address: ''
      }
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    // 搜索用户
    async getUserListByName (queryInput) {
      queryInput = '?username=' + this.queryInfo.queryInput
      const { data, status } = await this.$http.get('/user/search' + queryInput)
      if (status !== 200) {
        console.log(this.$message.error('模糊搜索用户数据列表失败'))
      } else {
        this.userTotal = data.page.userTotal
        this.userPageList = data.page.userPageListByName
        this.pageNum = data.page.pageNum
        this.p = Number(data.page.p)
      }
    },
    // 获取用户列表
    async getUserList (query) {
      query = '?p=' + this.queryInfo.query
      const { data, status } = await this.$http.get('/user' + query)
      if (status !== 200) {
        console.log(this.$message.error('用户数据列表获取失败'))
      } else {
        this.userTotal = data.page.userTotal
        this.userPageList = data.page.userPageList
        this.pageNum = data.page.pageNum
        this.p = Number(data.page.p)
      }
    },
    // 监听switch开关状态改变
    async userStateChange (userChange) {
      console.log(userChange)
      // this.$http.post('/user/:id/:state')
      const { status } = await this.$http.post(`/user/${userChange.id}/${userChange.openState}`)
      if (status !== 200) {
        this.$message.error('更新用户状态失败')
        userChange.openState = !userChange.openState
      } else {
        this.$message.success('更新用户状态成功')
      }
    },
    // 监听page-size改变
    handleSizeChange (size) {
      console.log(`每页 ${size} 条`)
    },
    // 监听current-page.sync改变
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.queryInfo.query = val
      this.getUserList()
    },
    // 添加用户信息对话框关闭，重置表单数据
    resetAddUserRef () {
      this.$refs.addUserFormRef.resetFields()
    },
    // 点击按钮添加用户
    addUser () {
      this.$refs.addUserFormRef.validate(async valid => {
        if (valid) {
          // 发起添加用户网络请求
          const { data, status } = await this.$http.post('/user/addUser', this.addUserForm)
          if (status !== 200) {
            this.$message.error('添加用户失败')
          } else {
            this.$message.success('添加用户成功')
            console.log(data)
          }
          // 关闭对话框
          this.addUserDialogVisible = false
          // 刷新用户列表
          this.getUserList()
        }
      })
    },
    // 点击按钮，显示修改用户信息对话框 以及 用户信息
    showEditUserDialog (userInfo) {
      this.editDialogVisible = true
      this.editUserForm.id = userInfo.id
      this.editUserForm.username = userInfo.username
      this.editUserForm.email = userInfo.email
      this.editUserForm.address = userInfo.address
    },
    // 点击按钮修改用户数据
    editUser () {
      console.log(this.editUserForm)
      this.$refs.editUserFormRef.validate(async valid => {
        const { data, status } = await this.$http.post('/user/edit', this.editUserForm)
        if (status !== 200) {
          this.$message.error('修改用户数据失败')
        } else {
          console.log(data)
          this.$message.success('修改用户数据成功')
        }
        this.editDialogVisible = false
        this.getUserList()
      })
    },
    // 删除用户确认框
    async deleteUserConfirm (id) {
      const isConfirm = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (isConfirm !== 'confirm') {
        this.$message.info('已取消删除改用户信息')
      } else {
        console.log('确认删除')
        const { status } = await this.$http.post('/user/delete', { id: id })
        if (status !== 200) {
          this.$message.error('用户删除失败')
          this.getUserList()
        } else {
          this.$message.success('用户删除成功')
          this.getUserList()
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
