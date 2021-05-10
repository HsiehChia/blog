<template>
  <div class="articleList">
    <div class="articleItem"></div>
    <div class="articleItem"></div>
    <div class="articleItem"></div>
    <div class="articleItem"></div>
    <div class="articleItem"></div>
  </div>
</template>

<script>

export default {

}
</script>

<style lang="less" scoped>
  .articleList {
    width: 100%;
    // background-color: #d3dce6;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
  }
  .articleItem{
    width: 23%;
    height: 300px;
    background-color: #99a9bf;
    margin-bottom: 20px;
    border-radius: 5px;
    transition: all 0.3s ease-in-out 0.2s;
  }
  .articleItem:hover {
    cursor: pointer;
    transform: translate3d(-4px, -4px ,0);
    box-shadow: 5px 5px 10px 2px #d1d1d1;
  }
</style>
