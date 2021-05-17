<template>
    <div>
        <!-- 导航区 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin' }">后台管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图区 -->
        <el-card class="box-card">
            <!-- 添加按钮 -->
            <el-button
            @click="addRoleDialogVisible = true"
            type="warning" round>添加角色</el-button>

            <!-- 角色数据表格 -->
            <el-table
              :data="rolePageList"
              stripe
              style="width: 100%">
              <el-table-column prop="id" label="角色id"></el-table-column>
              <el-table-column prop="name" label="角色名称"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-tooltip v-if="scope.row.id>2" :enterable="false" class="item" effect="dark" content="编辑" placement="top">
                    <el-button
                    @click="showEditRoleDialog(scope.row)"
                    type="primary" icon="el-icon-edit" round></el-button>
                  </el-tooltip>
                  <el-tooltip v-if="scope.row.id>2" :enterable="false" class="item" effect="dark" content="删除" placement="top">
                    <el-button
                    @click="deleteRoleConfirm(scope.row.id)"
                    type="danger" icon="el-icon-delete" round></el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>

            <!-- 添加角色对话框 -->
            <el-dialog
              title="添加角色"
              :visible.sync="addRoleDialogVisible"
              width="50%"
              @close="resetAddRoleRef">

              <!-- 表单主体区 -->
              <el-form
              :model="addRoleForm"
              :rules="roleFormRules"
              ref="addRoleFormRef"
              label-width="100px" >
                <el-form-item label="角色名" prop="name">
                  <el-input v-model="addRoleForm.name"></el-input>
                </el-form-item>
              </el-form>

              <!-- 底部按钮区 -->
              <span slot="footer" class="dialog-footer">
                <el-button @click="addRoleDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addRole">确 定</el-button>
              </span>
            </el-dialog>

            <!-- 修改角色对话框 -->
            <el-dialog
              title="修改角色"
              :visible.sync="editRoleDialogVisible"
              width="50%">

              <!-- 表单主体区 -->
              <el-form
              :model="editRoleForm"
              :rules="roleFormRules"
              ref="editRoleFormRef"
              label-width="100px" >
                <el-form-item label="角色名" prop="name">
                  <el-input v-model="editRoleForm.name"></el-input>
                </el-form-item>
              </el-form>

              <!-- 底部按钮区 -->
              <span slot="footer" class="dialog-footer">
                <el-button @click="editRoleDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editRole">确 定</el-button>
              </span>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 角色数据列表
      rolePageList: [{
        id: 1,
        name: 'test'
      }],
      // 修改角色对话框显示
      editRoleDialogVisible: false,
      // 添加角色对话框显示
      addRoleDialogVisible: false,
      // 表单角色验证规则
      roleFormRules: {
        // 角色名验证
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ]
      },
      // 修改角色表单
      editRoleForm: {
        name: '',
        id: ''
      },
      // 添加角色表单
      addRoleForm: {
        name: '',
        id: ''
      }
    }
  },
  created () {
    this.getRoleList()
  },
  methods: {
    // 获取当前角色列表
    async getRoleList () {
      const { data, status } = await this.$http.get('/role')
      if (status !== 200) {
        console.log(this.$message.error('角色数据列表获取失败'))
      } else {
        this.rolePageList = data.rolePageList
      }
    },
    // 点击按钮添加角色
    addRole () {
      this.$refs.addRoleFormRef.validate(async valid => {
        if (valid) {
          // 发起添加类目网络请求
          const { data, status } = await this.$http.post('/role/add', this.addRoleForm)
          if (status !== 200) {
            this.$message.error('添加角色失败')
          } else {
            this.$message.success('添加角色成功')
            console.log(data)
          }
          // 关闭对话框
          this.addRoleDialogVisible = false
          // 刷新角色列表
          this.getRoleList()
        }
      })
    },
    // 添加角色信息对话框关闭，重置表单数据
    resetAddRoleRef () {
      this.$refs.addRoleFormRef.resetFields()
    },
    // 显示修改角色对话框
    showEditRoleDialog (roleInfo) {
      this.editRoleDialogVisible = true
      console.log(roleInfo)
      this.editRoleForm.id = roleInfo.id
      this.editRoleForm.name = roleInfo.name
    },
    // 点击按钮修改角色数据
    editRole () {
      this.$refs.editRoleFormRef.validate(async valid => {
        if (valid) {
          const { data, status } = await this.$http.post('/role/edit', this.editRoleForm)
          if (status !== 200) {
            this.$message.error('修改角色数据失败')
          } else {
            console.log(data)
            this.$message.success('修改角色数据成功')
          }
          this.editRoleDialogVisible = false
          this.getRoleList()
        }
      })
    },
    // 删除角色
    async deleteRoleConfirm (id) {
      const isConfirm = await this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (isConfirm !== 'confirm') {
        this.$message.info('已取消删除该角色信息')
      } else {
        console.log('确认删除')
        const { status } = await this.$http.post('/role/delete', { id: id })
        if (status !== 200) {
          this.$message.error('角色删除失败')
          this.getRoleList()
        } else {
          this.$message.success('角色删除成功')
          this.getRoleList()
        }
      }
    }
  }

}
</script>

<style lang="less" scoped>

</style>
