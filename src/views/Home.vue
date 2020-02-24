<template>
  <div class="home">
    <Button @click="logout">注销</Button>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
// eslint-disable-next-line no-unused-vars
import { TOKEN, USER_INFO } from "../utils/Constants";
export default {
  name: "Home",
  components: {},
  data: () => ({
    msg: "home",
    token: "",
    website: ""
  }),
  mounted() {
    console.log("object :", JSON.parse(localStorage.getItem(USER_INFO)));
  },
  methods: {
    getMsg() {
      this.$axios
        .put(
          "/api/users",
          {
            website: this.website
          },
          {
            headers: {
              token: this.token
            }
          }
        )
        .then(({ data }) => {
          console.log("data :", data);
        });
    },
    me() {
      this.$axios
        .get("/api/users", {
          headers: {
            token: this.token
          }
        })
        .then(({ data }) => {
          console.log("data :", data);
        });
    },
    logout() {
      localStorage.removeItem(TOKEN);
      location.href = "/";
    }
  }
};
</script>
<style lang="css" scoped>
.home {
  height: 150vh;
}
</style>
