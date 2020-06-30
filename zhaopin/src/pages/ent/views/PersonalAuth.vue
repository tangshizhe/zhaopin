<template>
  <layout>
    <template v-slot:main>
      <!-- 个人实名认证  -->
      <div  class="represent" :class="{mt: MT}">
        <p class="id_title">个人实名认证</p>
        <p class="id_tip">请上传您的个人身份证正反面</p>
        <div class="front">
            <van-uploader v-model="idFront"  :max-count="1" :after-read="idCardFrontUpload">
                  <span class="upload_text">上传身份证正面</span>
            </van-uploader>
        </div>
        <div class="reverse">
            <van-uploader v-model="idReverse"  :max-count="1" :after-read="idCardReverseUpload">
                  <span class="upload_text">上传身份证反面</span>
            </van-uploader>
        </div>
        <van-cell-group>
          <van-field v-model="userName" label="真实姓名" placeholder="请输入您的真实姓名" :error-message="userNameError"  @blur='checkUserNameError' @focus="getFocus($event)" />
          <van-field v-model="idCard" clearable label="身份证号" placeholder="请输入您的身份证号" maxlength="18" :error-message="idCardError"  @blur='checkIdCardError' @focus="getFocus($event)" />
        </van-cell-group>
      </div>
    </template>
    <template v-slot:footer>
        <div class="j-button-group">
            <button class="j-button-confirm" :disabled ="finishBtn" @click="finishHandle">立即认证</button>
        </div>
    </template>
  </layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Field, CellGroup, Uploader, Button, Toast } from 'vant'
import { mapActions } from 'vuex'
@Component({
  components: {
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Uploader.name]: Uploader,
    [Button.name]: Button
  },
  methods: {
    ...mapActions({
      imgUpload: 'home/imgUpload',
      personalSubmit: 'home/personalSubmit'
    })
  }
})
export default class extends Vue {
    protected imgUpload!: any
    protected personalSubmit!: any
    userName = ''
    idCard = ''
    idFront: any = []
    idReverse: any = []
    idFrontStr = ''
    idReverseStr = ''
    idCardError = ''
    userNameError = ''
    fromType: any
    MT = false

    created () {
      const url = window.location.href
      const data: any = this.parseQueryString(url)
      console.log(data.from)
      if (data.from === 'gov') {
        this.fromType = 'gov'
      }
    }

    // 获取焦点弹出软键盘遮盖输入框
    getFocus (item) {
      console.log(item)
      const u = navigator.userAgent
      const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
      if (isiOS) {
        this.MT = true
        setTimeout(() => {
          item.target.scrollTop = document.body.scrollHeight
        }, 200)
      } else {
        setTimeout(() => {
          item.target.scrollIntoView({ block: 'center' })
        }, 200)
      }
    }

    parseQueryString (url: any) {
      const index = url.lastIndexOf('?')
      const str = url.substring(index + 1)
      console.log(str)
      if (str) {
        const iterms = str.split('&')
        const data = {}
        for (let i = 0; i < iterms.length; i++) {
          const arr = iterms[i].split('=')
          data[arr[0]] = arr[1]
        }
        return data
      }
    }

    // 计算属性 判断立即提交按钮是否禁用
    get finishBtn (): any {
      const regName = /^[\u2E80-\u9FFF]+$/
      const idPatter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/
      if (regName.test(this.userName) && idPatter.test(this.idCard) &&
        this.idFront.length > 0 &&
        this.idReverse.length > 0 &&
        this.idFront[0].status === 'success' &&
        this.idReverse[0].status === 'success'
      ) {
        return false
      } else {
        return true
      }
    }

    // 姓名错误提示
    checkUserNameError () {
      this.MT = false
      const regName = /^[\u2E80-\u9FFF]+$/
      if (regName.test(this.userName) || this.userName === '') {
        this.userNameError = ''
      } else {
        this.userNameError = '姓名格式不正确'
      }
    }

    // 身份证号错误提示
    checkIdCardError () {
      this.MT = false
      const idPatter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/
      if (idPatter.test(this.idCard) || this.idCard === '') {
        this.idCardError = ''
      } else {
        this.idCardError = '身份证号格式不正确'
      }
    }

