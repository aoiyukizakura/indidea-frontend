<!--
 * @Author: Morpho Sylvie
 * @Date: 2020-03-28 16:22:12
 * @LastEditTime: 2020-03-29 19:27:43
 * @FilePath: \indidea-frontend\src\views\User\TopUp\TopUp.vue
 * @Description: 
 -->
<template>
  <div>
    <div class="header">
      <span>余额：</span>
      <span>{{ myinfo.balance }}</span>
    </div>
    <input v-if="topUp_show" class="point" type="number" v-model="point" />
    <div class="top-up">
      <span @click="topUp">充值</span>
    </div>
  </div>
</template>
<script>
import { myInfo, addPoint } from "../../../services/api/user";
export default {
  name: "TopUp",
  data() {
    return {
      myinfo: "",
      topUp_show: false,
      point: 0
    };
  },
  methods: {
    init() {
      this.getMyBalance();
    },
    getMyBalance() {
      myInfo().then(res => {
        if (res.data) {
          this.myinfo = res.data;
        }
      });
    },
    topUp() {
      if (!this.topUp_show) {
        this.topUp_show = true;
      } else {
        this.doTopUp();
      }
    },
    doTopUp() {
      if (this.point !== 0 && this.point != null && this.point !== "") {
        addPoint(this.point).then(res => {
          if (res.data) {
            this.$Message.success("充值成功");
            this.point = 0;
            this.topUp_show = false;
            this.getMyBalance();
          }
        });
      } else {
        this.$Message.info("请输入金额");
      }
    }
  },
  created() {
    this.init();
  }
};
</script>
<style lang="scss" scoped>
.header {
  span {
    &:first-of-type {
      font-size: 16px;
      line-height: 24px;
    }
    &:last-of-type {
      font-size: 24px;
      line-height: 24px;
      vertical-align: text-top;
    }
  }
}
.point {
  margin-top: 24px;
  padding: 12px 18px;
  font-size: 16px;
  line-height: 24px;
  transition: all 200ms;
  &:focus {
    outline: none;
    border: 2px solid rgb(138, 137, 137);
  }
}
.top-up {
  width: inherit;
  span {
    display: inline-block;
    border: 1px solid #decded;
    margin-top: 24px;
    padding: 9px 24px;
    font-size: 16px;
    background-color: rgb(31, 31, 31);
    color: white;
    cursor: pointer;
    transition: all 200ms;
    &:hover {
      background-color: black;
      transform: translateY(2px);
      outline: 1px solid #b58cda;
    }
  }
}
</style>
