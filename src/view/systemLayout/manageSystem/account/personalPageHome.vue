<template>
  <div class="personal-page-home">
    <textarea class="my_editor" id="Editor"  v-model="Editortext"></textarea>
    <el-button type="primary" class="mt20" @click="commit">提交</el-button>
  </div>
</template>

<script>
import {editorConfig} from './editor.config'

export default {
  mixins:[editorConfig],
  data() {
    return {

    }
  },
  mounted() {
    this.getPersonalPage()
  },
  methods: {
    commit() {
      this.$store.dispatch('CommitHomePage',
        {homePage: this.Editortext}).then(res=> {
        this.$message.success('修改成功')
      })
    },
    getPersonalPage() {
      this.$store.dispatch('GetUserData').then(res=> {
        this.Editortext = res.data.result.homePage
      })
    },
  }
}
</script>
