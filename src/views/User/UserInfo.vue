<!--
 * @Author: Morpho Sylvie
 * @Date: 2020-03-27 21:21:34
 * @LastEditTime: 2020-04-24 14:59:08
 * @FilePath: \indidea-frontend\src\views\User\UserInfo.vue
 * @Description: 
 -->
<template>
  <div>
    <div class="info">
      <div class="header">
        <h3>基本信息</h3>
      </div>
      <div class="info-content">
        <div class="avatar">
          <img
            src="../../assets/default.png"
            v-real-img="userData.avatar"
            alt="..."
          />
        </div>
        <div class="info-right">
          <span @click="showApplyHistory" class="info-right-username">
            {{ userData.username }}
          </span>
          <span class="info-right-role" v-if="!applyStatus">
            {{ userData.status === 2 ? "创意人" : "普通用户" }}
          </span>
          <span class="info-right-role" v-else>
            申请创意人中
          </span>
          <p>注册于 {{ date(userData.createdat) }}</p>
          <div class="textarea">
            <textarea name="des" id="des" rows="2" v-model="userData.des">
            </textarea>
          </div>
        </div>
      </div>
      <div class="info-footer">
        <Button @click="changeAvatar" type="primary" icon="md-person">
          修改头像
        </Button>
        <input
          type="file"
          name="avatar"
          id="avatar"
          hidden
          @change="uploadAvatar()"
        />
        <Button type="primary" @click="saveDes" icon="md-briefcase">
          保存个人简介
        </Button>
        <Button type="primary" @click="editInfo" icon="md-contacts">
          更改详细信息
        </Button>
        <Button
          v-if="!loading && !applyStatus && userData.status !== 2"
          type="primary"
          @click="doApply"
          icon="md-document"
        >
          申请
        </Button>
        <Button type="error" @click="editPass" icon="md-build">
          修改密码
        </Button>
      </div>
    </div>
    <div v-if="editpass_show" class="edit-password">
      <Form :model="formItem" label-position="left" :label-width="100">
        <FormItem label="输入当前密码">
          <i-input type="password" v-model="formItem.input1" />
        </FormItem>
        <FormItem label="新的密码">
          <i-input type="password" v-model="formItem.input2" />
        </FormItem>
        <FormItem label="再次确认">
          <i-input type="password" v-model="formItem.input3" />
        </FormItem>
        <div>
          <Button
            @click="changePass"
            style="float:right;"
            type="success"
            icon="md-checkmark"
          >
            提交
          </Button>
          <Button
            style="float:right;margin-right: 18px"
            type="primary"
            icon="md-close"
            @click="editpass_show = false"
          >
            取消
          </Button>
        </div>
      </Form>
    </div>
    <div v-if="editinfo_show" class="normal-info">
      <Form :model="normalInfo" label-position="left" :label-width="100">
        <FormItem label="邮箱">
          <i-input disabled type="text" v-model="normalInfo.input1" clearable />
        </FormItem>
        <FormItem label="地址">
          <i-input
            placeholder="有了地址，方便收货"
            type="text"
            v-model="normalInfo.input2"
            clearable
          />
        </FormItem>
        <FormItem label="个人网站">
          <i-input
            placeholder="自己的个人网站"
            type="text"
            v-model="normalInfo.input3"
            clearable
          />
        </FormItem>
        <div>
          <Button
            @click="changeInfo"
            style="float:right;"
            type="success"
            icon="md-checkmark"
          >
            提交
          </Button>
          <Button
            style="float:right;margin-right: 18px"
            type="primary"
            icon="md-close"
            @click="editinfo_show = false"
          >
            取消
          </Button>
        </div>
      </Form>
    </div>
    <Modal :width="50" title="申请记录" v-model="modal">
      <div>
        <Table :columns="columns" :data="apply_historyList"></Table>
      </div>
    </Modal>
  </div>
