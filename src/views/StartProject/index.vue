<!--
 * @Author: Morpho Sylvie
 * @Date: 2020-03-01 17:40:20
 * @LastEditTime: 2020-04-24 15:00:00
 * @FilePath: \indidea-frontend\src\views\StartProject\index.vue
 * @Description: 发起项目
 -->
<template>
  <div class="start-container">
    <div class="start-step">
      <Steps :current="content.current">
        <Step title="选择类别"></Step>
        <Step title="谈谈的你想法"></Step>
        <Step title="完成"></Step>
      </Steps>
    </div>
    <Row class="start-content" type="flex" justify="center">
      <i-col span="12">
        <div class="content-content">
          <h2>{{ content.h2content }}</h2>
          <h3>{{ content.h3content }}</h3>
          <div>
            <Select
              @on-change="selectChange"
              v-if="content.select"
              v-model="startData.categoryId"
              size="large"
            >
              <Option
                v-for="(value, index) in categories"
                :key="index"
                :value="value.id"
                >{{ value.name }}</Option
              >
            </Select>
            <Input
              class="content-input"
              v-model="startData.subtitle"
              v-if="content.input"
              maxlength="140"
              show-word-limit
              type="textarea"
              placeholder="一个比小岛秀夫还具有创新，比宫崎英高还要折磨人，比五十岚孝司还要硬核的独立游戏。。。"
              :rows="6"
              @on-change="inputChange"
            />
            <div v-if="content.img" class="img-box">
              <img src="../../assets/img/nyan-cat-gif-png-1.gif" />
            </div>
          </div>
        </div>
        <Divider />
      </i-col>
    </Row>
    <div class="start-controller">
      <Row class="controller-row" type="flex" justify="center">
        <i-col class="controller-col" span="12">
          <Button type="primary" :disabled="content.disabled" @click="next">
            下一步
          </Button>
          <p @click="pre">
            <Icon
              size="24"
              v-if="content.preicon"
              type="md-arrow-dropleft"
              style="margin:auto 0;"
            />
            {{ content.precontent }}
          </p>
        </i-col>
      </Row>
    </div>
  </div>
</template>
<script>
import "../../assets/scss/start-project.scss";
import { category, createProject } from "../../services/api";
export default {
  name: "StartProject",
  data() {
    return {
      startData: {},
      categories: [],
      single: false,
      content1: {
        current: 0,
        h2content: "让我们来一起为这个想法分一个类。",
        h3content: "从以下的分类里面挑选一个最适合您想法的，之后您可以随时更新",
        precontent: "你也要想来一发吗？赶紧行动吧",
        // preicon: false,
        disabled: true,
        select: true
      },
      content2: {
        current: 1,
        h2content: "描述一下您将要发起什么样的方案",
        h3content: "放心，您可以在稍后的详细设置中再次更改",
        precontent: "回到分类",
        preicon: true,
        disabled: true,
        input: true
      },
      content3: {
        current: 2,
        h2content: "准备好实现你的想法了吗，让我们开始吧！",
        h3content: "在开始前请仔细阅读本网站的相关条例，祝您生活愉快",
        precontent: "回到方案想法",
        disabled: false,
        preicon: true,
        img: true
      },
      content: {
        current: 0,
        h2content: "让我们来一起为这个想法分一个类。",
        h3content: "从以下的分类里面挑选一个最适合您想法的，之后您可以随时更新",
        precontent: "你也要想来一发吗？赶紧行动吧",
        disabled: true,
        select: true
      }
    };
  },
  methods: {
    next() {
      switch (this.content.current) {
        case 0:
          this.content = this.content2;
          break;
        case 1:
          this.content = this.content3;
          break;
        case 2:
          this.$Spin.show({
            render: h => {
              return h("div", [
                h("Icon", {
                  class: "demo-spin-icon-load",
                  props: {
                    type: "ios-loading",
                    size: 24
                  }
                }),
                h("div", "Loading")
              ]);
            }
          });
          setTimeout(() => {
            this.$Spin.hide();
            this.startProject();
          }, 1000);
          break;
        default:
          break;
      }
    },
    pre() {
      switch (this.content.current) {
        case 0:
          break;
        case 1:
          this.content = this.content1;
          break;
        case 2:
          this.content = this.content2;
          break;
        default:
          break;
      }
    },
    selectChange() {
      this.content.disabled = false;
      this.content1.disabled = false;
    },
    inputChange() {
      if (this.startData.subtitle) {
        this.content.disabled = false;
        this.content2.disabled = false;
      } else {
        this.content.disabled = true;
        this.content2.disabled = true;
      }
    },
    startProject() {
      createProject(this.startData).then(res => {
        if (res.data) {
          this.$router.push("/editProject/" + res.data.id);
        } else {
          this.$Message.info("未知错误，请稍后再试！");
        }
      });
    }
  },
  computed: {},
  components: {},
  mounted() {
    category().then(res => {
      this.categories = res.data;
    });
  }
};
</script>
