<!--
 * @Author: Morpho Sylvie
 * @Date: 2020-03-20 16:48:20
 * @LastEditTime: 2020-03-30 12:32:40
 * @FilePath: \indidea-frontend\src\components\RewardCard\RewardCard.vue
 * @Description: 
 -->
<template>
  <div :class="'reward-main ' + (clicked ? 'border' : '')">
    <div>
      <div
        @click="hoverBlock()"
        :class="'hover-block ' + (clicked ? 'display-none' : '')"
      >
        <span v-if="data.project.status != 6" class="hover-block-content">
          选择这个阶梯奖励
        </span>
        <span v-else class="hover-block-content">项目已结束</span>
      </div>
      <h2>资助 Pt. {{ data.point }} 或者更多</h2>
      <h3>{{ data.name }}</h3>
      <div class="description">
        <p>{{ data.des }}</p>
        <span>奖励清单: </span>
        <ul>
          <li v-for="(item, index) in items" :key="index">
            {{ item.name }} * {{ item.num }}
          </li>
        </ul>
      </div>
      <div class="expected">
        <span>改奖励预计发放时间</span>
        <span> {{ expected }} </span>
      </div>
    </div>

    <div :class="'input-form ' + (!clicked ? 'display-none' : '')">
      <div>
        <label>
          确认金额
        </label>
        <input v-if="point" v-model="point" type="number" />
      </div>
      <button v-if="data.project.status != 6" class="go-pay" @click="goPay">
        去付款
      </button>
      <button v-else class="go-pay" disabled>去付款</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "RewardCard",
  props: {
    data: {}
  },
  data: () => ({
    clicked: false,
    point: 0
  }),
  computed: {
    items() {
      return JSON.parse(this.data.items);
    },
    expected() {
      let date = new Date(this.data.expected);
      return date.getFullYear() + "年" + date.getMonth() + "月";
    }
  },
  methods: {
    hoverBlock() {
      if (this.data.project.status != 6) this.clicked = true;
    },
    goPay() {
      this.$emit("goPay", this.point, this.data.id);
    }
  },
  created() {
    this.point = this.data.point;
  }
};
</script>
<style lang="scss" scoped>
.reward-main {
  position: relative;
  background-color: white;
  overflow: hidden;
  & > div {
    margin: 0 20px;
    padding: 20px 0;
  }
  h2 {
    color: #282828;
    font-size: 18px;
    font-weight: 400;
    line-height: 1.4;
    margin-bottom: 20px;
  }
  h3 {
    font-size: 16px;
    font-weight: 400;
    color: #282828;
    line-height: 1.4;
    margin-bottom: 10px;
  }
  .description {
    color: #656969;
    position: relative;
    margin-bottom: 20px;
    height: auto;
    line-height: 18px;
    p {
      margin-bottom: 20px;
      font-size: 14px;
      line-height: 1.2;
    }
    span {
      letter-spacing: 1px;
      font-weight: 500;
      display: block;
      font-size: 10px;
      line-height: 12px;
    }
    ul {
      padding-left: 12px;
      margin-left: 18px;
      margin-bottom: 12px;
      font-size: 14px;
      line-height: 24px;
      color: #020624;
      li {
        list-style: disc;
      }
    }
  }
  .expected {
    span {
      &:first-of-type {
        color: #656969;
        font-size: 10px;
        font-weight: 500;
        letter-spacing: 0.5px;
        line-height: 1.4;
        display: block;
      }
      &:last-child {
        font-size: 14px;
        display: block;
        color: #020624;
      }
    }
  }
  .hover-block {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    background-color: rgba($color: #009e74, $alpha: 0.9);
    transform: scale(1.2);
    opacity: 0;
    transition: all 200ms ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
    &-content {
      font-size: 18px;
      color: white;
      // display: inline-block;
      vertical-align: center;
      text-align: center;
      box-sizing: inherit;
    }
  }
  &:hover {
    .hover-block {
      z-index: 9;
      opacity: 1;
      transform: scale(1);
    }
  }
}
.display-none {
  display: none !important;
}
.border {
  border: 0.5px solid #979797;
}
.input-form {
  padding: 18px;
  & > div {
    margin-bottom: 18px;
    label {
      display: block;
      font-size: 12px;
      line-height: 1.4;
      font-weight: 600;
      color: #656969;
      margin-bottom: 5px;
    }
    input {
      display: block;
      width: 100%;
      height: 42px;
      padding: 10px;
      border: 1px solid #dcdede;
      line-height: 20px;
      font-size: 16px;
      &:focus {
        outline: none !important;
      }
    }
  }
  .go-pay {
    height: 42px;
    width: 100%;
    background-color: white;
    box-shadow: none;
    border: 1px solid #d3d6d3;
    background-color: #1c9482;
    color: white;
    font-weight: 700;
    letter-spacing: 1px;
    transition: all 200ms;
    cursor: pointer;
    &:focus {
      outline: none !important;
    }
    &:hover {
      transform: translateY(2px);
      background-color: #146e61;
    }
  }
}
</style>
