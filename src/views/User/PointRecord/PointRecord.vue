<template>
  <div>
    <!-- <ul>
      <li v-for="(item, index) in pList" :key="index"></li>
    </ul> -->
    <i-table border :columns="columns" :data="pList"></i-table>
    <div class="load-more">
      <span @click="loading_more" v-if="!loading">
        {{ total == pList.length ? "没有了" : "加载更多" }}
      </span>
      <img v-else src="../../../assets/loading2.gif" alt="loading" />
    </div>
  </div>
</template>
<script>
import { pointList } from "../../../services/api/user";
export default {
  name: "PointRecord",
  data() {
    return {
      pList: [],
      columns: [
        {
          title: "no.",
          render: (h, params) => {
            return h("div", params.index + 1);
          },
          width: 60
        },
        {
          title: "操作",
          render: (h, params) => {
            return h("div", this.op(params.row.ordernumber));
          },
          width: 100
        },
        {
          title: "变化",
          key: "point",
          width: 80
        },
        {
          title: "订单号",
          key: "ordernumber"
        },
        {
          title: "时间",
          key: "updatedat",
          width: 200,
          render: (h, params) => {
            return h("div", this.date(params.row.updatedat));
          }
        }
      ],
      total: 0,
      index: 0,
      size: 10,
      loading: false
    };
  },
  methods: {
    getPointList() {
      pointList(this.index, this.size).then(res => {
        if (res.data) {
          this.pList.push.apply(this.pList, res.data.list);
          this.total = res.data.total;
        }
      });
    },
    date(d) {
      let date = new Date(d);
      return date.toLocaleString().replace(/\//g, "-");
    },
    op(order) {
      let top_up = order.indexOf("top-up");
      let support = order.indexOf("support");
      if (top_up !== -1) {
        return "充值";
      } else if (support !== -1) {
        return "支持项目";
      } else {
        return "未知";
      }
    },
    loading_more() {
      if (this.total == this.pList.length) {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      } else {
        this.loading = true;
        setTimeout(() => {
          this.index++;
          this.getPointList();
          this.loading = false;
        }, 1000);
      }
    }
  },
  created() {
    this.getPointList();
  }
};
</script>
<style lang="scss" scoped>
.load-more {
  margin-top: 24px;
  width: 100%;
  text-align: center;
  padding: 6px;
  padding: 12px;
  span {
    cursor: pointer;
    line-height: 24px;
    display: inline-block;
    &:hover {
      text-decoration: underline #282828;
    }
  }
  img {
    height: 24px;
  }
}
</style>
