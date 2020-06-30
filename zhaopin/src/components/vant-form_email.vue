<template>
  <div class="vantbindPhone">
    <van-form ref="phoneForm" @submit="submitForm">
      <van-field
        v-if="type == 'bind'"
        v-model.trim="regParams.email"
        name="email"
        type="email"
        label="邮箱地址"
        placeholder="请输入邮箱"
        :rules="phoneRules"
        @input="inputEmail(regParams.email)"
      />
      <van-field
        v-if="type == 'change'"
        v-model.trim="this.$route.query.email"
        name="email"
        type="email"
        label="邮箱地址"
        placeholder=""
        disabled
        :rules="phoneRules"
      />
      <van-field
        class="picture-cell"
        v-model.trim="regParams.picture"
        type="number"
        name="picture"
        placeholder="图形验证码"
        :rules="pictureRules"
        @input="inputEmailPicture(regParams.picture)"
      >
        <template #button>
          <img :src="imgSrc" alt="图形验证码" width="90" height="30" @click="getPicture" />
        </template>
      </van-field>
      <van-field
        v-model.trim="regParams.code"
        name="code"
        label="验证码"
        placeholder="请输入验证码"
        :rules="regCodeRules"
        @input="inputEmailCOde(regParams.code)"
      >
        <template #button>
            <van-button native-type="button" v-show="sendCodeBtn" class="send_btn" slot="button"  size="small" @click="sendMobileCode" type="primary">获取验证码</van-button>
            <van-button native-type="button" v-show="!sendCodeBtn" class="send_btn gray" slot="button" size="small" disabled type="primary">{{countdown}}s</van-button>
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
      wxEmailCode: 'home/wxEmailCode'
    }),
    ...mapActions({
      getPhone: 'home/getPhone'
    })
  }
})
export default class VantBindPhone extends Vue {
  @Prop() private btnText!: string;
  @Prop() private type!: string;
  protected wxEmailCode!: any
  protected getPhone!: any
  regParams = {
    email: '',
    picture: '',
    code: ''
  }

  imgSrc = ''
  nextStatus = [false, false, false]
  sendCodeBtn = true
  countdown = 0
  oldPhone = ''
  loading = false
  created () {
    // this.getPhone().then((res: any) => {
    //   console.log(res)
    //   this.regParams.email = res.data.email
    // })
  }

  phoneRules = [{
    // required: true,
    validator: (val) => {
      console.log(val)
      // eslint-disable-next-line no-useless-escape
      const status = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(val)
      this.setNextStatus(status, 0)
      if (val === '') {
        return true
      }
      return status
    },
    message: '邮箱格式错误'
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
      const status = /^[a-zA-Z0-9]{6}$/.test(val)
      this.setNextStatus(status, 2)
      if (val === '') {
        return true
      }
      return status
    },
    message: '验证码格式错误'
  }]

  // 邮箱为空按钮置灰
  inputEmail (val) {
    if (val === '') {
      this.setNextStatus(false, 0)
    } else {
      this.setNextStatus(true, 0)
    }
  }

  // 图形验证码为空按钮置灰
  inputEmailPicture (val) {
    if (val === '') {
      this.setNextStatus(false, 1)
    } else {
      this.setNextStatus(true, 1)
    }
  }

  // 图形验证码为空按钮置灰
  inputEmailCOde (val) {
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
    const toat1 = Toast.loading({
      message: '',
      forbidClick: true
    })
    const tempRefs: any = this.$refs.phoneForm
    Promise.all([tempRefs.validate('email'), tempRefs.validate('picture')]).then(() => {
      // console.log('发送短信验证码')
      this.wxEmailCode(
        this.type === 'bind' ? `mail=${this.regParams.email}&code=${this.regParams.picture}` : `mail=${this.$route.query.email}&code=${this.regParams.picture}`
      ).then((res: any) => {
        toat1.clear()
        this.loading = true
        console.log(res)
        if (res.data.status === -1) {
          Toast('图形验证码错误')
          this.getPicture()
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
