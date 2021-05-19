<template>
    <div>
        <!-- 导航区 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin' }">后台管理</el-breadcrumb-item>
            <el-breadcrumb-item>类目管理</el-breadcrumb-item>
            <el-breadcrumb-item>类目列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图区 -->
        <el-card class="box-card">
            <!-- 添加按钮 -->
            <el-button
            @click="addCateDialogVisible = true"
            type="warning" round>添加类目</el-button>

            <!-- 类目数据表格 -->
            <el-table
              :data="catePageList"
              stripe
              style="width: 100%">
              <el-table-column prop="id" label="类目id"></el-table-column>
              <el-table-column prop="name" label="类目名称"></el-table-column>
              <el-table-column prop="sort" label="排序"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-tooltip v-if="scope.row.id !== 1" :enterable="false" class="item" effect="dark" content="编辑" placement="top">
                    <el-button
                    @click="showEditCateDialog(scope.row)"
                    type="primary" icon="el-icon-edit" round></el-button>
                  </el-tooltip>
                  <el-tooltip v-if="scope.row.id !== 1" :enterable="false" class="item" effect="dark" content="删除" placement="top">
                    <el-button
                    @click="deleteCateConfirm(scope.row.id)"
                    type="danger" icon="el-icon-delete" round></el-button>
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
              :total="cateTotal">
            </el-pagination>

            <!-- 添加类目对话框 -->
            <el-dialog
              title="添加类目"
              :visible.sync="addCateDialogVisible"
              width="50%"
              @close="resetAddCateRef">

              <!-- 表单主体区 -->
              <el-form
              :model="addCateForm"
              :rules="cateFormRules"
              ref="addCateFormRef"
              label-width="100px" >
                <el-form-item label="类目名" prop="name">
                  <el-input v-model="addCateForm.name"></el-input>
                </el-form-item>
              </el-form>

              <!-- 底部按钮区 -->
              <span slot="footer" class="dialog-footer">
                <el-button @click="addCateDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addCate">确 定</el-button>
              </span>
            </el-dialog>

            <!-- 修改类目对话框 -->
            <el-dialog
              title="修改类目"
              :visible.sync="editCateDialogVisible"
              width="50%">

              <!-- 表单主体区 -->
              <el-form
              :model="editCateForm"
              :rules="cateFormRules"
              ref="editCateFormRef"
              label-width="100px" >
                <el-form-item label="类目名" prop="name">
                  <el-input v-model="editCateForm.name"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                  <el-input v-model="editCateForm.sort"></el-input>
                </el-form-item>
              </el-form>

              <!-- 底部按钮区 -->
              <span slot="footer" class="dialog-footer">
                <el-button @click="editCateDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editCate">确 定</el-button>
              </span>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 类目数据总数
      cateTotal: 0,
      // 页面总数
      pageNum: 10,
      // 当前页面
      p: 2,
      // 查询数据
      queryInfo: {
        query: '1',
        queryInput: ''
      },
      // 类目列表
      catePageList: [{
        id: 1,
        name: 'web前端',
        sort: 1
      }],
      // 添加类目对话框
      addCateDialogVisible: false,
      // 添加类目对话框
      editCateDialogVisible: false,
      // 表单类目验证规则
      cateFormRules: {
        // 类目名验证
        name: [
          { required: true, message: '请输入类目名称', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ]
      },
      // 添加类目表单
      addCateForm: {
        name: ''
      },
      // 修改类目表单
      editCateForm: {
        name: '',
        sort: '',
        id: ''
      }
    }
  },
  created () {
    this.getCateList()
  },
  methods: {
    // 监听page-size改变
    handleSizeChange (size) {
      console.log(`每页 ${size} 条`)
    },
    // 监听current-page.sync改变
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.queryInfo.query = val
      this.getCateList()
    },
    // 获取当前类目列表
    async getCateList (query) {
      query = '?p=' + this.queryInfo.query
      const { data, status } = await this.$http.get('/cate' + query)
      if (status !== 200) {
        console.log(this.$message.error('类目数据列表获取失败'))
      } else {
        this.cateTotal = data.page.cateTotal
        this.catePageList = data.page.catePageList
        this.pageNum = data.page.pageNum
        this.p = Number(data.page.p)
      }
    },
    // 点击按钮添加类目
    addCate () {
      this.$refs.addCateFormRef.validate(async valid => {
        if (valid) {
          // 发起添加类目网络请求
          const { data, status } = await this.$http.post('/cate/add', this.addCateForm)
          if (status !== 200) {
            this.$message.error('添加类目失败')
          } else {
            this.$message.success('添加类目成功')
            console.log(data)
          }
          // 关闭对话框
          this.addCateDialogVisible = false
          // 刷新类目列表
          this.getCateList()
        }
      })
    },
    // 添加类目信息对话框关闭，重置表单数据
    resetAddCateRef () {
      this.$refs.addCateFormRef.resetFields()
    },
    // 修改类目列表
    showEditCateDialog (cateInfo) {
      this.editCateDialogVisible = true
      this.editCateForm.id = cateInfo.id
      this.editCateForm.name = cateInfo.name
      this.editCateForm.sort = cateInfo.sort
    },
    // 点击按钮修改类目数据
    editCate () {
      this.$refs.editCateFormRef.validate(async valid => {
        if (valid) {
          const { data, status } = await this.$http.post('/cate/edit', this.editCateForm)
          if (status !== 200) {
            this.$message.error('修改类目数据失败')
          } else {
            console.log(data)
            this.$message.success('修改类目数据成功')
          }
          this.editCateDialogVisible = false
          this.getCateList()
        }
      })
    },
    // 删除类目
    async deleteCateConfirm (id) {
      const isConfirm = await this.$confirm('此操作将永久删除该类别, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (isConfirm !== 'confirm') {
        this.$message.info('已取消删除该分类信息')
      } else {
        console.log('确认删除')
        const { status } = await this.$http.post('/cate/delete', { id: id })
        if (status !== 200) {
          this.$message.error('分类删除失败')
          this.getCateList()
        } else {
          this.$message.success('分类删除成功')
          this.getCateList()
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
