<!--
 * @Author: Morpho Sylvie
 * @Date: 2020-03-27 21:21:34
 * @LastEditTime: 2020-04-14 21:56:13
 * @FilePath: \indidea-frontend\src\views\User\UserInfo\UserInfo.vue
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
            src="../../../assets/default.png"
            v-real-img="userData.avatar"
            alt="..."
          />
        </div>
        <div class="info-right">
          <span>{{ userData.username }}</span>
          <span>{{ userData.status === 2 ? "创意人" : "普通用户" }}</span>
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
        <Button type="primary" @click="saveDes" icon="md-document">
          保存个人简介
        </Button>
        <Button type="error" @click="editpass_show = true" icon="md-build">
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
    <div v-else class="normal-info"></div>
  </div>
</template>
<script>
import {
  myInfo,
  avatar,
  updateUser,
  // eslint-disable-next-line no-unused-vars
  updatePass
} from "../../../services/api/user";
import $ from "jquery";
import { USER_INFO } from "../../../utils/Constants";
// eslint-disable-next-line no-unused-vars
import { LOGIN_OUT } from "../../../utils/FunctionUtils";
export default {
  name: "UserInfo",
  data() {
    return {
      userData: {},
      formItem: {},
      editpass_show: false
    };
  },
  methods: {
    myData() {
      myInfo().then(res => {
        if (res.data) {
          this.userData = res.data;
          localStorage.setItem(USER_INFO, JSON.stringify(res.data));
        }
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
        if (p.test(this.formItem.input3)) {
          updatePass(this.formItem.input1, this.formItem.input3).then(res => {
            if (res.data) {
              this.$Message.success("更新成功, 请重新登录");
              LOGIN_OUT();
            } else {
              this.$Message.info("更新失败");
            }
          });
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
    & > span {
      &:first-of-type {
        font-size: 18px;
        font-weight: bold;
        color: #009e74;
      }
      &:nth-of-type(2) {
        font-size: 13px;
        margin-left: 8px;
        color: #666;
      }
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
</style>
