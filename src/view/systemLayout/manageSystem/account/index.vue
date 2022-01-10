<template>
  <div class="account-box" flex>
    <div class="account-left">
      <div class="left-portrait" flex="main:center">
        <img :src="accountData.portrait" style="border-radius: 50%;">
      </div>
    </div>
    <div class="account-right">
      <div class="right-box">
        <div class="account-title">个人账号设置</div>
        <el-form :model="accountData" label-width="100px" size="small" ref="form">
          <el-form-item label="个人头像" prop="portrait">
            <upload-img @callbackImgPath="setImgPath" :width="180" :height="180" :imgPath="accountData.portrait"></upload-img>
          </el-form-item>
          <el-form-item label="昵称" prop="portrait">
            <el-input v-model="accountData.nickName" class="el-input"></el-input>
          </el-form-item>
          <el-form-item label="一句话介绍" prop="portrait">
            <el-input v-model="accountData.introduction" class="el-input"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="phone">
            <el-input v-model="accountData.phone" class="el-input"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="accountData.sex">
              <el-radio label="male">男</el-radio>
              <el-radio label="female">女</el-radio>
              <el-radio label="security">保密</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">确认修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      accountData: {
        nickName: 'sad',
        portrait: '',
        username: '',
        phone: '',
        introduction: '',
        sex: '',
      },
      userData: {
        portraitImg: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('CommitUserData',this.accountData)
        .then(res=> {
          this.$message.success("保存成功")
        })
    },
    setImgPath(res) {
      if(res.data.path) {
        this.accountData.portrait = res.data.path
        this.$message.success("上传头像成功")
      }
    },
    getUserData() {
      this.$store.dispatch('GetUserData',{id: ''})
        .then(res=> {
          this.accountData = res.data.result
        })
    }
  },
  mounted() {
    this.getUserData()
  }
}
</script>

<style lang="scss" scoped>
.account-box {
  padding: 30px;
  background: #FFFFFF;
  min-height: 100%;
}
.account-left {
  flex: 2;
}

.account-right {
  flex: 8;
}
.account-title {
  font-size: 24px;
  position: relative;
  z-index: 1;
  margin: 0 0 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #a0a0a0;
}

.el-input {
  width: 400px;
}

.left-portrait {
  img {
    width: 160px;
    height: 160px;
  }
}
</style>
