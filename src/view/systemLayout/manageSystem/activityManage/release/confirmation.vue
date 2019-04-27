<template>
  <div>
    <!-- element 上传图片按钮 -->
    <el-upload class="uploader"
               action
               :show-file-list="false"
               :on-success="handleUploadSuccess"
               >
      <img v-if="fileinfo.url"
           :src="fileinfo.url"
           class="upload">
      <i v-else
         class="el-icon-plus uploader-icon" />
    </el-upload>
    ......
    <!-- vueCropper 剪裁图片实现-->
    <div class="vue-cropper-box"
         v-if="isShowCropper">
      <div class="vue-cropper-content">
        <vueCropper ref="cropper"
                    :img="option.img"
                    :outputSize="option.outputSize"
                    :outputType="option.outputType"
                    :info="option.info"
                    :canScale="option.canScale"
                    :autoCrop="option.autoCrop"
                    :autoCropWidth="option.autoCropWidth"
                    :autoCropHeight="option.autoCropHeight"
                    :fixed="option.fixed"
                    :fixedNumber="option.fixedNumber"></vueCropper>
      </div>
      <el-button v-if="isShowCropper"
                 type="danger"
                 @click="onCubeImg">确定裁剪图片</el-button>

    </div>
  </div>
</template>

<script>
  import VueCropper from "vue-cropper"

  export default {
    components: {
      VueCropper
    },
    data() {
      return {
        //裁剪组件的基础配置option
        option: {
          img: '',                         //裁剪图片的地址
          info: true,                      //裁剪框的大小信息
          outputSize: 1,                   // 裁剪生成图片的质量
          outputType: 'jpeg',              //裁剪生成图片的格式
          canScale: false,                 // 图片是否允许滚轮缩放
          autoCrop: true,                  // 是否默认生成截图框
          autoCropWidth: 150,              // 默认生成截图框宽度
          autoCropHeight: 150,             // 默认生成截图框高度
          fixed: false,                    //是否开启截图框宽高固定比例
          fixedNumber: [4, 4]              //截图框的宽高比例
        },
        isShowCropper: false,            //是否显示截图框
        fileUpload: null,
        fileinfo: {},
        form: {},
      }
    },
    methods: {
      //上传按钮上传成功执行事件
      handleUploadSuccess(response, file, fileList) {
        debugger
        this.log('Upload response is %o', response)
        this.fileinfo = response

        this.fileUpload = file;

        //上传成功后将图片地址赋值给裁剪框显示图片
        this.$nextTick(() => {
          this.option.img = file.url;
          this.isShowCropper = true
        })
      },

      // 确定裁剪图片
      onCubeImg() {
        // 获取cropper的截图的base64 数据
        this.$refs.cropper.getCropData(data => {
          this.fileinfo.url = data
          this.isShowCropper = false

          //先将显示图片地址清空，防止重复显示
          this.option.img = ''

          //将剪裁后base64的图片转化为file格式
          let file = this.convertBase64UrlToBlob(data)
          file.name = this.fileUpload.name

          //将剪裁后的图片执行上传
          this.uploadFile(file).then(res => {
            this.form.content = res.file_id    //将上传的文件id赋值给表单from的content
          })

        })
      },

      // 将base64的图片转换为file文件
      convertBase64UrlToBlob(urlData) {
        let bytes = window.atob(urlData.split(',')[1]);//去掉url的头，并转换为byte
        //处理异常,将ascii码小于0的转换为大于0
        let ab = new ArrayBuffer(bytes.length);
        let ia = new Uint8Array(ab);
        for (var i = 0; i < bytes.length; i++) {
          ia[i] = bytes.charCodeAt(i);
        }
        return new Blob([ab], {type: 'image/jpeg'});
      },
    }
  }
</script>
