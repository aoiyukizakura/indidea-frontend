<!--
 * @Author: Morpho Sylvie
 * @Date: 2020-03-20 11:08:30
 * @LastEditTime: 2020-03-21 21:12:59
 * @FilePath: \indidea-frontend\src\views\ProjectDetail\children\FQA.vue
 * @Description: 
 -->
<template>
  <div class="fqa-main">
    <Row class="fqa-main-header">
      <i-col span="16">
        <h3>常见问题</h3>
      </i-col>
    </Row>
    <Row v-if="fqaList.length" class="fqa-main-none">
      <div>
        <p>这里还没有人来提问过，你可以向发起人提问</p>
        <div>提问</div>
      </div>
    </Row>
    <Row v-else class="fqa-main-content">
      <i-col span="16">
        <ul>
          <li></li>
        </ul>
      </i-col>
    </Row>
  </div>
</template>
<script>
export default {
  name: "FQA",
  data: () => ({
    fqaList: []
  })
};
</script>
<style lang="scss" scoped>
@mixin base-container {
  max-width: 1140px;
  padding-right: 60px;
  padding-left: 60px;
  margin-right: auto;
  margin-left: auto;
}

.fqa-main {
  @include base-container();
  &-header {
    .ivu-col {
      padding: 0 18px;
      margin-bottom: 30px;
      h3 {
        font-weight: 400;
        font-size: 24px;
        line-height: 30px;
      }
    }
  }
  &-none {
    & > div {
      p {
        margin-bottom: 36px;
        font-size: 16px;
        line-height: 24px;
      }
      div {
        padding: 12px 42px;
        border: 1px solid #dedede;
        box-sizing: inherit;
        display: inline-block;
        background-color: #282828;
        color: white;
        letter-spacing: 2px;
        font-size: 16px;
        font-weight: 500;
        transition: all 200ms;
        cursor: pointer;
        &:hover {
          transform: translateY(2px);
          outline: 1px solid #13adaa;
        }
      }
    }
  }
}
</style>
