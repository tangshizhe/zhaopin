<template>
  <div class="vantbindPhone">
    <van-form ref="phoneForm" @submit="submitForm">
      <van-field
        v-if="type == 'bind'"
        v-model.trim="regParams.phone"
        name="phone"
        type="tel"
        label="手机号码"
        maxlength="11"
        placeholder="请输入手机号码"
        :rules="phoneRules"
        @input="inputPhone(regParams.phone)"
      />
      <van-field
        v-if="type == 'change'"
        v-model.trim="this.hidephone"
        name="phone"
        type="tel"
        label="手机号码"
        maxlength="11"
        placeholder=""
        disabled
        :rules="noempty"
      />
      <van-field
        class="pictrue-cell"
        v-model.trim="regParams.picture"
        type="number"
        name="picture"
        placeholder="图形验证码"
        :rules="pictureRules"
        @input="inputpicture(regParams.picture)"
      >
        <template #button>
          <img :src="imgSrc" alt="图形验证码" width="90" height="30" @click="getPicture" />
        </template>
      </van-field>
      <van-field
        v-model.trim="regParams.code"
        type="number"
        name="code"
        label="验证码"
        placeholder="请输入验证码"
        :rules="regCodeRules"
        @input="inputcode(regParams.code)"
      >
        <template #button>
            <van-button native-type="button" v-show="sendCodeBtn" class="send_btn" slot="button"  size="small" @click="sendMobileCode" type="primary">发送验证码</van-button>
            <van-button native-type="button" v-show="!sendCodeBtn" class="send_btn gray" slot="button" size="small" disabled type="primary">重新发送({{countdown}}s)</van-button>
        </template>
      </van-field>
      <div style="margin: 32px 16px;">
        <van-button :disabled="!NextStatus"  native-type="submit" square block type="info">{{btnText}}</van-button>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Form, Field, Button, Toast } from 'vant'
import { mapActions } from 'vuex'
@Component({
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button
  },
  methods: {
    ...mapActions({
      wxSendCode: 'home/wxSendCode'
    }),
    ...mapActions({
      getPhone: 'home/getPhone'
    })
  }
})
export default class VantBindPhone extends Vue {
  @Prop() private btnText!: string;
  @Prop() private type!: string;
  protected wxSendCode!: any
  protected getPhone!: any
  regParams = {
    phone: '',
    picture: '',
    code: ''
  }

  phoneid
  hidephone
  imgSrc = ''
  nextStatus = [false, false, false]
  sendCodeBtn = true
  countdown = 0
  oldPhone = ''
  created () {
    this.phoneid = this.$route.query.tel + ''
    const reg = /(\d{3})\d{4}(\d{4})/
    this.hidephone = this.phoneid.replace(reg, '$1****$2')
  }

  phoneRules = [{
    // required: true,
    validator: (val) => {
      console.log(val)
      const status = /^1[3|7|8]\d{9}$|^19[8-9]\d{8}$|^166\d{8}|^15[0-3|5-9]\d{8}|^14[5|7]\d{8}$/.test(val)
      this.setNextStatus(status, 0)
      if (val === '') {
        return true
      }
      return status
    },
    message: '手机号格式错误'
  }]

  noempty = [{
    // required: true,
    validator: (val) => {
      const status = /\S/.test(val)
      this.setNextStatus(status, 0)
      if (val === '') {
        return true
      }
      return status
    },
    message: '手机号格式错误'
  }]

  pictureRules = [{
    // required: true,
    validator: (val) => {
      const status = /\d{4}/.test(val)
      this.setNextStatus(status, 1)
      if (val === '') {
        return true
      }
      return status
    },
    message: '图形验证码格式错误'
  }]

  regCodeRules = [{
    // required: true,
    validator: (val) => {
      const status = /\d{6}/.test(val)
      this.setNextStatus(status, 2)
      if (val === '') {
        return true
      }
      return status
    },
    message: '验证码格式错误'
  }]

  // 手机号输入加空格,为空完成按钮置灰
  inputPhone (val) {
    if (val === '') {
      this.setNextStatus(false, 0)
    } else {
      this.setNextStatus(true, 0)
    }
  }

  // 图形验证码输入加空格,为空完成按钮置灰
  inputpicture (val) {
    if (val === '') {
      this.setNextStatus(false, 1)
    } else {
      this.setNextStatus(true, 1)
    }
  }

  // 短信验证码输入加空格,为空完成按钮置灰
  inputcode (val) {
    if (val === '') {
      this.setNextStatus(false, 2)
    } else {
      this.setNextStatus(true, 2)
    }
  }

  setNextStatus (status: boolean, i: number) {
    this.nextStatus.splice(i, 1, status)
  }

  get NextStatus () {
    return this.nextStatus.every((v: boolean) => v)
  }

  mounted () {
    this.getPicture()
  }

  getPicture () {
    // console.log(process.env.BASE_URL)
    this.imgSrc = process.env.VUE_APP_BASE_API_ENT + '/entbase/captcha?time=' + new Date().getTime()
  }

  sendMobileCode () {
    const tempRefs: any = this.$refs.phoneForm
    Promise.all([tempRefs.validate('phone'), tempRefs.validate('picture')]).then(() => {
      // console.log('发送短信验证码')
      this.wxSendCode(
        this.type === 'bind' ? `token=${this.regParams.phone}&code=${this.regParams.picture}` : `token=${this.$route.query.tel}&code=${this.regParams.picture}`
      ).then((res: any) => {
        console.log(res)
        if (res.data.status === -1) {
          Toast('图形验证码错误')
          this.getPicture()
          this.imgSrc = process.env.VUE_APP_BASE_API_ENT + '/entbase/captcha?time=' + new Date().getTime()
        } else if (res.data.status === 1) {
          this.sendCodeBtn = false
          this.countdown = 60
          const timeInt = setInterval(() => {
            this.countdown--
            if (this.countdown <= 0) {
              this.sendCodeBtn = true
              window.clearInterval(timeInt)
            }
          }, 1000)
        } else {
          Toast('发送失败')
          this.getPicture()
          this.imgSrc = process.env.VUE_APP_BASE_API_ENT + '/entbase/captcha?time=' + new Date().getTime()
        }
      })
    })
  }

  submitForm (values: any) {
    this.$emit('childFn', values)
  }
}
</script>

<style lang="scss">
.van-cell {
  padding: 15px 16px;
}
.picture-cell{
  padding: 12px 16px;
}
.van-field__label {
  font-size: 15px!important;
}
.van-field__control{
  font-size: 16px!important;
}
.send_btn{
  height: auto;
  line-height: normal;
  font-size: 14px;
  line-height: 20px;
  color: #2ABED1;
  background:transparent;
  outline: 0;
  &::before{
    background: transparent;
    border-color: transparent;
  }
}
.van-button--square {
  border-radius: 8px;
  .van-button__text {
    font-size: 18px;
  }
}
.van-button--primary{
  border: 0;
}
.van-button--info {
  color: #fff;
  background-color: #2abed1;
  border: 0.02667rem solid #2abed1;
}
.gray{
  color: #9B9CA3;
}
.van-field--error::placeholder, .van-field__control::placeholder{
  color: #9B9CA3;
}
.van-field--error .van-field__control, .van-field--error .van-field__control::placeholder{
  color: #9B9CA3;
}
.van-field__control{
  color: #171826;
}
</style>
