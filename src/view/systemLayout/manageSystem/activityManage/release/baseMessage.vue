<template>
  <div class="base-message-box">
    <h2>
      基础信息
    </h2>
    <hr/>

    <!--    剪裁控件dialog-->

    <el-dialog title="图片剪裁" :visible.sync="dialogVisible" class="cropperDialog">
      <vueCropper
        style="height: 500px;width: 800px"
        ref="cropper"
        :img="option.img"
        :outputSize="option.size"
        :outputType="option.outputType"
        :info="true"
        :full="option.full"
        :canMove="option.canMove"
        :canMoveBox="option.canMoveBox"
        :original="option.original"
        :autoCrop="option.autoCrop"
        :autoCropWidth="option.autoCropWidth"
        :autoCropHeight="option.autoCropHeight"
        :fixedBox="option.fixedBox"
      ></vueCropper>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="Tailoring">确 定</el-button>
  </span>
    </el-dialog>

    <!--    活动基本信息  -->

    <el-form ref="form" :model="commitDetail" label-width="80px" size="small">
      <el-form-item label="活动名称">
        <el-input v-model="commitDetail.title" style="width: 220px"></el-input>
      </el-form-item>
      <el-form-item label="活动封面">
        <div class="activityImgDiv">
          <div style="height:200px;width: 350px;border-right: 1px">
            <img :src="commitDetail.img">
          </div>
          <div class="upload">
            <el-upload
              action
              :auto-upload="false"
              :limit="1"
              :on-change="uploadChange"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="活动日期">
        <el-date-picker type="date" placeholder="选择日期" v-model="commitDetail.time"></el-date-picker>
        <label style="margin-left: 10px;">集合时间:</label>
        <el-time-picker placeholder="选择时间" v-model="commitDetail.gatheringTime"
                        style="margin-left: 10px;"></el-time-picker>
        <label style="margin-left: 10px;">开始/出发时间:</label>
        <el-time-picker placeholder="选择时间" v-model="commitDetail.departureTime"
                        style="margin-left: 10px;"></el-time-picker>
      </el-form-item>
      <el-form-item label="人数限制">
        <el-input-number v-model="commitDetail.people" style="width: 150px" :min="0" :max="1000"
                         placeholder="如无限制输入0"></el-input-number>
      </el-form-item>
      <el-form-item label="活动性质">
        <el-radio-group v-model="commitDetail.type">
          <div style="display: flex">
            <el-radio label="free">免费</el-radio>
            <el-radio label="charge">收费</el-radio>
          </div>
        </el-radio-group>
        <span style="margin-left: 20px" v-if="commitDetail.type=='charge'">价格/人(元):
        <el-input-number v-model="commitDetail.pee"
                         style="width: 150px;margin-left: 10px" :min="0"
                         placeholder="输入每人报名费"></el-input-number>
          </span>
      </el-form-item>
      <el-form-item label="活动标签">
        <el-tag :key="tag" v-for="tag in commitDetail.tags" closable style="margin-right: 20px" :disable-transitions="false" @close="handleClose(tag)">
          {{tag}}
        </el-tag>
        <el-input style="width: 100px" v-if="inputVisible" v-model="tagValue" ref="saveTagInput" size="small" maxlength="4" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
        </el-input>
        <el-button v-if="!inputVisible && commitDetail.tags.length < 4" class="button-new-tag" size="small"
                   @click="showInput">+新标签
        </el-button>
      </el-form-item>
    </el-form>
    <div class="activity-detail">
      <h2>
        活动详情
      </h2>
      <hr/>
      <quill-editor v-model="commitDetail.desc" style="height: 400px"></quill-editor>
    </div>
    <!--{{commitDetail}}-->
  </div>
</template>0

<script>
  import {uploadIMG} from '@/api/activity'
  import {mapGetters} from 'vuex'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'

  import { quillEditor } from 'vue-quill-editor'
  import { VueCropper } from 'vue-cropper'

  export default {
    name: 'baseMessage',
    components: {
      quillEditor, //富文本编辑器
      VueCropper  //图片剪裁
    },
    computed: {
      ...mapGetters([
        'commitDetail'
      ])
    },
    data() {
      return {
        dialogVisible:false,
        imageUrl: '',
        inputVisible: false,
        tagValue: '',
        option: {
          img: '',
          outputSize:1, //剪切后的图片质量（0.1-1）
          full: false,//输出原图比例截图 props名full
          outputType: 'png',
          canMove: true,
          original: false,
          canMoveBox: true,
          autoCrop: true,
          autoCropWidth: 700,
          autoCropHeight: 400,
          fixedBox: true
        },
      };
    },
    methods: {
      /**
       * 上传图片剪裁触发
       */
      uploadChange(file, fileList) {
        var reader = new FileReader()
        reader.readAsDataURL(file.raw)
        reader.onload = (e) => {
          this.option.img = e.target.result
        }
        this.dialogVisible = true
      },
      /**
       * 确定剪裁
       */
      Tailoring() {
        this.$refs.cropper.getCropBlob(data => {
          this.commitDetail.img = window.URL.createObjectURL(data)
          let files = new window.File([data], 'testImg.png', {type: 'image/png'})
          let formData = new FormData();
          formData.append('file', files)
          uploadIMG(formData).then(res=> {
            this.commitDetail.imgPath = res.data.path
          })
        })
        this.dialogVisible = false
      },
      /**
       * 关闭标签
       */
      handleClose(tag) {
        this.commitDetail.tags.splice(this.commitDetail.tags.indexOf(tag), 1);
      },
      /**
       * 点击标签显示INPUT框
       */
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      /**
       * 添加标签
       */
      handleInputConfirm() {
        let inputValue = this.tagValue;
        if (inputValue) {
          this.commitDetail.tags.push(inputValue);
        }
        this.inputVisible = false;
        this.tagValue = '';
      }
    }
  };
</script>

<style lang="scss">
  .base-message-box {
    .activity-detail {
      margin-top: 60px;
    }
    .activityImgDiv {
      display: flex;
      .upload {
        margin-left: 20px;
      }
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
    .el-upload__tip {
      color: #409EFF;
    }
    hr {
      margin: 20px 0px;
    }
    h2 {
      color: #409EFF;
    }

    .cropperDialog {
      width: 500px;
      height: 800px;
    }
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
</style>
