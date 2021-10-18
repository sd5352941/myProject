import {uploadIMG} from '@/api/activity'

export const editorConfig = {
  watch: {
    Editortext() {
      this.commitDetail.desc = this.Editortext
    }
  },
  data() {
    return {
      Editortext:'',
    }
  },
  mounted() {
    this.tinymce();
  },


  beforeDestroy() {
//这个必须要加，不然初始化的时候会有问题
    this.$tinymce.remove()
  },
  methods: {
    tinymce() {
      let _this = this;


      //这一句代码是重点 不写会报错theme.js:1 Uncaught SyntaxError: Unexpected token <
      _this.$tinymce.baseURL = '/static/tinymce'


      _this.$tinymce.init({
        selector: "#Editor",
        language_url: '/static/tinymce/zh_CN.js',//设置中文
        language: 'zh_CN',

        plugins: [ //配置插件：可自己随意选择，但如果是上传本地图片image和imagetools是必要的
          'advlist autolink link image lists charmap  preview hr anchor pagebreak ',
        ],
        //工具框，也可自己随意配置
        toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image ',
        image_advtab: true,
        table_default_styles: {
          height: '500px',
          width: '100%',
          borderCollapse: 'collapse'
        },
        image_title: false, // 是否开启图片标题设置的选择，这里设置否
        automatic_uploads: true,
        // 图片异步上传处理函数
        images_upload_handler: (blobInfo, success, failure) => {
          let formData;
          formData = new FormData();
          formData.append('file',blobInfo.blob(), blobInfo.filename());
          uploadIMG(formData,'editor').then(res=> {
            success(res.data.path);
          })
        },
        init_instance_callback: function(editor) {
          editor.on('keyup', () => {
            // 获取富文本编辑器里面的内容
            _this.Editortext = editor.getContent();
          });
        }
      }).then(resolve => {
        // 初始化富文本编辑器里面的内容
        resolve[0].setContent(_this.Editortext)
      });
    },

  }
}
