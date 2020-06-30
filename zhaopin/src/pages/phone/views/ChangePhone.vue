<template>
    <layout>
      <template v-slot:main>
        <div v-show="step == 1" class="changePhone">
          <p class="title">请先通过验证，以确认为本人操作</p>
          <Phone type='change' btnText="立即验证" @childFn="checkFn"></Phone>
        </div>
        <div v-show="step == 2" class="changePhone">
          <p class="title">更换新的手机号码</p>
          <Phone ref="child" type='bind' btnText="更换" @childFn="changeFn"></Phone>
        </div>
      </template>
      <template v-slot:footer></template>
    </layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Form, Field, Button, Toast } from 'vant'
import Phone from '@/components/vant-form.vue'
import { mapActions } from 'vuex'
@Component({
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    Phone
  },
  methods: {
    ...mapActions({
      replacePhone: 'home/replacePhone'
    })
  }
})
export default class VantBindPhone extends Vue {
  protected replacePhone!: any
  step = 1

  checkAndEdit (phone: string, num: number, code: string, callback: any) {
    this.replacePhone(
      `phone=${phone}&step=${num}&identCode=${code}`
    ).then((res: any) => {
      console.log(res.data)
      if (res.data.status === 1) {
        // Toast.success({
        //   message: num === 1 ? '验证成功' : '修改成功',
        //   onClose () {
        //     console.log('到onclose了')
        //     callback()
        //   }
        // })
        if (num === 1) {
          Toast('验证成功')
          setTimeout(() => {
            callback()
          }, 1000)
        } else if (num === 2) {
          Toast('更换成功')
          setTimeout(() => {
            callback()
          }, 1000)
        }
      } else if (res.data.status === -1) {
        Toast('验证码错误')
      } else if (res.data.status === -2) {
        Toast('验证手机号不正确')
      } else if (res.data.status === -3) {
        Toast('该手机号已绑定')
      } else if (res.data.status === -4) {
        Toast('该手机号已存在')
      } else if (res.data.status === -5) {
        Toast('未进行验证手机号操作')
      } else {
        Toast('操作异常')
      }
    })
  }

  // 验证手机号
  checkFn (res: any) {
    console.log(res)
    // 15037870765原手机号
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this
    this.checkAndEdit(res.phone, 1, res.code, function () {
      self.step = 2;
      (self.$refs.child as Phone).getPicture()
    })
  }

  // 修改手机号
  changeFn (res: any) {
    console.log(res)
    this.checkAndEdit(res.phone, 2, res.code, () => {
      console.log('到这一步了')
      this.$router.back()
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
