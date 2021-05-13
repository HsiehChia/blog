<template>
    <div>
        <!-- 导航区 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin' }">后台管理</el-breadcrumb-item>
            <el-breadcrumb-item>文章管理</el-breadcrumb-item>
            <el-breadcrumb-item>文章列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图区 -->
        <el-card class="box-card">
            <!-- 搜索框 与 添加按钮 -->
            <el-row :gutter="20">
                <!-- 搜索框 -->
                <el-col :span="13">
                    <div class="grid-content">
                    <!-- <el-input
                    clearable
                    placeholder="请输入文章名字" class="input-with-select">
                    </el-input> -->
                    <el-select
                    clearable
                    @clear="getArticleList()"
                    v-model="queryInfo.queryCategoryInput"
                    placeholder="类别选择">
                      <el-option
                      v-for="item in categoryList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"></el-option>
                    </el-select>
                    <el-select
                    @clear="getArticleList()"
                    clearable
                    v-model="queryInfo.queryIsHotInput"
                    placeholder="是否热门">
                      <el-option label="热门" value="1"></el-option>
                      <el-option label="非热门" value="0"></el-option>
                    </el-select>
                    <el-button
                        @click="getArticleList()"
                        slot="append" icon="el-icon-search">
                    </el-button>
                    </div>
                </el-col>
                <!-- 添加按钮 -->
                <el-col :span="6">
                    <div class="grid-content">
                        <el-button
                        type="warning" round>添加文章</el-button>
                    </div>
                </el-col>
            </el-row>

            <!-- 文章数据表格 -->
            <el-table
              :data="articlePageList"
              stripe
              style="width: 100%">
              <el-table-column type="index"></el-table-column>
              <el-table-column width="150px" prop="title" label="标题"></el-table-column>

              <!-- 状态 -->
              <!-- <el-table-column
                label="状态" width="50">
                <template slot-scope="scope">
                  <el-switch @change="userStateChange(scope.row)" v-model="scope.row.openState"></el-switch>
                </template>
              </el-table-column> -->
              <!-- 状态 -->

              <el-table-column width="150px" prop="category_name" label="类别"></el-table-column>
              <el-table-column width="150px" prop="thumbnail" label="缩略图">
                <template slot-scope="scope">
                  {{scope.row.id}}
                  <el-image
                  style="width: 50px;"
                  fits="contain"
                  src="D:\project\vueModule\project04\src\assets\upload\logo.png">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </template>
              </el-table-column>
              <el-table-column width="100px" prop="hots" label="热门">
                <template slot-scope="scope">
                  <el-switch @change="articleIsHotChange(scope.row)" v-model="scope.row.isHot"></el-switch>
                </template>
              </el-table-column>
              <el-table-column width="180px" prop="createTime" label="操作时间"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <!-- <el-tooltip :enterable="false" class="item" effect="dark" content="编辑" placement="top">
                    <el-button
                    @click="showEditUserDialog(scope.row)"
                    type="primary" icon="el-icon-edit" round></el-button>
                  </el-tooltip> -->
                  <el-tooltip :enterable="false" class="item" effect="dark" content="编辑" placement="top">
                    <el-button
                    type="primary" icon="el-icon-edit" round></el-button>
                  </el-tooltip>
                  <el-tooltip :enterable="false" class="item" effect="dark" content="删除" placement="top">
                    <el-button
                    type="danger" icon="el-icon-delete" round>{{scope.row.id}}</el-button>
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
              :total="articleTotal">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 文章数据总数
      articleTotal: 10,
      // 页面总数
      pageNum: 5,
      // 当前页面
      p: 1,
      // 查询数据
      queryInfo: {
        query: '1',
        // 类目输入框查询数据
        queryCategoryInput: '',
        // 热门输入框查询数据
        queryIsHotInput: ''
      },
      // 文章列表
      articlePageList: [{
        id: 1,
        title: 'html',
        content: '',
        category_id: '',
        category_name: '',
        thumbnail: '',
        createTime: '2020-2-2',
        isHot: 1
      }],
      // 类目列表
      categoryList: [{
        id: 1,
        name: 'web',
        sort: 1
      }]
    }
  },
  created () {
    this.getArticleList()
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
      this.getArticleList()
    },
    // 获取页面所有文章数据
    async getArticleList () {
      const query = '?p=' + this.queryInfo.query + '&category_id=' + this.queryInfo.queryCategoryInput + '&isHot=' + this.queryInfo.queryIsHotInput
      const { data, status } = await this.$http.get('/article' + query)
      if (status !== 200) {
        console.log(this.$message.error('用户数据列表获取失败'))
      } else {
        this.articleTotal = data.page.articleTotal
        this.articlePageList = data.page.articlePageList
        this.categoryList = data.page.categoryList
        this.pageNum = data.page.pageNum
        this.p = Number(data.page.p)
      }
    },
    // 文章热门设置
    async articleIsHotChange (articleInfo) {
      const {
        id,
        isHot
      } = articleInfo
      let hots = null
      if (isHot === true) {
        hots = 1
      } else {
        hots = 0
      }
      const { status } = await this.$http.post('/article/isHot', {
        id: id,
        isHot: hots
      })
      if (status !== 200) {
        this.$message.error('修改热门失败')
      } else {
        this.$message.success('修改热门成功')
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
