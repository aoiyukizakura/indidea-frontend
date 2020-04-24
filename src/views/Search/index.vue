<!-- eslint-disable vue/valid-v-bind
 * @Author: Morpho Sylvie
 * @Date: 2020-03-18 10:15:15
 * @LastEditTime: 2020-03-19 11:03:47
 * @FilePath: \indidea-frontend\src\views\Search\Search.vue
 * @Description: 
 -->
<template>
  <div>
    <div class="search-header">
      <div>
        <div class="search-container">
          <div>
            <div class="search-content">
              <div class="search-content-input">
                <i-input
                  v-model="query.keyword"
                  size="large"
                  placeholder="关键词"
                  search
                  enter-button
                  @on-search="doSearch"
                />
              </div>
              <div class="search-content-filter">
                <span class="label" selected>分类</span>
                <div class="select">
                  <Select
                    @on-change="changeSelect"
                    v-model="query.categoryId"
                    size="large"
                  >
                    <i-option :value="0">全部</i-option>
                    <i-option
                      v-for="(item, index) in categories"
                      :value="item.id"
                      :key="index"
                    >
                      {{ item.name }}
                    </i-option>
                  </Select>
                </div>
                <span class="label">排序方式</span>
                <div class="select">
                  <Select
                    @on-change="changeSelect"
                    v-model="query.sort"
                    size="large"
                  >
                    <i-option
                      v-for="(item, index) in sort"
                      :value="item.id"
                      :key="index"
                    >
                      {{ item.name }}
                    </i-option>
                  </Select>
                </div>
                <span class="label">项目状态</span>
                <div class="select">
                  <Select
                    @on-change="changeSelect"
                    v-model="query.status"
                    size="large"
                  >
                    <i-option
                      v-for="(item, index) in project_status"
                      :value="item.id"
                      :key="index"
                    >
                      {{ item.name }}
                    </i-option>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="search-result">
      <div>
        <div class="search-result-cantainer">
          <h3 v-if="total_num > 0">
            一共有 <span>{{ total_num }}</span> 个项目等你探索
          </h3>
          <h3 v-else>
            暂无结果
          </h3>
          <div>
            <Row class="search-result-row">
              <i-col span="8" v-for="(item, index) in projectList" :key="index">
                <ResultCard
                  :data="item"
                  @click.native="toDetail(item.id)"
                ></ResultCard>
                <!-- {{ item.id }} -->
              </i-col>
            </Row>
          </div>
        </div>
      </div>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
    <div class="load-more">
      <span v-if="toEnd" @click="loadmore">
        <Icon :class="loading ? ' refresh-loading' : ''" type="md-refresh" />
        加载更多
      </span>
      <span v-else> 没有更多了 </span>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import "../../assets/scss/search.scss";
import Footer from "../../components/Footer/index";
import ResultCard from "../../components/Search/ResultCard";
import { searchProject } from "../../services/api/project";
import { category } from "../../services/api";
export default {
  name: "Search",
  components: {
    Footer,
    // eslint-disable-next-line vue/no-unused-components
    ResultCard
  },
  data() {
    return {
      total_num: 0,
      test: 2,
      query: {
        keyword: "",
        sort: 0,
        categoryId: 0,
        status: 1,
        page: 0
      },
      categories: [],
      sort: [
        {
          id: 0,
          name: "默认"
        },
        {
          id: 1,
          name: "最新的项目"
        },
        {
          id: 2,
          name: "点击最多"
        },
        {
          id: 3,
          name: "结束日期"
        },
        {
          id: 4,
          name: "最多筹款"
        }
      ],
      project_status: [
        {
          id: 1,
          name: "进行中"
        },
        {
          id: 0,
          name: "已过期"
        }
      ],
      projectList: [],
      loading: false,
      spinShow: false
    };
  },
  created() {
    let route = this.$route;
    this.initThisPage(route);
    this.getCategories();
    this.searchProject();
  },
  watch: {
    $route(to) {
      this.initThisPage(to);
      this.searchProject();
    }
  },
  methods: {
    initThisPage(route) {
      let categoryId = route.query.categoryId;
      let sort = route.query.sort;
      let keyword = route.query.keyword;
      let status = route.query.status;
      this.query.categoryId = categoryId ? parseInt(categoryId) : 0;
      this.query.sort = sort ? parseInt(sort) : 0;
      this.query.keyword = keyword ? keyword : "";
      this.query.status = status || status == "0" ? parseInt(status) : 1;
    },
    searchProject() {
      searchProject(this.query).then(res => {
        this.projectList = res.data.list;
        this.total_num = res.data.total;
      });
    },
    getCategories() {
      category().then(res => {
        this.categories = res.data;
      });
    },
    doSearch() {
      this.query.page = 0;
      this.searchProject();
    },
    changeSelect() {
      this.query.page = 0;
      this.spinShow = true;
      setTimeout(() => {
        this.$router.replace({
          query: {
            categoryId: this.query.categoryId,
            sort: this.query.sort,
            status: this.query.status,
            keyword: this.query.keyword
          }
        });
        this.spinShow = false;
      }, 500);
    },
    loadmore() {
      this.query.page++;
      this.loading = true;
      setTimeout(() => {
        searchProject({ ...this.query }).then(res => {
          this.loading = false;
          // this.projectList = this.projectList.concat(res.data.list);
          this.projectList.push.apply(this.projectList, res.data.list);
        });
      }, 1000);
    },
    toDetail(id) {
      console.log("id :", id);
      this.$router.push("/project-detail/" + id);
    }
  },
  computed: {
    toEnd() {
      if (this.projectList.length !== this.total_num) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
