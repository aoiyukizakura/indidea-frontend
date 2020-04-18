<!--
 * @Author: Morpho Sylvie
 * @Date: 2020-03-13 13:55:44
 * @LastEditTime: 2020-04-18 22:19:11
 * @FilePath: \indidea-frontend\src\views\editdetail\Reward.vue
 * @Description: 
 -->
<template>
  <div>
    <div class="reward-info">
      <div class="info-header">
        <div>
          <Row type="flex" justify="center">
            <i-col span="16">
              <div>
                <h1>新增奖励阶梯</h1>
                <p>
                  给支持者们提供一些简单的或者有意义的回报，
                  也可以是该项目本身，或者是一些特殊的待遇，
                  让他们出现在幕后名单上也许是不错的选择
                </p>
              </div>
            </i-col>
          </Row>
        </div>
      </div>
      <div class="reward-edit-content">
        <Row>
          <i-col class="reward-col" span="24">
            <div class="reward-header">
              <div class="flex-header">
                <div class="flex-header-left">
                  <div>奖励阶梯</div>
                  <div>
                    <span>
                      提供一个奖励阶梯是好的事情，但是请不要给用户太多的选择
                    </span>
                  </div>
                </div>
                <Button type="primary" @click="modal = true" icon="md-add">
                  新增
                </Button>
              </div>
            </div>
            <Row class="reward-table-header">
              <i-col span="6"><span>达成金额</span></i-col>
              <i-col span="10"><span>奖励标题</span></i-col>
              <i-col span="8"><span>概述列表</span></i-col>
            </Row>
            <!-- table 开始 -->
            <div
              v-for="(item, index) in rewardList"
              :key="index"
              class="reward-table"
            >
              <Row class="reward-table-content">
                <i-col span="6">
                  <div class="reward-point">
                    <span>Point {{ item.point }}</span>
                  </div>
                </i-col>
                <i-col span="10">
                  <div class="table-content-name">
                    <h3>{{ item.name }}</h3>
                    <div>
                      <span>预计发放时间</span>
                      <span style="margin-left: 6px;">
                        {{ preDate(item.expected) }}
                      </span>
                    </div>
                  </div>
                </i-col>
                <i-col span="8">
                  <div class="table-content-itemlist">
                    <ul>
                      <li v-for="(m, n) in JSON.parse(item.items)" :key="n">
                        {{ m.name }} * {{ m.num }}
                      </li>
                    </ul>
                  </div>
                </i-col>
              </Row>
              <Row class="reward-table-control">
                <i-col span="8" offset="16">
                  <div>
                    <Button @click="doReward(1, item.id)" type="text">
                      编辑
                    </Button>
                    <Button @click="doReward(0, item.id)" type="text">
                      删除
                    </Button>
                  </div>
                </i-col>
              </Row>
            </div>
            <div @click="modal = true" class="reward-table-blank">
              <Icon type="md-add" size="14" color="#956969" />
              <p>
                新增一个奖励
              </p>
            </div>
            <!-- table 结束 -->
          </i-col>
        </Row>
      </div>
    </div>
    <Modal
      v-model="modal"
      title="新增一个阶段的奖励"
      footer-hide
      fullscreen
      class="add-reward-modal"
      @on-visible-change="visibleChange"
    >
      <div class="modal-form">
        <div class="modal-form-item modal-form-name">
          <p>名称</p>
          <p>简短的介绍一下这个奖励</p>
          <i-input
            v-model="rewardForm.name"
            placeholder="限量版本的物品"
          ></i-input>
        </div>
        <div class="modal-form-item modal-form-point">
          <p>达成金额</p>
          <p>达到这个奖励至少需要资助多少</p>
          <i-input
            v-model="rewardForm.point"
            type="number"
            :number="true"
            prefix="logo-usd"
          ></i-input>
        </div>
        <div class="modal-form-item modal-form-des">
          <p>描述</p>
          <p>更加具体的描述一下这个奖励所带来的东西</p>
          <i-input
            type="textarea"
            show-word-limit
            maxlength="999"
            :rows="5"
            placeholder="一个mini OST"
            v-model="rewardForm.des"
          ></i-input>
        </div>
        <div class="modal-form-item modal-form-date">
          <p>预计完成</p>
          <p>这个奖励大概在什么时候会分发给大家</p>
          <DatePicker
            v-model="rewardForm.expected"
            type="date"
            placeholder="选择日期"
            :options="dateOptions"
          ></DatePicker>
        </div>
        <div class="modal-form-item modal-form-lists">
          <p>新增回报项目</p>
          <p>用清单的形式给支持者们看到他们会获得什么</p>
          <i-input
            v-model="item.name"
            enter-button="添加"
            search
            @on-search="onAdd"
          ></i-input>
          <ul v-if="rewardForm.items.length">
            <li>
              <Row class="list-title">
                <i-col span="16">项目名</i-col>
                <i-col span="2">数量</i-col>
                <i-col span="6"></i-col>
              </Row>
            </li>
            <li v-for="(val, index) in rewardForm.items" :key="index">
              <Row class="list-content">
                <i-col span="16">{{ val.name }}</i-col>
                <i-col span="2">
                  <i-input
                    type="number"
                    v-model="rewardForm.items[index].num"
                  ></i-input>
                </i-col>
                <i-col span="6">
                  <span @click="removeItem(index)">移除该项回报</span>
                </i-col>
              </Row>
            </li>
          </ul>
        </div>
        <Button type="success" size="large" long @click="saveReward">
          完成
        </Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import "../../assets/scss/project/rewardInfo.scss";
