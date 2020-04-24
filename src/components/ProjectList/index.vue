<!--
 * @Author: Morpho Sylvie
 * @Date: 2020-02-28 13:19:49
 * @LastEditTime: 2020-03-29 16:00:05
 * @FilePath: \indidea-frontend\src\components\ProjectList\ProjectList.vue
 * @Description: 首页旁边的列表项
 -->
<template>
  <div class="list">
    <Row type="flex">
      <i-col span="9">
        <img src="@/assets/default.png" v-real-img="project.pic" alt="" />
      </i-col>
      <i-col span="15">
        <div>
          <p>{{ project.title }}</p>
          <span>已筹集 {{ status }}</span>
          <span class="target-date">目标日期：{{ date }}</span>
          <div class="owner-title">
            <div>
              <span>发起人：</span>
              <span>{{ project.owner.username }}</span>
            </div>
          </div>
        </div>
      </i-col>
    </Row>
    <div class="heart">
      <!-- <div class="ivu-card" @click="saveProject(project.id)"> -->
      <!-- <Icon size="20" type="md-heart-outline" /> -->
      <!-- </div> -->
    </div>
  </div>
</template>
<script>
import { getPercent } from "../../utils/MathUtils";
export default {
  name: "ProjectList",
  props: {
    project: {}
  },
  data: () => ({}),
  computed: {
    status() {
      return getPercent(this.project.getpoint, this.project.targetpoint);
    },
    date() {
      return new Date(this.project.targetdate)
        .toLocaleDateString()
        .replace(/\//g, "-");
    }
  },
  methods: {
    saveProject(id) {
      console.log("saveproject :", id);
    }
  }
};
</script>
<style lang="css" scoped>
.list {
  /* padding-bottom: 1.2rem; */
  cursor: pointer;
  /* margin-bottom: 1.2rem;
  border-bottom: 1px solid #e8eaec; */
  position: relative;
}
.list .ivu-col:first-child {
  padding-right: 1.6rem;
  font-size: 0;
}
.list .ivu-col img {
  width: 100%;
  font-size: 0;
}
.list .ivu-col:last-child p {
  line-height: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  margin-bottom: 16px;
  color: #282828;
  white-space: nowrap;
  width: 100%;
}
.list:hover .ivu-col:last-child p {
  text-decoration-line: underline;
  color: #587058;
  text-decoration-color: #587058;
}
.list .ivu-col:last-child > div > span {
  font-size: 12px;
  line-height: 18px;
  font-weight: 700;
  color: #656969;
  width: 100%;
  display: block;
  margin-bottom: 6px;
}
.target-date {
  font-size: 12px;
  line-height: 18px;
  font-weight: 700;
  color: #656969;
  width: 100%;
  display: block;
  /* position: absolute; */
  /* bottom: 0; */
}
.owner-title {
  position: absolute;
  bottom: 0;
}
.owner-title > div span:first-of-type {
  font-size: 12px;
  line-height: 18px;
  color: #656969;
}
.owner-title > div span:last-of-type {
  font-size: 0.7rem;
  line-height: 1.2rem;
  color: #656969;
}
.owner-title > div span:last-of-type:hover {
  text-decoration-line: underline;
  color: #587058;
  text-decoration-color: #587058;
}
.heart {
  position: absolute;
  height: 100%;
  width: 0px;
  top: 0;
  right: 0;
  transition: all 200ms;
  opacity: 0;
  display: flex;
  justify-content: center;
  justify-items: center;
  align-items: center;
  text-align: center;
}
.heart > div {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  justify-items: center;
  align-items: center;
  text-align: center;
  background-color: white;
  transition: all 200ms;
  /* background-color: #f8f8f9; */
}
.heart > div:hover {
  transform: scale(1.2);
}
.list:hover .heart {
  width: 50px;
  opacity: 1;
}
</style>
