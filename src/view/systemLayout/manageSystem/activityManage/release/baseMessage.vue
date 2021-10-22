<template>
  <div class="base-message-box">
    <h2 class="base-message-title">
      基础信息
    </h2>
    <!--    剪裁控件dialog-->

    <el-dialog title="图片剪裁" :visible.sync="dialogVisible" >
      <div class="cropper-box">
        <vueCropper
          class="vue-cropper"
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
          :fixedBox="option.fixedBox"></vueCropper>
      </div>

      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="Tailoring">确 定</el-button>
  </span>
    </el-dialog>

    <!--    活动基本信息  -->

    <el-form ref="form" :model="commitDetail" label-width="80px" size="small">
      <el-form-item label="活动名称" :rules="{ required: true, message: '请填写活动名称', trigger: 'blur' }" prop="title">
        <el-input v-model="commitDetail.title" class="base-input"></el-input>
      </el-form-item>
      <el-form-item label="活动封面" :rules="{ required: true, message: '请上传活动封面', trigger: 'blur' }" prop="img">
        <div class="activityImgDiv">
          <div class="img-box">
            <img :src="commitDetail.img">
          </div>
          <div class="upload">
            <el-upload action :auto-upload="false" :file-list="fileList"
              :limit="1"
              :on-exceed="resetUpload"
              :on-change="uploadChange">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="活动日期" :rules="{ validator:validDate, trigger: 'blur',required: true }" prop="time">
        <el-date-picker type="date" placeholder="选择日期" v-model="commitDetail.time" value-format="timestamp"></el-date-picker>
        <label style="margin-left: 10px;">集合时间:</label>
        <el-time-picker placeholder="选择时间" v-model="commitDetail.gatheringTime" value-format="timestamp"
                        style="margin-left: 10px;"></el-time-picker>
        <label style="margin-left: 10px;">出发时间:</label>
        <el-time-picker placeholder="选择时间" v-model="commitDetail.departureTime" value-format="timestamp"
                        style="margin-left: 10px;"></el-time-picker>
      </el-form-item>
      <el-form-item label="人数限制">
        <div class="people-number-box">
          <el-input-number v-model="commitDetail.people" style="width: 150px" :min="0" :max="999"></el-input-number>
          <el-button type="text" v-popover:popover class="warning-btn">
            <i class="el-icon-info warning-text"></i>
          </el-button>
        </div>
      </el-form-item>
      <el-form-item label="活动组别">
        <div v-for="item,index in commitDetail.typeArr" :key="index">
          <el-radio-group v-model="item.type" @change="typeChange(item)">
            <div style="display: flex">
              <el-radio label="free">免费</el-radio>
              <el-radio label="charge">收费</el-radio>
            </div>
          </el-radio-group>
          <div v-show="item.type=='charge'">
            <el-input placeholder="请输入活动组名" v-model="item.value" class="base-input"></el-input>
            <span style="margin-left: 20px">价格/人(元):
              <el-input-number v-model="item.label"
                           style="width: 150px;margin-left: 10px" :min="0"
                           placeholder="输入每人报名费"></el-input-number>

            </span>
          </div>

        </div>

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
      <h2 class="base-message-title">
        活动详情
      </h2>
      <textarea class="my_editor" id="Editor"  v-model="Editortext"></textarea>


    </div>
   <!-- 弹出提示-->
    <el-popover placement="right" ref="popover"
      trigger="hover"
      content="此次活动的可参加的最大人数，如果为0则表示不限制">
    </el-popover>
  </div>
</template>

<script>
  import {uploadIMG} from '@/api/activity'
  import {mapGetters} from 'vuex'
  import { VueCropper } from 'vue-cropper'
  import {editorConfig} from './editor.config'


  export default {
    mixins:[editorConfig],
    name: 'baseMessage',
    components: {
      // quillEditor, //富文本编辑器
      VueCropper  //图片剪裁
    },
    computed: {
      ...mapGetters([
        'commitDetail'
      ])
    },
    data() {
      return {
        validDate: (rule, value, callback)=> {
          let {time, gatheringTime, departureTime} = this.commitDetail
          if(time && gatheringTime && departureTime) {
            gatheringTime > departureTime ? callback(new Error('出发时间必须大于集合时间')) :callback()
          } else {
            callback(new Error('请选择完整的活动时间'))
          }
        },
        fileList: [],
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
       * 活动性质切换
       */
      typeChange(item) {
        console.log(item.type,0)
        let obj = {
          free: {label: 0,value: '免费',type: 'free'},
          charge: {label: 0,value: '',type: 'charge'},
        }
        this.commitDetail.typeArr[0].value = obj[item.type].value
        this.commitDetail.typeArr[0].label = obj[item.type].label

      },
      /**
       * 重置上传
       */
      resetUpload(file,fileList) {
        this.fileList = []
        let newFile = {}
        newFile['raw'] = file[0]
        this.uploadChange(newFile)
      },
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
          console.log(files,'剪裁上传')

          let formData = new FormData();
          formData.append('file', files)
          uploadIMG(formData,'activityCover').then(res=> {
            this.commitDetail.imgPath = res.data.path
          })
        })
        this.dialogVisible = false
        this.fileList = []
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
          this.commitDetail.tags.includes(inputValue) ? this.$message.error('标签名重复') : this.commitDetail.tags.push(inputValue);
        }
        this.inputVisible = false;
        this.tagValue = '';
      }
    }
  };
</script>

<style lang="scss" scoped="scoped">

.editor {
  width: 100%;
}
  .base-message-box {
    .el-form-item__error {
      margin-top: 5px;
    }
    .base-message-title {
      margin: 40px 0;
    }
    .activity-detail {
      margin: 60px 0px;
    }
    .activityImgDiv {
      display: flex;

      .img-box {
        height:200px;
        width: 350px;
        border: 2px solid #DCDFE6
      }
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
    .people-number-box {
      display: flex;
      align-items: center;
      .warning-btn {
        font-size: 18px;
        .warning-text {
          margin-left: 10px;
        }
      }
    }

    .cropper-box{
      min-width: 500px;
      /*height: 800px;*/
    }

    .base-input {
      width: 220px;
    }
    .vue-cropper {
      height: 500px;
      width: 800px;
    }
    .base-input {
      width: 200px;
    }
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
</style>
