<template>
    <div>
        <!-- 导航栏 -->
        <el-breadcrumb separator="/" class="breadContainer">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/' }">文章管理</el-breadcrumb-item>
            <el-breadcrumb-item>文章列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 表单 -->

        <!-- 表格 -->
        <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <!-- ID列 -->
            <el-table-column label="ID">
            <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
            </el-table-column>
            <!-- 文章名称列 -->
            <el-table-column label="文章名称">
            <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                test
                <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.name }}</el-tag>
                </div>
                </el-popover>
            </template>
            </el-table-column>
            <!-- 所属类目列 -->
            <el-table-column label="所属类目">
                <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <!-- 热门推荐列 -->
            <el-table-column label="热门推荐">
                <el-switch
                    v-model="isHot"
                    active-color="#13ce66">
                </el-switch>
            </el-table-column>
            <!-- 操作列 -->
            <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>

export default {
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      isHot: false
    }
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    }
  }
}
</script>

<style lang="less" scoped>
.breadContainer {
    height: 60px;
    line-height: 60px;
    padding-left: 20px;
    background-color:lightblue ;
}

</style>
