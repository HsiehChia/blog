<template>
    <div>
        <!-- 导航区 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin' }">后台管理</el-breadcrumb-item>
            <el-breadcrumb-item>文章管理</el-breadcrumb-item>
            <el-breadcrumb-item>添加文章</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图区 -->
        <el-card class="box-card">
          <!-- 头部 -->
          <el-row>
            <el-col :span="18"><div class="grid-content">添加文章</div></el-col>
            <el-col :span="6"><div class="grid-content">
              <el-button @click="goArticle" type="warning" round>返回文章管理</el-button></div></el-col>
          </el-row>

          <!-- 主体部分 -->
          <el-form
          :rules="articleFromRules"
          ref="articleFromRef"
          :model="articleFrom"
          label-width="100px">
          <!-- 文章标题 -->
            <el-form-item label="标题" prop="title" style="width:500px">
              <el-input v-model="articleFrom.title"></el-input>
            </el-form-item>

            <!-- 文章分类 -->
            <el-form-item label="类目" prop="category_name">
                <el-select
                style="width:400px"
                clearable
                v-model="articleFrom.category_id"
                placeholder="类别选择">
                  <el-option
                  v-for="item in categoryList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <!-- 文章内容 -->
            <el-form-item label="内容" prop="content" style="width:700px">
              <el-input
              type="textarea"
              :autosize="{ minRows: 5, maxRows: 8}"
              v-model="articleFrom.content"></el-input>
            </el-form-item>

            <!-- 设置热门 -->
            <el-form-item label="是否热门" prop="isHot">
              <el-switch v-model="articleFrom.isHot" active-value="1" inactive-value="0"></el-switch>
            </el-form-item>
            <el-form-item label="缩略图" prop="thumbnail" style="width:400px">
            <el-upload
              name='upload'
              action="http://127.0.0.1:3000/upload"
              :on-success="handleSuccess"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            </el-form-item>
          </el-form>
          <!-- 底部按钮 -->
          <el-button @click="goArticle">取 消</el-button>
          <el-button type="primary" @click="addArticle">确 定</el-button>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 类目列表
      categoryList: [{
        id: 1,
        name: 'web',
        sort: 1
      }],
      // 文章信息验证规则
      articleFromRules: {
        // 标题验证
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
        ],
        // 文章验证
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        // 类目验证
        category_id: [
          { required: true, message: '请选择分类', trigger: 'blur' }
        ],
        isHot: [
          { required: true, message: '请选择分类', trigger: 'blur' }
        ],
        // 缩略图验证
        thumbnail: [
          { required: false, message: '请上传文章主图', trigger: 'blur' }
        ]
      },
      // 文章信息
      articleFrom: {
        title: '',
        content: '',
        category_id: '',
        thumbnail: '',
        isHot: 1
      }
    }
  },
  created () {
    this.getCateList()
  },
  methods: {
    // 返回文章管理
    goArticle () {
      this.$router.push('/admin/article')
    },
    logart () {
      console.log(this.articleFrom.isHot)
    },
    // 获取当前类目列表
    async getCateList () {
      const { data, status } = await this.$http.get('/article/cate')
      if (status !== 200) {
        console.log(this.$message.error('类目数据列表获取失败'))
      } else {
        this.categoryList = data.categoryList
      }
      console.log(this.categoryList)
    },
    // 点击按钮添加文章
    addArticle () {
      this.$refs.articleFromRef.validate(async valid => {
        if (valid) {
          const { status } = await this.$http.post('/article/add', this.articleFrom)
          if (status !== 200) {
            this.$message.error('添加文章失败')
          } else {
            this.$message.success('添加文章成功')
            this.$router.push('/admin/article')
          }
        }
      })
    },
    // 图片上传成功后
    handleSuccess (res, file) {
      console.log(file)
      this.articleFrom.thumbnail = file.response.uploadUrl
    }
  }
}
</script>

<style lang="less" scoped>

</style>
