<template>
  <div class="home">
    <input v-model="website" type="text" placeholder="邮箱" />
    <input v-model="token" type="text" />
    {{ msg }}
    <button @click="getMsg">
      get
    </button>
    <button @click="me">
      me
    </button>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {},
  data: () => ({
    msg: "home",
    token: "",
    website: ""
  }),
  mounted() {},
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
    }
  }
};
</script>
