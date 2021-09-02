<template>
  <div class="err_box">
    <div>
      <div class="text_box">
        <div class="img_box">
          <img
            src="@/assets/img/404-1.png"
            alt=""
          >
        </div>
      </div>
      <div class="btn_box">
        <div>对不起，找不到该页面，请</div>
        <el-button
          type="primary"
          style="margin-left: 16px"
          @click="$router.go(-1)"
        >
          返回上一页
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="postcss" scope>
  .err_box{
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .btn_box{
      margin-top: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
