<template>
  <div class="upload-img-box">
    <div class="activity-img-div" flex>
      <div class="img-box" :style="`height:${height}px;width:${width}px`">
        <img :src="imgPath">
      </div>
      <div class="upload ml20">
        <el-upload action :auto-upload="false" :file-list="fileList"
                   :limit="1"
                   :on-exceed="resetUpload"
                   :on-change="uploadChange">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
    </div>



    <el-dialog title="图片剪裁" :visible.sync="dialogVisible" >
      <div :style="`height:${height * 2}px;witch:${width}px`">
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
          :autoCropWidth="width"
          :autoCropHeight="height"
          :fixedBox="option.fixedBox"></vueCropper>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="Tailoring">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
import {uploadIMG} from '@/api/activity'

export default {
  props: {
    imgPath: {
      type:String,
      default: ''
    },
    width: {
      type:Number,
      default: 180,
    },
    height: {
      type:Number,
      default: 180,
    }
  },
  components: {
    VueCropper
  },
  data() {
    return {
      dialogVisible:false,
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
      fileList: [],

    }
  },
  methods: {
    Tailoring() {
      this.$refs.cropper.getCropBlob(data => {
        this.imgPath = window.URL.createObjectURL(data)
        let files = new window.File([data], 'testImg.png', {type: 'image/png'})

        let formData = new FormData();
        formData.append('file', files)

        uploadIMG(formData,'activityCover').then(res=> {
          this.$emit('callbackImgPath',res)
        })
      })
      this.dialogVisible = false
      this.fileList = []
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
  }
}
</script>

<style lang="scss" scoped>
.cropper-box {
  min-width: 500px;
  height: 500px;
}

.img-box {
  border: 2px solid #DCDFE6
}
</style>