</template>
<script>
import {
  myInfo,
  avatar,
  updateUser,
  // eslint-disable-next-line no-unused-vars
  updatePass,
  checkApplyStatus,
  doApply,
  myApplyList
} from "../../services/api/user";
import $ from "jquery";
import { USER_INFO } from "../../utils/Constants";
// eslint-disable-next-line no-unused-vars
import { LOGIN_OUT } from "../../utils/FunctionUtils";
export default {
  name: "UserInfo",
  data() {
    return {
      userData: {},
      formItem: {},
      normalInfo: {},
      editpass_show: false,
      editinfo_show: true,
      applyStatus: false,
      loading: true,
      modal: false,
      columns: [
        {
          title: "状态",
          key: "status",
          render: (h, params) => {
            let status = params.row.status;
            return h("div", status ? "申请成功" : "申请失败");
          }
        },
        {
          title: "申请时间",
          key: "createdat",
          render: (h, params) => {
            return h("div", this.date(params.row.createdat));
          }
        },
        {
          title: "处理时间",
          key: "createdat",
          render: (h, params) => {
            return h("div", this.date(params.row.updatedat));
          }
        }
      ],
      apply_historyList: []
    };
  },
  methods: {
    myData() {
      myInfo().then(res => {
        if (res.data) {
          this.userData = res.data;
          localStorage.setItem(USER_INFO, JSON.stringify(res.data));
          this.normalInfo.input1 = this.userData.email;
          this.normalInfo.input2 = this.userData.address;
          this.normalInfo.input3 = this.userData.website;
        }
      });
      checkApplyStatus().then(res => {
        this.applyStatus = res.data;
        this.loading = false;
      });
    },
    date(d) {
      let date = new Date(d);
      return date.toLocaleString().replace(/\//g, "-");
    },
    changeAvatar() {
      $("#avatar").click();
    },
    uploadAvatar() {
      let file = $("#avatar").prop("files")[0];
      if (file) {
        let formData = new FormData();
        formData.append("avatar", file);
        avatar(formData).then(res => {
          if (res.data) {
            this.myData();
            location.reload();
            this.$Message.success("更新成功");
          } else {
            this.$Message.info("更新失败");
          }
        });
      }
    },
    changePass() {
      let p = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
      if (this.formItem.input3 !== this.formItem.input2) {
        this.$Message.info("俩次输入密码不符");
        return;
      } else {
        if (this.formItem.input1 === this.formItem.input3) {
          this.$Message.info("不能与原始密码相同");
          return;
        }
        if (p.test(this.formItem.input3)) {
          updatePass(this.formItem.input1, this.formItem.input3).then(res => {
            if (res.data) {
              this.$Message.success("更新成功, 请重新登录");
              LOGIN_OUT();
            } else {
              this.$Message.info("更新失败");
            }
          });
        } else {
          this.$Message.info("不少于6字符且包含字符和数字");
        }
      }
    },
    saveDes() {
      let query = {
        des: this.userData.des
      };
      updateUser(query).then(res => {
        console.log("res :", res);
        if (res.data) {
          this.myData();
          this.$Message.success("更新成功");
        }
      });
    },
    doApply() {
      this.$Modal.confirm({
        title: "确认申请为创意人？",
        onOk: () => {
          doApply().then(res => {
            if (res.data) {
              this.myData();
            }
          });
        }
      });
    },
    editPass() {
      this.tabClose();
      this.editpass_show = true;
    },
    editInfo() {
      this.tabClose();
      this.editinfo_show = true;
    },
    tabClose() {
      this.editpass_show = false;
      this.editinfo_show = false;
    },
    changeInfo() {
      if (this.normalInfo.input2 || this.normalInfo.input3) {
        let query = {
          address: this.normalInfo.input2,
          website: this.normalInfo.input3
        };
        this.$Modal.confirm({
          title: "确认更新？",
          onOk: () => {
            updateUser(query).then(res => {
              if (res.data) {
                this.$Notice.success({
                  title: "更新成功",
                  duration: 2
                });
              } else {
                this.$Notice.error({
                  title: "更新失败",
                  duration: 2
                });
              }
            });
          }
        });
      } else {
        this.$Notice.warning({
          title: "请填写信息",
          duration: 2
        });
      }
    },
    showApplyHistory() {
      this.modal = true;
      myApplyList().then(res => {
        if (res.code === 200) {
          this.apply_historyList = res.data;
        }
      });
    }
  },
  created() {
    this.myData();
  }
};
</script>
<style lang="scss" scoped>
.info {
  border: 1px solid #ddd;
  box-shadow: 0 1px 2px rgba($color: #000000, $alpha: 0.17);
}
.header {
  position: relative;
  height: 44px;
  color: #666;
  text-align: left;
  font-size: 14px;
  line-height: 36px;
  padding-left: 8px;
  padding-top: 8px;
  display: block;
  h3 {
    // padding-left: 4px;
    // border-left: 2px solid #055f95;
    font-size: 18px;
    font-weight: 400;
    display: block;
    &::before {
      background-color: #055f95;
      content: "";
      display: inline-block;
      height: 16px;
      margin-right: 4px;
      line-height: 34px;
      width: 2px;
    }
  }
}
.info-content {
  display: flex;
  padding: 8px;
  min-width: 500px;
  max-width: 734px;
  .avatar {
    padding: 8px;
    img {
      height: 100px;
      width: 100px;
      border-radius: 50px;
      // display: block;
      cursor: pointer;
      object-fit: cover;
    }
  }
  .info-right {
    padding: 8px;
    width: 50%;
    &-username {
      font-size: 18px;
      font-weight: bold;
      color: #009e74;
      cursor: pointer;
      &:hover {
        color: #0f7c5f;
      }
    }
    &-role {
      font-size: 13px;
      margin-left: 8px;
      color: #666;
    }
    p {
      font-size: 12px;
      color: #666;
      margin: 2px 0 6px;
    }
    .textarea {
      display: block;
      border-top: 1px dashed #ddd;
      cursor: pointer;
      width: 100%;
      textarea {
        width: 100%;
        font-size: 13px;
        color: #444;
        margin: 8px 0;
        padding: 8px 5px;
        resize: none;
      }
    }
  }
}
.info-footer {
  padding: 8px;
  border-top: 1px dashed #ddd;
  .ivu-btn {
    margin-right: 8px;
    &:last-of-type {
      float: right;
      margin: 0;
    }
  }
}
.edit-password {
  // max-height: 0;
  margin-top: 36px;
  border: 1px solid #ddd;
  box-shadow: 0 1px 2px rgba($color: #000000, $alpha: 0.17);
  padding: 36px 60px 24px;
  overflow: hidden;
}
.normal-info {
  // max-height: 0;
  margin-top: 36px;
  border: 1px solid #ddd;
  box-shadow: 0 1px 2px rgba($color: #000000, $alpha: 0.17);
  padding: 36px 60px 24px;
  overflow: hidden;
}
</style>
