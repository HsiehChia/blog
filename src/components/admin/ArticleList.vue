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
            articleList
        </el-card>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>

</style>
