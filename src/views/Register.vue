<template>
  <div class="main">
    <div class="login">
      <p>已有账号？去 <router-link to="/login">登录</router-link></p>
    </div>
    <div class="register">
      <p>注册</p>
      <input v-model="registerData.username" type="text" placeholder="姓名" />
      <input v-model="registerData.email" type="text" placeholder="电子邮箱" />
      <input
        v-model="registerData.password"
        type="password"
        placeholder="密码"
      />

      <div class="checkbox">
        <Checkbox v-model="single"
          >同意并阅读了
          <router-link class="link-forget" to="/UsersandTermsofService"
            >用户与服务条款</router-link
          ></Checkbox
        >
      </div>
      <Button class="btn-register" type="primary" @click="register">
        注册
      </Button>
    </div>
  </div>
</template>
<script>
import { register } from "../services/api";
export default {
  name: "Register",
  data: () => ({
    single: false,
    registerData: {
      username: "",
      email: "",
      password: ""
    }
  }),
  methods: {
    async register() {
      if (
        this.registerData.username &&
        this.registerData.email &&
        this.registerData.password
      ) {
        if (this.single) {
          this.$Loading.start();
          await register(this.registerData)
            .then(res => {
              if (res.data) {
                this.$Loading.finish();
                this.$Message.success("注册成功，正在为您跳转到登录界面...");
                this.$router.push("/login");
              } else {
                this.$Loading.error();
                this.$Message.error(res.msg);
              }
            })
            .catch(err => {
              this.$Loading.error();
              this.$Message.error("出现错误");
              console.log("err :", err);
            });
        } else {
          this.$Message.info("请阅读并勾选用户与服务条款");
        }
      } else {
        this.$Message.info("请完成表单");
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
.register {
  margin: auto;
  width: 25rem;
  height: 28rem;
  background-color: white;
  padding: 20px 30px;
  border: 1px solid #e9ebee;
}
.register > p:first-of-type {
  margin: 0px 0px 20px;
  font-size: 2rem;
  line-height: 3.2rem;
}
.register > input {
  padding: 0.75rem;
  /* border-color: #dcdee2; */
  width: 100%;
  border: 1px solid #dcdee2;
}
.register > input {
  margin: 0.5rem 0px;
}

.btn-register {
  padding: 0px 1rem;
  height: 2.5rem;
  line-height: 2.6rem;
  width: 100%;
  margin-top: 15px;
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
  /* text-align: right; */
  margin-top: 10px;
}
.login {
  margin: 2rem auto 0;
  width: 25rem;
  border: 1px solid #e9ebee;
  border-bottom: none;
  text-align: center;
  padding: 20px;
  /* height: 3rem; */
  line-height: 1.2rem;
  font-size: 1rem;
  font-weight: 500;
  background-color: #fcfcfb;
}
</style>
