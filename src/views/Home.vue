<template>
  <div class="home" id="home">
    <SortCard :categories="categories"></SortCard>
    <div class="main-page">
      <div class="main-container">
        <Row type="flex">
          <i-col span="12">
            <div class="main-content">
              <h3>精选内容</h3>
              <div class="hover-target">
                <div
                  class="img-content"
                  @click="
                    $router.push('/project-detail/' + featuredProjectData.id)
                  "
                >
                  <img
                    src="../assets/default.png"
                    v-real-img="featuredProjectData.pic"
                    alt
                  />
                  <i-progress
                    :percent="
                      (featuredProjectData.getpoint /
                        featuredProjectData.targetpoint) *
                        100
                    "
                    :stroke-width="14"
                    hide-info
                  ></i-progress>
                </div>
                <!-- <div
                  class="sub-btn"
                  @click="saveProject(featuredProjectData.id)"
                > -->
                <!-- <Icon size="20" type="md-heart-outline" /> -->
                <!-- </div> -->
                <router-link :to="'/project-detail/' + featuredProjectData.id">
                  <h3 class="title">{{ featuredProjectData.title }}</h3>
                  <p class="subtitle">{{ featuredProjectData.subtitle }}</p>
                </router-link>
                <div class="owner-title">
                  <div>
                    <span>发起人：</span>
                    <span>{{ featuredProjectData.owner.username }}</span>
                  </div>
                </div>
              </div>
            </div>
          </i-col>
          <i-col span="12">
            <div class="main-content">
              <h3>发现更多</h3>
              <div class="project-list">
                <template v-for="(data, index) in projectListData">
                  <template
                    v-if="index + 1 <= 3 * page && index + 1 > 3 * (page - 1)"
                  >
                    <ProjectList
                      @click.native="$router.push('/project-detail/' + data.id)"
                      :key="index"
                      :project="data"
                    ></ProjectList>
                    <Divider :key="index + 100"></Divider>
                  </template>
                </template>
                <Page
                  :total="9"
                  :page-size="3"
                  :current="page"
                  @on-change="changeeeeeeee($event)"
                  size="small"
                ></Page>
              </div>
            </div>
          </i-col>
        </Row>
      </div>
    </div>
    <Divider style="margin: 0;"></Divider>
    <div class="main-page">
      <div class="s-container">
        <div class="s-content">
          <div>
            <Row type="flex" class="s-content-title">
              <i-col span="12">
                <div>
                  <h3>当前最热</h3>
                  <router-link to="/search/?categoryId=0&sort=2&status=1">
                    查看更多
                  </router-link>
                  <Icon style="color: #a860c7;" type="ios-arrow-forward" />
                </div>
              </i-col>
              <i-col span="12">
                <div>
                  <Icon
                    size="24"
                    @click="$refs.slider1.$emit('slidePre')"
                    type="md-arrow-dropleft"
                  />
                  <Icon
                    size="24"
                    @click="$refs.slider1.$emit('slideNext')"
                    type="md-arrow-dropright"
                  />
                </div>
              </i-col>
            </Row>
            <!-- <Row type="flex" :style="ListStyle">
              <i-col span="1"></i-col>
            </Row>-->
            <div style="width:100%;margin:0px auto;height: 600px">
              <!-- Using the slider component -->
              <slider ref="slider1" :options="options">
                <!-- slideritem wrapped package with the components you need -->
                <!-- eslint-disable-next-line vue/no-unused-vars -->
                <template slot-scope="coverflow">
                  <slideritem
                    v-for="n in 3"
                    :key="n"
                    :pageLength="3"
                    :index="n - 1"
                  >
                    {{ coverflow }}
                    <Row
                      class="slider-row"
                      type="flex"
                      justify="space-between"
                      :gutter="16"
                    >
                      <i-col v-for="m in 4" :key="m" span="6">
                        <template v-if="topHitData.length">
                          <HotCard
                            :project="topHitData[(n - 1) * 4 + m - 1]"
                            @click.native="
                              $router.push(
                                '/project-detail/' +
                                  topHitData[(n - 1) * 4 + m - 1].id
                              )
                            "
                          ></HotCard>
                        </template>
                      </i-col>
                    </Row>
                  </slideritem>
                </template>
                <!-- Customizable loading -->
                <div slot="loading">loading...</div>
              </slider>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
