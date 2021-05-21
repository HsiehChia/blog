<template>
    <div>
        <!-- 导航区 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin' }">后台管理</el-breadcrumb-item>
            <el-breadcrumb-item>留言管理</el-breadcrumb-item>
            <el-breadcrumb-item>留言列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图区 -->
        <el-card class="box-card">
            <!-- 搜索框 与 添加按钮 -->
            <el-row :gutter="20">
                <!-- 搜索框 -->
                <el-col :span="8">
                    <div class="grid-content">
                    <el-input v-model="queryInfo.queryInput"
                    @clear="getMsgList()"
                    clearable
                    placeholder="请输入留言消息关键词" class="input-with-select">
                        <el-button @click="getMsgList()"
                        slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                    </div>
                </el-col>
            </el-row>

            <!-- 用户数据表格 -->
            <el-table
              :data="msgPageList"
              stripe
              style="width: 100%">
              <el-table-column type="index"></el-table-column>
              <el-table-column width="120px" prop="username" label="姓名"></el-table-column>
              <el-table-column width="250px" prop="msg" label="消息"></el-table-column>
              <el-table-column width="180px" prop="title" label="标题"></el-table-column>
              <el-table-column width="180px" prop="createTime" label="留言时间"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-tooltip :enterable="false" class="item" effect="dark" content="回复" placement="top">
                    <el-button
                    @click="replyMsgDialog(scope.row)"
                    type="primary" icon="el-icon-edit" round></el-button>
                  </el-tooltip>
                  <el-tooltip :enterable="false" class="item" effect="dark" content="删除" placement="top">
                    <el-button
                    @click="deleteMsgConfirm(scope.row.id)"
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
              :total="msgTotal">
            </el-pagination>
        </el-card>

        <!-- 添加消息回复对话框 -->
        <el-dialog
          title="添加消息回复"
          :visible.sync="addMsgDialogVisible"
          width="50%"
          @close="resetAddMsgrRef">

          <!-- 表单主体区 -->
          <el-form
          :model="addMsgForm"
          :rules="msgFormRules"
          ref="addMsgFormRef"
          label-width="100px" >
            <el-form-item label="消息回复" prop="msg">
              <el-input v-model="addMsgForm.msg"></el-input>
            </el-form-item>
          </el-form>

          <!-- 底部按钮区 -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="addMsgDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addMsg">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 留言列表
      msgPageList: [{
        id: 1,
        user_id: 1,
        username: 'hello',
        role_id: 1,
        msg: '6666666',
        title: 'HTML',
        article_id: 3,
        createTime: '2020-2-2'
      }],
      // 留言数据总数
      msgTotal: 0,
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
      // 添加用户对话框的显示与隐藏
      addMsgDialogVisible: false,
      // 添加留言回复表单
      addMsgForm: {
        msg: ''
      },
      // 表单消息验证规则
      msgFormRules: {
        // 消息验证
        msg: [
          { required: true, message: '请输入回复消息', trigger: 'blur' },
          { min: 1, max: 500, message: '长度在 2 到 500 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getMsgList()
  },
  methods: {
    // 回复信息操作
    replyMsgDialog (msgInfo) {
      console.log(msgInfo)
      this.addMsgDialogVisible = true
      this.addMsgForm.msg = msgInfo.msg
      this.addMsgForm.user_id = window.sessionStorage.getItem('user_id')
      this.addMsgForm.article_id = msgInfo.article_id
    },
    // 点击按钮添加消息回复
    addMsg () {
      this.$refs.addMsgFormRef.validate(async valid => {
        if (valid) {
          // 发起添加用户网络请求
          const { data, status } = await this.$http.post('/msg/add', this.addMsgForm)
          if (status !== 200) {
            this.$message.error('回复消息失败')
          } else {
            this.$message.success('回复消息成功')
            console.log(data)
          }
          // 关闭对话框
          this.addMsgDialogVisible = false
          // 刷新消息列表
          this.getMsgList()
        }
      })
    },
    // 添加消息信息对话框关闭，重置表单数据
    resetAddMsgrRef () {
      this.$refs.addMsgFormRef.resetFields()
    },
    // 获取留言列表
    async getMsgList (query) {
      query = '?p=' + this.queryInfo.query + '&keyword=' + this.queryInfo.queryInput
      const { data, status } = await this.$http.get('/msg' + query)
      if (status !== 200) {
        console.log(this.$message.error('留言数据列表获取失败'))
      } else {
        this.msgTotal = data.page.msgTotal
        this.msgPageList = data.page.msgPageList
        this.pageNum = data.page.pageNum
        this.p = Number(data.page.p)
      }
    },
    // 删除留言
    async deleteMsgConfirm (id) {
      const isConfirm = await this.$confirm('此操作将永久删除该消息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (isConfirm !== 'confirm') {
        this.$message.info('已取消删除改消息')
      } else {
        console.log('确认删除')
        const { status } = await this.$http.post('/msg/delete', { id: id })
        if (status !== 200) {
          this.$message.error('消息删除失败')
          this.getMsgList()
        } else {
          this.$message.success('消息删除成功')
          this.getMsgList()
        }
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
      this.getMsgList()
    }
  }
}
</script>

<style lang="less" scoped>

</style>
