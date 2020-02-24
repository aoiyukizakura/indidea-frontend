<template>
  <div class="main">
    <div class="login">
      <p>登录</p>
      <input v-model="email" type="text" placeholder="电子邮箱" />
      <input v-model="password" type="password" placeholder="密码" />
      <router-link class="link-forget" to="/forgetpassword"
        >忘记密码？</router-link
      >
      <Button class="btn-login" type="primary" @click="login"> 登录 </Button>
      <div class="checkbox">
        <Checkbox v-model="single">记住我</Checkbox>
      </div>
      <Divider />
      <div class="register">
        <p>
          还没有账号？点击 <router-link to="/register">此处</router-link> 注册
        </p>
      </div>
    </div>
    <!-- <Button @click="logout">注销</Button> -->
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import { login, user } from "../services/api";
import {
  USER_EMAIL,
  USER_PASSWORD,
  REMEMBER_STATUS,
  TOKEN,
  USER_INFO
} from "../utils/Constants";

export default {
  name: "Login",
  data: () => ({
    email: "",
    password: "",
    single: false
  }),
  methods: {
    async login() {
      if (this.email && this.password) {
        if (this.single) {
          localStorage.setItem(REMEMBER_STATUS, this.single);
          localStorage.setItem(USER_EMAIL, this.email);
          localStorage.setItem(USER_PASSWORD, this.password);
        } else {
          localStorage.removeItem(USER_EMAIL);
          localStorage.removeItem(USER_PASSWORD);
          localStorage.removeItem(REMEMBER_STATUS);
        }
        this.$Loading.start();
        let loginData = {};
        loginData.email = this.email;
        loginData.password = this.password;
        await login(loginData)
          .then(res => {
            if (res.data) {
              localStorage.setItem(TOKEN, res.data.token);
              localStorage.setItem(
                USER_INFO,
                JSON.stringify(res.data.userInfo)
              );
              setTimeout(() => {
                this.$Loading.finish();
                this.$Message.success("登录成功!");
              }, 500);
              setTimeout(() => {
                location.href = "/";
              }, 1500);
            } else {
              this.$Loading.error();
              this.$Message.error("登录失败，请稍候重试！");
            }
            return res;
          })
          .catch(err => {
            this.$Loading.error();
            console.log("err :", err);
          });
      } else {
        this.$Message.info("请完成表单");
      }
    },
    logout() {
      localStorage.removeItem(TOKEN);
    }
  },
  mounted() {
    if (localStorage.getItem(REMEMBER_STATUS)) {
      this.single = true;
      if (localStorage.getItem(USER_PASSWORD)) {
        this.email = localStorage.getItem(USER_EMAIL);
        this.password = localStorage.getItem(USER_PASSWORD);
      }
    }
  }
};
</script>
<style lang="css" scoped>
body,
html {
  height: 100%;
}
.main {
  background-color: #f8f8f9;
  padding: 1rem;
  height: 49rem;
}
.login {
  margin: 2rem auto;
  width: 25rem;
  height: 30rem;
  background-color: white;
  padding: 1.5rem 2rem;
  border: 1px solid #e9ebee;
}
.login > p {
  margin: 6px 0px 20px;
  font-size: 2rem;
  line-height: 3.2rem;
}
.login > input {
  padding: 0.75rem;
  /* border-color: #dcdee2; */
  width: 100%;
  border: 1px solid #dcdee2;
}
.login > input:last-of-type {
  margin: 1rem 0px;
}

.btn-login {
  padding: 0px 1rem;
  height: 2.5rem;
  line-height: 2.6rem;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 15px;
}
.link-forget {
  padding: 10px 10px 10px 0;
  margin-bottom: 18px;
  font-size: 12px;
  line-height: 20px;
  height: 20px;
}
.checkbox {
  text-align: right;
}
.register {
  font-size: 13px;
}
</style>
