<template>
    <layout>
      <template v-slot:main>
        <div v-show="step == 1" class="changePhone">
          <p class="title">请先通过验证，以确认为本人操作</p>
          <Email type='change' btnText="立即验证" @childFn="checkFn"></Email>
        </div>
        <div v-show="step == 2" class="changePhone">
          <Email ref="child" type='bind' btnText="更换" @childFn="changeFn"></Email>
        </div>
      </template>
      <template v-slot:footer></template>
    </layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Form, Field, Button, Toast } from 'vant'
import Email from '@/components/vant-form_email.vue'
import { mapActions } from 'vuex'
@Component({
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    Email
  },
  methods: {
    ...mapActions({
      mailreplace: 'home/mailreplace'
    })
  }
})
export default class VantBindPhone extends Vue {
  protected mailreplace!: any
  step = 1

  checkAndEdit (email: string, num: number, code: string, callback: any) {
    this.mailreplace(
      `mail=${email}&step=${num}&code=${code}`
    ).then((res: any) => {
      console.log(res.data)
      if (res.data.status === 1) {
        Toast.success({
          message: num === 1 ? '验证成功' : '修改成功',
          onClose () {
            callback()
          }
        })
      } else if (res.data.status === -1) {
        Toast('验证码错误')
      } else if (res.data.status === -2) {
        Toast('邮箱校验不通过')
      }
    })
  }

  // 验证邮箱
  checkFn (res: any) {
    console.log(res)
    // 15037870765原手机号
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this
    this.checkAndEdit(res.email, 1, res.code, function () {
      self.step = 2;
      (self.$refs.child as Email).getPicture()
    })
  }

  // 修改邮箱
  changeFn (res: any) {
    console.log(res)
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this
    this.checkAndEdit(res.email, 2, res.code, function () {
      that.$router.back()
    })
  }
}
</script>

<style lang="scss" scoped>
.title{
  padding: 8px 15px;
  font-size: 16px;
  line-height: 24px;
  color: #9B9CA3;
}
</style>
