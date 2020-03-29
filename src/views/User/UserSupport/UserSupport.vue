<!--
 * @Author: Morpho Sylvie
 * @Date: 2020-03-27 22:04:20
 * @LastEditTime: 2020-03-29 19:40:44
 * @FilePath: \indidea-frontend\src\views\User\UserSupport\UserSupport.vue
 * @Description: 
 -->
<template>
  <div>
    <div>
      <ul>
        <li class="li" v-for="(item, index) in projectList" :key="index">
          <div class="project-list">
            <div
              @click="$router.push('/project-detail/' + item.project.id)"
              class="left-part"
            >
              <img
                src="../../../assets/default.png"
                alt="..."
                v-real-img="item.project.pic"
              />
              <!-- <img src="../../../assets/default.png" alt="avatar" /> -->
            </div>
            <div class="right-part">
              <div class="top-part">
                <Row>
                  <i-col span="19">
                    <h3
                      @click="
                        $router.push('/project-detail/' + item.project.id)
                      "
                    >
                      {{ item.project.title }}
                    </h3>
                  </i-col>
                  <i-col span="5">
                    <span @click="detail(item.project.id)">详情</span>
                  </i-col>
                </Row>
              </div>
              <div
                @click="$router.push('/project-detail/' + item.project.id)"
                class="bottom-part"
              >
                <div>
                  预计发放奖励时间:
                  {{ date(item.project.perdate) }}
                </div>
                赞助总额
                <h2>{{ total[index] }}</h2>
                Pt.
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <Modal :width="50" title="支持记录" v-model="modal">
      <div>
        <Table :columns="columns" :data="historyList"></Table>
      </div>
    </Modal>
  </div>
</template>
<script>
import { mySupport, supportHistory } from "../../../services/api/user";
export default {
  name: "UserSupport",
  data() {
    return {
      projectList: [],
      historyList: [],
      columns: [
        {
          title: "奖励阶梯",
          key: "reward.name",
          render: (h, params) => {
            let reward = params.row.reward;
            return h("div", reward ? reward.name : "无偿支持");
          }
        },
        {
          title: "实际金额",
          key: "point",
          width: 100
        },
        {
          title: "时间",
          key: "createdat",
          render: (h, params) => {
            return h("div", this.dateTime(params.row.createdat));
          }
        }
      ],
      total: [],
      modal: false
    };
  },
  methods: {
    getList() {
      mySupport().then(res => {
        if (res.data) {
          this.projectList = res.data.lists;
          this.total = res.data.total;
        }
      });
    },
    getHistoryById(id) {
      supportHistory(id).then(res => {
        if (res.data) {
          this.historyList = res.data;
        }
      });
    },
    init() {
      this.getList();
    },
    detail(id) {
      this.getHistoryById(id);
      this.modal = true;
    },
    date(d) {
      let date = new Date(d);
      return date.toLocaleDateString().replace(/\//g, "-");
    },
    dateTime(d) {
      let date = new Date(d);
      return date.toLocaleString();
    }
  },
  created() {
    this.init();
  },
  watch: {
    modal(to) {
      if (!to) {
        setTimeout(() => {
          this.historyList = [];
        }, 200);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
ul,
li {
  list-style: none;
}
ul {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}
.li {
  width: 100%;
  padding: 6px 5px;
  margin-bottom: 12px;
  &:hover {
    .project-list {
      border: 1px solid #a3a0a0;
      box-shadow: 0 2px 6px 1px rgba($color: #000000, $alpha: 0.17);
    }
  }
}
.project-list {
  display: flex;
  // border: 1px solid #dedcdc00;
  border: 1px solid #dedcdc;
  padding: 12px;
  transition: all 200ms;
  cursor: pointer;
  .left-part {
    img {
      object-fit: cover;
      font-size: 100%;
      vertical-align: bottom;
      &:first-of-type {
        width: 180px;
        height: 100px;
      }
    }
  }
  .right-part {
    margin-left: 24px;
    width: 100%;
    .ivu-row {
      width: 100%;
    }
    .top-part {
      display: flex;
      width: 100%;
      h3 {
        overflow: hidden;
        /*将对象作为弹性伸缩盒子模型显示*/
        display: -webkit-box;
        /*设置子元素排列方式*/
        -webkit-box-orient: vertical;
        /*设置显示的行数，多出的部分会显示为...*/
        -webkit-line-clamp: 2;
        line-height: 24px;
        font-size: 16px;
        font-weight: 400;
        height: 48px;
      }
      .ivu-col:last-of-type {
        // height: 100%;
      }
      span {
        // margin-left: 12px;
        // line-height: 24px;
        // height: 24px;
        position: relative;
        color: #696969;
        cursor: pointer;
        text-align: right;
        border: 1px solid #dcdede;
        padding: 6px 18px;
        background-color: #218d77;
        color: white;
        transition: all 200ms;
        float: right;
        z-index: 999;
        &:hover {
          background-color: #255e52;
          transform: translateY(2px);
        }
      }
    }
    .bottom-part {
      font-size: 12px;
      div {
        line-height: 28px;
        color: #282828;
      }
      h2 {
        display: inline-block;
        font-size: 24px;
        line-height: 1;
        font-weight: 500;
        color: rgb(36, 133, 36);
      }
    }
  }
}
</style>
