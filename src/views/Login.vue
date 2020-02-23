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
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import { login, user } from "../services/api";

export default {
  name: "Login",
  data: () => ({
    email: "",
    password: "",
    single: false
  }),
  methods: {
    async login() {
      this.$Loading.start();
      let loginData = {};
      loginData.email = this.email;
      loginData.password = this.password;
      await login(loginData)
        .then(res => {
          localStorage.setItem("token", res.data);
          setTimeout(() => {
            this.$Loading.finish();
          }, 500);
          return res;
        })
        .catch(err => {
          this.$Loading.error();
          console.log("err :", err);
        });
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
