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
                    <el-input placeholder="请输入内容" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                    </div>
                </el-col>
                <!-- 添加按钮 -->
                <el-col :span="6">
                    <div class="grid-content">
                        <el-button type="warning" round>添加用户</el-button>
                    </div>
                </el-col>
            </el-row>

            <!-- 用户数据表格 -->
            <el-table
              :data="userPageList"
              stripe
              style="width: 100%">
              <el-table-column
                type="index">
              </el-table-column>
              <el-table-column
                prop="username"
                label="姓名"
                width="100">
              </el-table-column>

              <!-- 状态 -->
              <!-- <el-table-column
                label="状态" width="50">
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.openState"></el-switch>
                </template>
              </el-table-column> -->
              <!-- 状态 -->

              <el-table-column
                prop="roleName"
                label="角色"
                width="100">
              </el-table-column>
              <el-table-column
                prop="age"
                label="年龄"
                width="100">
              </el-table-column>
              <el-table-column
                prop="email"
                label="邮箱"
                width="200">
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址"
                width="150">
              </el-table-column>
              <el-table-column
                prop="createTime"
                label="创建时间"
                width="200">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-tooltip :enterable="false" class="item" effect="dark" content="编辑" placement="top">
                    <el-button type="primary" icon="el-icon-edit" round>{{scope.row.id}}</el-button>
                  </el-tooltip>
                  <el-tooltip :enterable="false" class="item" effect="dark" content="删除" placement="top">
                    <el-button type="danger" icon="el-icon-delete" round></el-button>
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
      // 当前页面
      p: 2,
      // 查询数据
      queryInfo: {
        query: '?p=1'
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
      }]
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    async getUserList (query) {
      query = this.queryInfo.query
      const { data, status } = await this.$http.get('/user' + query)
      if (status !== 200) {
        console.log(this.$message.error('用户数据列表获取失败'))
      } else {
        this.userTotal = data.page.userTotal
        this.userPageList = data.page.userPageList
        this.pageNum = data.page.pageNum
        this.p = Number(data.page.p)
      }
      console.log(data)
    },
    // 监听page-size改变
    handleSizeChange (size) {
      console.log(`每页 ${size} 条`)
    },
    // 监听current-page.sync改变
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.queryInfo.query = '?p=' + val
      this.getUserList()
    }
  }
}
</script>

<style lang="less" scoped>

</style>
