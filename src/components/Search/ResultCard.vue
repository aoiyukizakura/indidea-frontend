<!--
 * @Author: Morpho Sylvie
 * @Date: 2020-03-18 13:46:29
 * @LastEditTime: 2020-03-19 14:35:35
 * @FilePath: \indidea-frontend\src\components\Search\ResultCard.vue
 * @Description: 
 -->
<template>
  <div class="card">
    <img
      class="main-cover"
      src="../../assets/default.png"
      v-real-img="data.pic"
    />
    <div class="center-content">
      <h3>{{ data.title }}</h3>
      <p>
        {{ data.subtitle }}
      </p>
      <div>
        <span>发起人:</span> <span>{{ data.owner.username }}</span>
      </div>
    </div>
    <div class="footer-content">
      <i-progress :percent="progress" :stroke-width="3" hide-info></i-progress>
      <div class="footer-info">
        <div>已筹集了 {{ data.getpoint }}</div>
        <div>
          进度 {{ parseInt((data.getpoint / data.targetpoint) * 100) }} %
        </div>
        <div v-if="restDate > 0">剩余 {{ restDate }} 天</div>
        <div v-else>{{ progress !== 100 ? "失败案例" : "成功案例" }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ResultCard",
  props: {
    data: { owner: {} }
  },
  computed: {
    restDate() {
      let now = new Date();
      let target = new Date(this.data.targetdate);
      let x = target.getTime() - now.getTime();
      let day = parseInt(x / (1000 * 60 * 60 * 24));
      return day;
    },
    progress() {
      let pg = parseInt((this.data.getpoint / this.data.targetpoint) * 100);
      return pg > 100 ? 100 : pg;
    }
  }
};
</script>
<style lang="scss" scoped>
.card {
  border: 1px solid #dedcdd;
  margin-bottom: 30px;
  cursor: pointer;
  transition: all 300ms;
  &:hover {
    .center-content > h3 {
      text-decoration: underline;
    }
    box-shadow: 0 0px 6px 3px rgba($color: #000000, $alpha: 0.17);
  }
}
.main-cover {
  width: 100%;
  font-size: 0;
  vertical-align: bottom;
  height: 213px;
  object-fit: cover;
}
.center-content {
  height: 180px;
  padding-right: 18px;
  padding-left: 18px;
  padding-top: 24px;
  margin-bottom: 1px;
  h3 {
    margin-bottom: 6px;
    font-weight: 200;
    font-size: 18px;
    line-height: 24px;
    color: #282828;
  }
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: 48px;
    color: #9b9e9e;
    font-size: 14px;
    line-height: 24px;
    margin-bottom: 20px;
  }
  div {
    font-size: 13px;
    line-height: 18px;
    color: #282828;
    span:last-of-type {
      margin-left: 6px;
    }
  }
}
.footer-content {
  padding: 9px 18px 18px;
  .footer-info {
    margin-top: 9px;
    color: #037362;
    div {
      margin-right: 12px;
      font-size: 13px;
      line-height: 18px;
    }
  }
}
</style>