// eslint-disable-next-line no-unused-vars
import { TOKEN, USER_INFO } from "../utils/Constants";
import ProjectList from "../components/ProjectList/ProjectList";
// eslint-disable-next-line no-unused-vars
import {
  getTop9Projects,
  getFeatured,
  getTopHitProject,
  category
} from "../services/api";
import { slider, slideritem } from "vue-concise-slider";
import HotCard from "../components/HotCard/HotCard";
import SortCard from "../components/SortCard/SortCard";
import Footer from "@/components/Footer/Footer";

export default {
  name: "Home",
  components: {
    ProjectList,
    slider,
    slideritem,
    // eslint-disable-next-line vue/no-unused-components
    HotCard,
    SortCard,
    Footer
  },
  data() {
    return {
      msg: "home",
      token: "",
      website: "",
      projectListData: [
        {
          id: "1",
          title:
            "卑鄙的外乡人必杀手册终极无敌上帝视角之超级终极无敌蛇皮棒棒仙女魔女版",
          owner: {
            username: "大头哥"
          },
          targetpoint: 7000,
          img:
            "https://ksr-static.imgix.net/rocketbook-f27440c.png?ixlib=rb-2.1.0&s=a43eac9908449033eff9fba77600e322",
          getpoint: 220,
          targetdate: "2020-02-27"
        }
      ],
      page: 1,
      ListStyle: {
        left: 0 + "px"
      },
      //Slider configuration [obj]
      options: {
        effect: "coverflow",
        currentPage: 0,
        thresholdDistance: 100,
        thresholdTime: 300,
        deviation: 200,
        widthScalingRatio: 0.8,
        heightScalingRatio: 0.85,
        slidesToScroll: 1,
        loop: true,
        pagination: false
      },
      featuredProjectData: { owner: {} },
      topHitData: [],
      categories: []
    };
  },
  mounted() {
    getTop9Projects().then(res => {
      this.projectListData = res.data;
    });
    getFeatured().then(res => {
      this.featuredProjectData = res.data;
    });
    getTopHitProject().then(res => {
      this.topHitData = res.data;
    });
    category().then(res => {
      if (!res.data) {
        this.categories = ["独立游戏", "电影"];
      } else {
        this.categories = res.data;
      }
    });
  },
  methods: {
    changeeeeeeee($event) {
      this.page = $event;
    },
    saveProject(projectId) {
      console.log("saved", projectId);
    }
  },
  computed: {}
};
</script>
<style lang="css" scoped>
.home {
  height: 150vh;
}
.main-page {
  /* background-color: blueviolet; */
  height: auto;
}

.main-container {
  /* background-color: chartreuse; */
  max-width: 1366px;
  padding: 0px 60px;
  margin: 0px auto;
  /* height: 500px; */
}

