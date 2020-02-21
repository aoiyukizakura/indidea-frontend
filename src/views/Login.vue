<template>
  <div>
    <div class="login">
      <input v-model="email" type="text" />
      <input v-model="password" type="password" />
      <Button @click="login"> login </Button>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data: () => ({
    email: "",
    password: ""
  }),
  methods: {
    login() {
      this.$axios
        .post(
          "/api/users/login",
          {
            email: this.email,
            password: this.password
          },
          {
            headers: {}
          }
        )
        .then(({ data }) => {
          console.log("res :", data);
        });
    }
  }
};
</script>
<style lang="css">
.login {
  margin: auto;
  width: 200px;
  height: 50px;
}
.login > input:last-of-type {
  margin: 10px 0px;
}
</style>
