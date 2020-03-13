<!--
 * @Author: Morpho Sylvie
 * @Date: 2020-03-13 13:55:44
 * @LastEditTime: 2020-03-13 23:08:10
 * @FilePath: \indidea-frontend\src\views\editdetail\Reward.vue
 * @Description: 
 -->
<template>
  <div>
    <div class="reward-info">
      <div class="info-header">
        <div>
          <Row type="flex" justify="center">
            <i-col span="16">
              <div>
                <h1>新增奖励阶梯</h1>
                <p>
                  给支持者们提供一些简单的或者有意义的回报，
                  也可以是该项目本身，或者是一些特殊的待遇，
                  让他们出现在幕后名单上也许是不错的选择
                </p>
              </div>
            </i-col>
          </Row>
        </div>
      </div>
      <div class="reward-edit-content">
        <Row>
          <i-col class="reward-col" span="24">
            <div class="reward-header">
              <div class="flex-header">
                <div class="flex-header-left">
                  <div>奖励阶梯</div>
                  <div>
                    <span>
                      提供一个奖励阶梯是好的事情，但是请不要给用户太多的选择
                    </span>
                  </div>
                </div>
                <Button type="primary" icon="md-add">新增</Button>
              </div>
            </div>
            <Row class="reward-table-header">
              <i-col span="6"><span>达成金额</span></i-col>
              <i-col span="10"><span>奖励标题</span></i-col>
              <i-col span="8"><span>概述列表</span></i-col>
            </Row>
            <div class="reward-table">
              <Row class="reward-table-content">
                <i-col span="6">
                  <div class="reward-point">
                    <span>RMB￥ 100</span>
                  </div>
                </i-col>
                <i-col span="10">
                  <div class="table-content-name">
                    <h3>铜牌赞助人</h3>
                    <div>
                      <span>发放时间</span>
                      <span style="margin-left: 6px;">2020年11月</span>
                    </div>
                  </div>
                </i-col>
                <i-col span="8">
                  <div class="table-content-itemlist">
                    <ul>
                      <li>一份电影的拷贝</li>
                      <li>mini OST</li>
                    </ul>
                  </div>
                </i-col>
              </Row>
              <Row></Row>
            </div>
          </i-col>
        </Row>
      </div>
    </div>
  </div>
</template>
<script>
import "../../assets/css/project/rewardInfo.scss";
export default {
  name: "reward"
};
</script>
