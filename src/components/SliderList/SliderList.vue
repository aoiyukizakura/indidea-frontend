<!-- eslint-disable vue/no-unused-vars -->
<!--
 * @Author: Morpho Sylvie
 * @Date: 2020-02-28 22:25:44
 * @LastEditTime: 2020-02-28 22:35:14
 * @FilePath: \indidea-frontend\src\components\SliderList.vue
 * @Description: 
 -->
<template>
  <!-- Make a div wrapped slider,set height and width -->
  <div style="width:100%;margin:20px auto;height:400px">
    <!-- Using the slider component -->
    <slider
      ref="slider"
      :options="options"
      @slide="slide"
      @tap="onTap"
      @init="onInit"
    >
      <!-- slideritem wrapped package with the components you need -->
      <template slot-scope="coverflow">
        <slideritem
          v-for="(item, index) in someList"
          :pageLength="someList.length"
          :index="index"
          :key="index"
          :style="item.style"
          >{{ item.html }}</slideritem
        >
      </template>
      <!-- Customizable loading -->
      <div slot="loading">loading...</div>
    </slider>
  </div>
</template>
<script>
// import slider components
import { slider, slideritem } from "vue-concise-slider";
export default {
  name: "SliderList",
  el: "#home",
  data() {
    return {
      //data list [array]
      someList: [
        {
          html: "slider1",
          style: {
            background: "#4abf8a",
            width: "33.33333333%"
          }
        },
        {
          html: "slider2",
          style: {
            background: "#4bbfc3",
            width: "33.33333333%"
          }
        },
        {
          html: "slider3",
          style: {
            background: "#7baabe",
            width: "33.33333333%"
          }
        },
        {
          html: "slider4",
          style: {
            background: "#4abf8a",
            width: "33.33333333%"
          }
        },
        {
          html: "slider5",
          style: {
            background: "#4bbfc3",
            width: "33.33333333%"
          }
        },
        {
          html: "slider6",
          style: {
            background: "#7baabe",
            width: "33.33333333%"
          }
        }
      ],
      //Slider configuration [obj]
      options: {
        effect: "coverflow",
        currentPage: 0,
        thresholdDistance: 100,
        thresholdTime: 300,
        deviation: 200,
        widthScalingRatio: 0.8,
        heightScalingRatio: 0.8,
        slidesToScroll: 1,
        loop: true
      }
    };
  },
  components: {
    slider,
    slideritem
  }
};
</script>
