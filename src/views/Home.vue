<template>
  <div class="home"></div>
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
