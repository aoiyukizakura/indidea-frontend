<!--
 * @Author: Morpho Sylvie
 * @Date: 2020-02-29 00:17:40
 * @LastEditTime: 2020-03-29 15:58:40
 * @FilePath: \indidea-frontend\src\components\HotCard\HotCard.vue
 * @Description: 首页的最近最热 卡片组件
 -->
<template>
  <div class="hover-targer-list">
    <div class="img-target">
      <img src="@/assets/default.png" v-real-img="project.pic" />
      <i-progress
        :percent="(project.getpoint / project.targetpoint) * 100"
        :stroke-width="6"
        hide-info
      ></i-progress>
      <!-- <div class="sub-btn">
        <Icon size="20" type="md-heart-outline" />
      </div> -->
    </div>
    <div class="title">
      <h3>
        {{ project.title }}
      </h3>
      <p>
        {{ project.subtitle }}
      </p>
    </div>
    <div class="owner-title-list">
      <div>
        <span>发起人：</span>
        <span>{{ project.owner.username }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "HotCard",
  props: {
    project: {}
  },
  data: () => ({})
};
</script>
<style lang="css" scoped>
.hover-targer-list {
  font-size: 0;
  /* background-color: salmon; */
  cursor: pointer;
}
.hover-targer-list:hover .sub-btn {
  top: 10px;
  opacity: 1;
}
.hover-targer-list:hover .title > h3 {
  text-decoration-line: underline;
  text-decoration-color: #587058;
  color: #587058;
}
.img-target {
  font-size: 0;
  position: relative;
  margin-bottom: 18px;
  overflow: hidden;
}
.img-target img {
  width: 100%;
  font-size: 0;
  vertical-align: bottom;
}
.img-target >>> .ivu-progress-outer,
.img-target >>> .ivu-progress-inner,
.img-target >>> .ivu-progress-bg,
.img-target >>> .ivu-progress-success-bg {
  border-radius: 0px !important;
  font-size: 0 !important;
  padding: 0 !important;
  margin: 0 !important;
}
.img-target >>> .ivu-progress {
  padding: 0 !important;
  margin: 0 !important;
  font-size: 0 !important;
}
.img-target > .ivu-progress {
  width: 100%;
  display: block;
}
.sub-btn {
  position: absolute;
  background-color: white;
  border-radius: 50%;
  text-align: center;
  display: flex;
  justify-items: center;
  align-items: center;
  justify-content: center;
  height: 34px;
  width: 34px;
  opacity: 0;
  transition: all 200ms ease-in-out 0ms;
  top: -10px;
  right: 20px;
}
.sub-btn:hover {
  transform: scale(1.2);
}
.sub-btn > .ivu-icon {
  color: black;
  font-weight: bold;
}
.hover-targer-list .title > h3 {
  width: 100%;
  margin-bottom: 24px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  /* !autoprefixer */
  -webkit-box-orient: vertical;
  color: #282828;
  font-size: 18px;
  line-height: 24px;
  white-space: pre-wrap;
  font-weight: 400;
  text-align: left;
  max-height: 48px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.title > p {
  width: 100%;
  margin-bottom: 24px;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  /* !autoprefixer */
  -webkit-box-orient: vertical;
  color: #282828;
  font-size: 14px;
  line-height: 24px;
  white-space: pre-wrap;
  text-align: left;
  max-height: 96px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.owner-title-list > div {
  text-align: left !important;
}
.owner-title-list > div span:first-of-type {
  font-size: 0.8rem;
  line-height: 1.2rem;
  color: #656969;
}
.owner-title-list > div span:last-of-type {
  font-size: 0.7rem;
  line-height: 1.2rem;
  color: #656969;
}
.owner-title-list > div span:last-of-type:hover {
  text-decoration-line: underline;
}
</style>