import {
  rewardListByProjectId,
  saveReward,
  deleteReward,
  getReward
} from "../../services/api/project.js";
const _ = require("lodash");
export default {
  name: "reward",
  data() {
    return {
      pageProjectId: null,
      rewardList: [],
      modal: false,
      rewardForm: {
        name: "",
        point: null,
        des: "",
        items: []
      },
      item: {
        name: "",
        num: 1
      },
      dateOptions: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      numCheck: 1
    };
  },
  methods: {
    getRewardList() {
      rewardListByProjectId(this.pageProjectId).then(res => {
        if (res.data) {
          // this.rewardList = res.data;
          this.rewardList = _.orderBy(res.data, ["point"], ["asc"]);
        }
      });
    },
    // eslint-disable-next-line no-unused-vars
    getRewardById(id) {},
    preDate(date) {
      if (date) {
        let expected = new Date(date);
        return expected.toLocaleDateString();
      } else {
        return "暂无";
      }
    },
    onAdd() {
      this.rewardForm.items.push({ name: this.item.name, num: this.item.num });
      this.item = { name: "", num: 1 };
    },
    removeItem(index) {
      this.$Modal.confirm({
        title: "确定要删除这个项目吗？",
        content: "此操作不可以逆转，请谨慎操作。",
        onOk: () => {
          this.rewardForm.items.splice(index, 1);
        },
        onCancel: () => {}
      });
    },
    saveReward() {
      this.$Spin.show();
      let data = JSON.parse(JSON.stringify(this.rewardForm));
      const items = this.rewardForm.items;
      const point = parseInt(this.rewardForm.point);
      for (let index = 0; index < items.length; index++) {
        const num = parseInt(items[index].num);
        if (!num || num <= 0) {
          this.$Spin.hide();
          this.$Message.error("项目清单请填写正确数量");
          return false;
        }
      }
      if (point <= 0) {
        this.$Spin.hide();
        this.$Message.error("积分最低限额必须为正数");
        return false;
      }
      for (const key in this.rewardForm) {
        const element = this.rewardForm[key];
        if (!element || element === "" || element.length === 0) {
          this.$Spin.hide();
          this.$Message.error("请完成表单");
          return false;
        }
      }
      data.items = JSON.stringify(data.items);
      data.project = { id: this.pageProjectId };
      setTimeout(() => {
        saveReward(data).then(res => {
          this.$Spin.hide();
          if (res.data) {
            this.modal = false;
            this.getRewardList();
            this.$Message.success("成功添加");
          } else {
            this.$Message.error("未知错误，请稍候再试");
          }
        });
      }, 500);
    },
    /**
     * @param id rewardid
     * @param flag 标记 1是编辑 0是删除
     */
    doReward(flag, id) {
      if (flag === 0) {
        this.$Modal.confirm({
          title: "你确定要删除吗？",
          content: "删除之后不能够恢复了",
          onOk: () => {
            this.$Spin.show();
            setTimeout(() => {
              deleteReward(id).then(res => {
                if (res.data) {
                  this.$Message.success("删除成功");
                  this.getRewardList();
                } else {
                  this.$Message.error("未知错误");
                }
                this.$Spin.hide();
              });
            }, 1000);
          },
          onCancel: () => {}
        });
      } else {
        this.$Spin.show();
        setTimeout(() => {
          getReward(id).then(res => {
            res.data.items = JSON.parse(res.data.items);
            const reward = res.data;
            this.rewardForm = reward;
            this.modal = true;
            this.$Spin.hide();
          });
        }, 500);
      }
    },
    visibleChange(val) {
      if (val === false) {
        this.rewardForm = {
          name: "",
          point: null,
          des: "",
          items: []
        };
      }
    }
  },
  created() {
    this.pageProjectId = this.$route.params.projectId;
    this.getRewardList();
  }
};
</script>
