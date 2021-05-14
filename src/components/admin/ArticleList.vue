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
                  <el-image
                  style="width: 50px;"
                  fits="contain"
                  :src="getThumbnail(scope.row.thumbnail)">
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
                    @click="showEditArticleDialog(scope.row)"
                    type="primary" icon="el-icon-edit" round></el-button>
                  </el-tooltip>
                  <el-tooltip :enterable="false" class="item" effect="dark" content="删除" placement="top">
                    <el-button
                    @click="deleteArticleConfirm(scope.row.id)"
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

            <!-- 修改文章对话框 -->
            <el-dialog
              title="修改文章"
              :visible.sync="editDialogVisible"
              width="50%">

              <!-- 表单主体 -->
              <el-form ref="editArticleFormRef"
              :model="editArticleForm"
              :rules="articleFormRules"
              label-width="100px">
                <el-form-item label="标题" prop="title">
                  <el-input v-model="editArticleForm.title"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="content">
                  <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 5}"
                  v-model="editArticleForm.content"></el-input>
                </el-form-item>
                <el-form-item label="类目" prop="category_name">
                    <el-select
                    clearable
                    v-model="editArticleForm.category_name"
                    placeholder="类别选择">
                      <el-option
                      v-for="item in categoryList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="缩略图" prop="thumbnail">
                  <el-input
                  type="file"
                  id="thumbInput"
                  v-model="thumbInputName"
                  accept="image/png, image/jpeg, image/gif, image/jpg"
                  @change="articleThumbnail()"
                  ></el-input>
                </el-form-item> -->
              </el-form>

              <!-- 底部按钮 -->
              <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editArticle">确 定</el-button>
              </span>
            </el-dialog>
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
      }],
      // 修改文章对话框的显示与隐藏
      editDialogVisible: false,
      // 表单文章验证规则
      articleFormRules: {
        // 标题验证
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
        ],
        // 文章验证
        content: [
          { required: true, message: 'content', trigger: 'blur' }
        ],
        // 类目验证
        category_name: [
          { required: true, message: 'category_name', trigger: 'blur' }
        ],
        // 缩略图验证
        thumbnail: [
          { required: false, message: 'thumbnail', trigger: 'blur' }
        ]
      },
      // 修改文章表单
      editArticleForm: {
        id: '',
        title: '',
        content: '',
        category_id: '',
        category_name: '',
        thumbnail: ''
      },
      // 修改文章表单中缩略图的地址
      thumbInputName: ''
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
    },
    // 设置显示缩略图
    getThumbnail (thumbnail) {
      try {
        return require('../../assets/upload/' + thumbnail)
      } catch (e) {
        return ''
      }
    },
    // 点击按钮，显示修改文章信息对话框 以及 文章信息
    showEditArticleDialog (articleInfo) {
      this.editDialogVisible = true
      this.editArticleForm.id = articleInfo.id
      this.editArticleForm.title = articleInfo.title
      this.editArticleForm.content = articleInfo.content
      this.editArticleForm.category_id = articleInfo.category_id
      this.editArticleForm.category_name = articleInfo.category_name
      this.editArticleForm.thumbnail = articleInfo.thumbnail
    },
    // 点击按钮修改文章数据
    editArticle () {
      console.log(this.editArticleForm)
      // this.$refs.editArticleFormRef.validate(async valid => {
      //   const { data, status } = await this.$http.post('/article/edit', this.editArticleForm)
      //   if (status !== 200) {
      //     this.$message.error('修改文章数据失败')
      //   } else {
      //     console.log(data)
      //     this.$message.success('修改文章数据成功')
      //   }
      //   this.editDialogVisible = false
      //   this.getArticleList()
      // })
    },
    // 删除文章数据
    async deleteArticleConfirm (id) {
      const isConfirm = await this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (isConfirm !== 'confirm') {
        this.$message.info('已取消删除改文章信息')
      } else {
        console.log('确认删除')
        const { status } = await this.$http.post('/article/delete', { id: id })
        if (status !== 200) {
          this.$message.error('文章删除失败')
          this.getArticleList()
        } else {
          this.$message.success('文章删除成功')
          this.getArticleList()
        }
      }
    },
    articleThumbnail () {
      this.editArticleForm.thumbnail = document.querySelector('#thumbInput').files[0].name
      console.log(document.querySelector('#thumbInput').value)
      console.log(this.editArticleForm.thumbnail)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
