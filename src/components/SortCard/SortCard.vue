<!--
 * @Author: Morpho Sylvie
 * @Date: 2020-03-01 19:02:40
 * @LastEditTime: 2020-03-01 19:08:13
 * @FilePath: \indidea-frontend\src\components\SortCard.vue
 * @Description: 
 -->
<template>
  <div class="sort">
    <Row type="flex" justify="center">
      <template v-for="(category, index) in categories">
        <i-col span="2" :key="index">
          <p style="text-align: center;">
            <router-link class="hvr-outline-out" :to="'/sort/' + category.id">{{
              category.name
            }}</router-link>
          </p>
        </i-col>
      </template>
    </Row>
  </div>
</template>
<script>
export default {
  name: "SortCard",
  props: {
    categories: Array
  }
};
</script>
<style lang="css" scoped>
.sort {
  height: 4rem;
  overflow: hidden;
  transition: all 0.3s;
  line-height: 4rem;
  border-bottom: 1px solid #dcdee2;
  font-size: 1rem;
  padding: 0 5rem;
  background-color: white;
}
</style>