.main-container .ivu-row-flex {
  padding-bottom: 4.2rem;
}
/* .main-container .ivu-col {
  height: 50px;
} */
.main-container .ivu-col:first-of-type {
  padding-right: 3.5rem;
  padding-top: 1.5rem;
  margin-top: 2rem;
  /* background-color: aliceblue; */
  border-right: 1px solid rgb(232, 232, 232);
}
.main-container .ivu-col:last-of-type {
  padding-left: 3.5rem;
  padding-top: 1.5rem;
  margin-top: 2rem;
  /* background-color: aliceblue; */
}
.main-content {
  /* background-color: firebrick; */
  position: relative;
  /* height: 200px; */
}
.main-content > h3 {
  margin-bottom: 1.1rem;
  color: #656969;
}
.img-content >>> .ivu-progress-inner,
.img-content >>> .ivu-progress-bg,
.img-content >>> .ivu-progress-success-bg {
  border-radius: 0px !important;
}
.img-content >>> .ivu-progress {
  padding: 0 !important;
  margin: 0 !important;
  bottom: 0;
  font-size: 0;
}
.img-content {
  position: relative;
  font-size: 0;
}
.img-content img {
  width: 100%;
  max-width: 100%;
  padding: 0;
  margin: 0;
  /* vertical-align: middle; */
}
.hover-target {
  position: relative;
  /* height: 500px; */
  cursor: pointer;
}
.hover-target:hover .sub-btn {
  opacity: 1;
  /* top: 0px; */
  top: 20px;
  right: 20px;
  height: 34px;
  /* height: 50px; */
}
.sub-btn {
  position: absolute;
  background-color: white;
  border-radius: 50%;
  /* border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px; */
  text-align: center;
  display: flex;
  justify-items: center;
  align-items: center;
  justify-content: center;
  /* height: 0px; */
  height: 34px;
  width: 34px;
  opacity: 0;
  transition: all 200ms ease-in-out 0ms;
  top: -10px;
  right: 20px;
  /* cursor: pointer; */
}
.sub-btn:hover {
  transform: scale(1.2);
}
.sub-btn .ivu-icon {
  font-weight: bold;
}
.hover-target .title {
  padding-top: 1.1rem;
  padding-bottom: 0.9rem;
  font-weight: 400;
  color: black;
  font-size: 1.7rem;
  line-height: 2.4rem;
}
.hover-target .subtitle {
  padding-bottom: 1.5rem;
  color: #282828;
  font-size: 1.1rem;
  line-height: 1.8rem;
  font-weight: 100;
}
.hover-target:hover >>> .title {
  text-decoration-line: underline;
  color: #587058;
  text-decoration-color: #587058;
}
/* .owner-title {
} */
/* .owner-title > div {
} */
.owner-title > div span:first-of-type {
  font-size: 0.8rem;
  line-height: 1.2rem;
  color: #656969;
}
.owner-title > div span:last-of-type {
  font-size: 0.7rem;
  line-height: 1.2rem;
  color: #656969;
}
.owner-title > div span:last-of-type:hover {
  text-decoration-line: underline;
}
/* .project-list {
  height: 380px;
} */
.s-container {
  max-width: 1366px;
  padding: 0px 60px;
  margin: 0px auto;
  /* background-color: #656969; */
}
.s-content {
  padding: 3rem 0;
  /* background-color: violet; */
  height: 500px;
  overflow: hidden;
  position: relative;
}
.s-content-title {
  margin-bottom: 1.2rem;
}
.s-content-title .ivu-col {
  /* background-color: white; */
  /* height: 1rem; */
  line-height: 24px;
  font-size: 13px;
}
.s-content-title .ivu-col:first-child h3 {
  float: left;
  margin-right: 24px;
  font-size: 16px;
  font-weight: 700px;
  color: #656969;
}
.s-content-title .ivu-col:first-child a {
  color: #a860c7;
}
.s-content-title .ivu-col:first-child a:hover {
  color: #a860c7;
  text-decoration-line: underline;
}
.s-content-title .ivu-col:last-child div {
  /* background-color: white; */
  display: flex;
  justify-content: flex-end;
  justify-items: flex-end;
}
.s-content-title .ivu-col:last-child .ivu-icon {
  margin-left: 24px;
  cursor: pointer;
  transition: all 200ms;
  border-radius: 50%;
}
.s-content
  > div
  .ivu-row-flex:first-of-type
  .ivu-col:last-child
  .ivu-icon:hover {
  transform: scale(1.5);
}
.slider-item {
  width: 100%;
  /* height: 98%; */
  background-color: white;
  /* -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  border-color: #eee; */
}
.slider-row {
  width: 100%;
  height: 100%;
  margin: 0 !important;
}
.slider-row > .ivu-col {
  height: 100%;
}
</style>
