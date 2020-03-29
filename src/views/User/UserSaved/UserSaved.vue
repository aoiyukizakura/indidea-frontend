<template>
  <div>
    <div>
      <ul>
        <li v-for="(item, index) in saveList" :key="index">
          <div class="content">
            <div @click="toDetail(item.project.id)">
              <div class="content-header-img">
                <img
                  src="../../../assets/default.png"
                  alt="..a1"
                  v-real-img="item.project.pic"
                />
              </div>
              <div class="content-header-info">
                <!-- <span> {{ item.project.category.name }} 项目 </span> -->
                <span class="title0">
                  {{ item.project.title ? item.project.title : "。。。" }}
                </span>
                <span class="owner0">
                  发起人：{{ item.project.owner.username }}
                </span>
                <span class="progress0">
                  筹集进度：
                  {{
                    parseInt(
                      (item.project.getpoint / item.project.targetpoint) * 100
                    )
                  }}
                  %
                </span>
                <span class="end-day0">
                  距离结束 {{ date(item.project.targetdate) }}
                </span>
                <p>收藏时间 {{ time(item.updatedat) }}</p>
              </div>
            </div>
            <span class="delete-btn" @click="deleteSave(item.project.id)">
              <Icon type="md-close" /> 删除
            </span>
          </div>
        </li>
      </ul>
    </div>
    <div class="load-more">
      <span @click="loading_more" v-if="!loading">
        {{ total == saveList.length ? "没有了" : "加载更多" }}
      </span>
      <img v-else src="../../../assets/loading2.gif" alt="loading" />
    </div>
  </div>
</template>
<script>
import { myFavProject } from "../../../services/api/user";
// eslint-disable-next-line no-unused-vars
import { saveProject } from "../../../services/api/project";
export default {
  name: "UserSaved",
  data() {
    return {
      saveList: [],
      index: 0,
      total: 0,
      loading: false
    };
  },
  methods: {
    init() {
      this.getList();
    },
    getList() {
      myFavProject(this.index, 3).then(res => {
        if (res.data) {
          // this.saveList = res.data.list;
          this.saveList.push.apply(this.saveList, res.data.list);
          this.total = res.data.total;
        }
      });
    },
    deleteSave(id) {
      this.$Modal.confirm({
        title: "确认操作",
        onOk: () => {
          saveProject(id, 0).then(res => {
            if (res.data) {
              this.$Message.success("取消成功");
              this.getList();
            } else this.$Message.info("网络错误");
          });
        }
      });
    },
    loading_more() {
      this.loading = true;
      setTimeout(() => {
        this.index++;
        this.getList();
        this.loading = false;
      }, 1000);
    },
    toDetail(id) {
      this.$router.push("/project-detail/" + id);
    },
    date(d) {
      let targetdate = new Date(d);
      let nowdate = new Date();
      let rest = targetdate.getTime() - nowdate.getTime();

      let day = parseInt(rest / (60 * 60 * 24 * 1000));
      return day > 0 ? day + "天" : "已过期";
    },
    time(t) {
      let date = new Date(t);
      return date.toLocaleString().replace(/\//g, "-");
    }
  },
  created() {
    this.init();
  }
};
</script>
<style lang="scss" scoped>
ul,
li {
  list-style: none;
  list-style: none;
}
ul {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
li {
  width: 100%;
  margin-bottom: 12px;
  padding: 0 9px;
}
.content {
  display: flex;
  position: relative;
  overflow: hidden;
  // align-items: center;
  z-index: 9 !important;
  cursor: pointer;
  padding: 18px;
  transition: all 200ms;
  border: 1px solid #d1dbd1;
  border-left-color: #d1dbd1;
  overflow: hidden;
  & > div {
    width: 100%;
    display: flex;
    // padding-left: 5px;
    // border-left: 1px solid #d1dbd1;
  }
  & > span {
    display: block;
    position: absolute;
    right: -120px;
    transition: all 200ms;
    z-index: 100 !important;
  }
  &:hover {
    border: 1px solid #bdbdbd;
    box-shadow: 0 2px 6px 1px rgba($color: #000000, $alpha: 0.17);
    span {
      right: 20px;
      cursor: pointer;
    }
    div {
      border-color: #00000000;
    }
  }
  .delete-btn {
    padding: 6px 12px;
    font-size: 12px;
    line-height: 18px;
    background-color: red;
    color: white;
    &:hover {
      transform: scale(1.1);
    }
  }
}
.content-header-img {
  img {
    width: 180px;
    font-size: 0;
    vertical-align: bottom;
    height: 100px;
    object-fit: cover;
  }
}
.content-header-info {
  position: relative;
  padding-left: 16px;
  width: 100%;
  overflow: hidden;
  span {
    display: block;
    font-size: 12px;
    line-height: 20px;
    color: #656969;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .title0 {
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
    margin-bottom: 12px;
    color: #282828;
    width: 100%;
  }
  .end-day0 {
    position: absolute;
    bottom: 0;
    left: 16px;
  }
  p {
    font-size: 12px;
    color: #696969;
    position: absolute;
    right: 0;
    bottom: 0;
  }
}
.page {
  position: absolute;
  bottom: 0;
}
.load-more {
  width: 100%;
  text-align: center;
  padding: 6px;
  padding: 12px;
  span {
    cursor: pointer;
    line-height: 24px;
    display: inline-block;
    &:hover {
      text-decoration: underline #282828;
    }
  }
  img {
    height: 24px;
  }
}
</style>
