<!--
 * @Author: Morpho Sylvie
 * @Date: 2020-04-02 20:22:10
 * @LastEditTime: 2020-04-02 20:37:49
 * @FilePath: \indidea-frontend\src\components\PostList\PostList.vue
 * @Description: 
 -->
<template>
  <div>
    <List item-layout="vertical">
      <ListItem v-for="item in data" :key="item.title">
        <ListItemMeta
          :avatar="item.avatar"
          :title="item.username"
          :description="item.createdat"
        />
        {{ item.content }}
        <template slot="action">
          <li><Icon type="ios-thumbs-up-outline" /> {{ item.like_count }}</li>
          <li>
            <Icon type="ios-chatbubbles-outline" /> {{ item.comment_count }}
          </li>
        </template>
        <template slot="extra">
          <img src="../../assets/default.png" style="width: 280px" />
        </template>
      </ListItem>
    </List>
  </div>
</template>
<script>
export default {
  name: "PostList",
  props: {
    data: []
  },
  data() {
    return {};
  }
};
</script>
