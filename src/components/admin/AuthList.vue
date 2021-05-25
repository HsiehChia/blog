<template>
    <div>
        <!-- 导航区 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin' }">后台管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图区 -->
        <el-card class="box-card">
        <el-tabs  tab-position="left" style="height: 400px;">
          <!-- 用户管理 -->
          <el-tab-pane label="用户管理">
            <el-table
              :data="userList"
              stripe
              style="width: 100%">
              <el-table-column
                prop="id"
                label="权限id"
                width="200px">
              </el-table-column>
              <el-table-column
                prop="name"
                label="权限名称"
                width="250px">
              </el-table-column>
              <el-table-column
                prop="description"
                label="权限描述">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-tooltip :enterable="false" class="item" effect="dark" content="编辑权限描述" placement="top">
                    <el-button
                    @click="showEditDialog(scope.row)"
                    type="primary" icon="el-icon-edit" round></el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>

          <!-- 文章管理 -->
          <el-tab-pane label="文章管理">
            <el-table
              :data="articleList"
              stripe
              style="width: 100%">
              <el-table-column
                prop="id"
                label="权限id"
                width="200px">
              </el-table-column>
              <el-table-column
                prop="name"
                label="权限名称"
                width="250px">
              </el-table-column>
              <el-table-column
                prop="description"
                label="权限描述">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-tooltip :enterable="false" class="item" effect="dark" content="编辑权限描述" placement="top">
                    <el-button
                    @click="showEditDialog(scope.row)"
                    type="primary" icon="el-icon-edit" round></el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>

          <!-- 类目管理 -->
          <el-tab-pane label="类目管理">
            <el-table
              :data="cateList"
              stripe
              style="width: 100%">
              <el-table-column
                prop="id"
                label="权限id"
                width="200px">
              </el-table-column>
              <el-table-column
                prop="name"
                label="权限名称"
                width="250px">
              </el-table-column>
              <el-table-column
                prop="description"
                label="权限描述">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-tooltip :enterable="false" class="item" effect="dark" content="编辑权限描述" placement="top">
                    <el-button
                    @click="showEditDialog(scope.row)"
                    type="primary" icon="el-icon-edit" round></el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>

          <!-- 角色管理 -->
          <el-tab-pane label="角色管理">
            <el-table
              :data="roleList"
              stripe
              style="width: 100%">
              <el-table-column
                prop="id"
                label="权限id"
                width="200px">
              </el-table-column>
              <el-table-column
                prop="name"
                label="权限名称"
                width="250px">
              </el-table-column>
              <el-table-column
                prop="description"
                label="权限描述">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-tooltip :enterable="false" class="item" effect="dark" content="编辑权限描述" placement="top">
                    <el-button
                    @click="showEditDialog(scope.row)"
                    type="primary" icon="el-icon-edit" round></el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>

          <!-- 权限管理 -->
          <el-tab-pane label="权限管理">
            <el-table
              :data="authList"
              stripe
              style="width: 100%">
              <el-table-column
                prop="id"
                label="权限id"
                width="200px">
              </el-table-column>
              <el-table-column
                prop="name"
                label="权限名称"
                width="250px">
              </el-table-column>
              <el-table-column
                prop="description"
                label="权限描述">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-tooltip :enterable="false" class="item" effect="dark" content="编辑权限描述" placement="top">
                    <el-button
                    @click="showEditDialog(scope.row)"
                    type="primary" icon="el-icon-edit" round></el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
        </el-card>

        <!-- 修改权限描述对话框 -->
        <el-dialog
          title="修改权限描述"
          :visible.sync="editDialogVisible"
          width="50%">

          <!-- 表单主体 -->
          <el-form ref="editAuthFormRef"
          :model="editAuthForm"
          :rules="authFormRules"
          label-width="100px">
            <el-form-item label="权限描述" prop="description">
              <el-input v-model="editAuthForm.description"></el-input>
            </el-form-item>
          </el-form>

          <!-- 底部按钮 -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editAuth">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 用户权限列表
      userList: [{
        id: 1,
        name: '添加用户',
        description: '在数据新增用户'
      }],
      // 文章权限列表
      articleList: [{
        id: 1,
        name: '添加文章',
        description: ''
      }],
      // 类目权限列表
      cateList: [{
        id: 1,
        name: '添加类目',
        description: ''
      }],
      // 角色权限列表
      roleList: [{
        id: 1,
        name: '添加角色',
        description: ''
      }],
      // 权限权限列表
      authList: [{
        id: 1,
        name: '添加权限',
        description: ''
      }],
      // 修改权限描述对话框显示
      editDialogVisible: false,
      // 编辑权限表单
      editAuthForm: {
        id: 1,
        description: 'hello'
      },
      // 编辑权限表单验证
      authFormRules: {
        // 描述验证
        description: [
          { required: false, message: '请输入权限描述', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getAuthList()
  },
  activated () {
    this.getAuthList()
    this.editAuth()
  },
  methods: {
    // 获取权限列表信息
    async getAuthList () {
      const { data, status } = await this.$http.get('/auth')
      if (status !== 200) {
        console.log(this.$message.error('用户权限列表获取失败'))
      } else {
        for (let i = 0; i < data.authPageList.length; i++) {
          if (i < 4) {
            this.userList[i] = data.authPageList[i]
          } else if (i < 8) {
            this.articleList[i - 4] = data.authPageList[i]
          } else if (i < 11) {
            this.cateList[i - 8] = data.authPageList[i]
          } else if (i < 14) {
            this.roleList[i - 11] = data.authPageList[i]
          } else {
            this.authList[i - 14] = data.authPageList[i]
          }
        }
      }
    },
    // 显示修改权限信息
    showEditDialog (authInfo) {
      this.editDialogVisible = true
      this.editAuthForm.description = authInfo.description
      this.editAuthForm.id = authInfo.id
    },
    // 点击确定按钮，修改描述
    editAuth () {
      this.$refs.editAuthFormRef.validate(async valid => {
        if (valid) {
          const { status } = await this.$http.post('/auth/edit', this.editAuthForm)
          if (status !== 200) {
            this.$message.error('修改权限描述失败')
          } else {
            this.$message.success('修改权限描述成功')
          }
          // 关闭对话框
          this.editDialogVisible = false
          // 刷新用户列表
          this.getAuthList()
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
