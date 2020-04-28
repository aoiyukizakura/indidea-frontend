<!--
 * @Author: Morpho Sylvie
 * @Date: 2020-04-02 16:05:32
 * @LastEditTime: 2020-04-28 22:32:22
 * @FilePath: \indidea-frontend\src\components\MutiUpload\index.vue
 * @Description: 
 -->
<template>
  <div>
    <div
      class="demo-upload-list"
      v-for="(item, index) in uploadList"
      :key="index"
    >
      <img
        style="object-fit:cover;"
        src="../../assets/default.png"
        v-real-img="item.name"
      />
      <div class="demo-upload-list-cover">
        <Icon
          type="ios-eye-outline"
          @click.native="handleView(item.name)"
        ></Icon>
        <Icon
          type="ios-trash-outline"
          @click.native="handleRemove(item)"
        ></Icon>
      </div>
    </div>
    <Upload
      ref="upload"
      :show-upload-list="false"
      :on-success="handleSuccess"
      :format="['jpg', 'jpeg', 'png']"
      :max-size="2048"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :before-upload="handleBeforeUpload"
      multiple
      type="drag"
      action="/api/uploadFile"
      name="file"
      style="display: inline-block;width:58px;"
    >
      <div style="width: 58px;height:58px;line-height: 58px;">
        <Icon type="ios-camera" size="20"></Icon>
      </div>
    </Upload>
    <Modal title="预览图片" v-model="visible">
      <img
        src="../../assets/default.png"
        v-real-img="imgName"
        v-if="visible"
        style="width: 100%"
      />
    </Modal>
  </div>
</template>

<script>
import { deleteFile } from "../../services/api";
export default {
  name: "MutipartUpload",
  data() {
    return {
      imgName: "",
      visible: false,
      uploadList: [],
      images: []
    };
  },
  methods: {
    handleView(name) {
      this.imgName = name;
      this.visible = true;
    },
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      this.images.splice(this.images.indexOf(file.name), 1);
      deleteFile(file.name);
      this.$emit("imagesList", this.images);
    },
    // eslint-disable-next-line no-unused-vars
    handleSuccess(res, file) {
      file.name = res.data;
      this.images.push(res.data);
      this.$emit("imagesList", this.images);
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc: "文件 " + file.name + " 不正确，请选择jpg，jpeg，png格式的图片"
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "超出图片大小限制",
        desc: "文件  " + file.name + " 太大了，不能超过2M"
      });
    },
    handleBeforeUpload() {
      this.uploadList = this.$refs.upload.fileList;
      const check = this.uploadList.length < 4;
      if (!check) {
        this.$Notice.warning({
          title: "最多只能上传4张"
        });
      }
      return check;
    },
    clearAll() {
      const fileList = this.$refs.upload.fileList;
      if (fileList.length) {
        this.$refs.upload.fileList.splice(0, fileList.length);
      }
    }
  },
  mounted() {
    this.uploadList = this.$refs.upload.fileList;
  }
};
</script>
<style scoped>
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