    // 上传完成执行函数
    afterRead (file, name, callback) {
      console.log(file)
      if (file.file.size > 10485760) {
        Toast('图片不能大于10M')
      } else {
        file.status = 'uploading'
        file.message = '上传中...'
        const data = new FormData()
        data.append('type', name)
        data.append(name, file.file)
        this.imgUpload(data).then((res: any) => {
          console.log(res)
          if (res.error_code !== 0) {
            file.status = 'failed'
            file.message = res.error_msg
          } else {
            file.status = 'success'
            file.message = '上传成功'
            callback(res)
          }
        // eslint-disable-next-line handle-callback-err
        }).catch((err) => {
          console.log(err)
          file.status = 'failed'
          file.message = '上传失败'
        })
      }
    }

    // 身份证正面上传
    idCardFrontUpload (file) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this
      this.afterRead(file, 'idcardImgZ', function (data: any) {
        self.idFrontStr = data.data
      })
    }

    // 身份证反面上传
    idCardReverseUpload (file) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this
      this.afterRead(file, 'idcardImgF', function (data: any) {
        self.idReverseStr = data.data
      })
    }

    // 点击提交执行函数
    finishHandle () {
      this.personalSubmit(
        `userName=${this.userName}&userIdcode=${this.idCard}&userIdPicPathZ=${this.idFrontStr}&userIdPicPathF=${this.idReverseStr}`
      ).then((res: any) => {
        console.log(res)
        if (res.error_msg !== '') {
          Toast(res.error_msg)
        } else {
          if (res.data.status === 1) {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const that = this
            Toast.success({
              message: '认证成功',
              onClose () {
                console.log(that.fromType)
                if (that.fromType === 'gov') { // 如果从政务服务跳至个人认证
                  window.history.back()
                } else { // 从企业架构我的页面跳至个人认证
                  // that.$router.back()
                  that.$router.replace({ path: '/mine' })
                }
              }
            })
          } else if (res.data.status === -1) {
            Toast('认证失败')
            this.$router.push({ path: '/personalAuthResult' })
          }
        }
      }).catch((err) => {
        console.log(err)
      })
    }
}
</script>
<style lang="scss" >
// 公共样式
.van-cell{
  padding: 15px 16px;
}
.van-field__label{
  font-size: 15px;
}
.field-label{
  font-size: 15px;
  background: #fff;
  padding: 15px 16px 0;
}
.van-field__control{
  font-size: 16px;
}
.van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after{
  margin-left: 16px;
}
.van-uploader__input{
  z-index: 1000;
}
@mixin uploadBtn($width){
  position: absolute;
  display: inline-block;
  top: 50%;
  left: 50%;
  width: $width;
  height: 32px;
  background: #2ABED1;
  color: #fff;
  font-size: 15px;
  line-height: 32px;
  border-radius: 16px;
  text-align: center;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  z-index: 999;
}
// 法定代表人信息
.represent{
  transition: all 0.3s;
  &.mt {
    margin-top: -400px;
  }
  .front,.reverse{
    position: relative;
    width: 222px;
    height: 154px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
    .van-uploader{
      width: 190px;
      height: 122px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .van-uploader__wrapper{
        width: 100%;
        height: 100%;
      }
      .van-uploader__preview,.van-image,.van-uploader__preview-image{
        width: 100%;
        height: 100%;
        margin: 0;
        img{
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
    .upload_text,.van-uploader__input-wrapper{
      @include uploadBtn(133px)
    }
  }
  .front{
    margin: 0 auto 48px;
    background-image: url(~@/assets/image/idFront.png);
  }
  .reverse{
    margin: 0 auto 36px;
    background-image: url(~@/assets/image/idReverse.png);
  }
  .id_title{
    text-align: center;
    padding: 16px 16px 0;
    font-size: 15px;
    line-height: 22px;
  }
  .id_tip{
    padding: 8px 16px 16px;
    color: #2ABED1;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
  }
}
</style>
