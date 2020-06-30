<template>
  <layout>
    <template v-slot:main>
      <div class="bank">
        <van-form validate-first @failed="onFailed">
          <!-- 通过 pattern 进行正则校验 -->
          <van-field
              class="van-item"
              v-model="value1"
              name="pattern"
              label="银行账号"
              placeholder="请填写您的银行账号"
              :rules="bankaccount"
              @input="addempty(value1)"
          />
          <!-- 通过 validator 进行函数校验 -->
          <van-field
              class="van-item"
              v-model="value2"
              name="validator"
              label="开户行"
              placeholder="请填写开户行"
              :rules="openBank"
              @input="inputBank(value2)"
          />
          <!-- 通过 validator 进行异步函数校验 -->
          <!-- <van-field
              class="van-item"
              v-model="value3"
              name="asyncValidator"
              label="联系人"
              placeholder="请填写联系人姓名"
              :rules="contacts"
              @input="inputContacts(value3)"
          />
          <van-field
              class="van-item"
              v-model="value4"
              name="phonenum"
              label="联系电话"
              placeholder="请填写联系人手机号码"
              :rules="phoneRules"
              @input="inputPhone(value4)"
          /> -->
          <div class="checkbox">
            <van-checkbox v-model="checked" :disabled="isDisabled" checked-color="#2ABED1" icon-size="20px" @change="changeBox">设置为主账户</van-checkbox>
          </div>
          <div class='addcomplate'>
              <van-button round block type="info" :disabled="!NextStatus" style="background-color:#2ABED1" native-type="submit"  @click="complete()">
              完成
              </van-button>
          </div>
        </van-form>
      </div>
    </template>
  </layout>
</template>

<script lang = "ts">
// @ is an alias to /src
// import { Component, Vue } from 'vue-property-decorator'
import { Component, Vue } from 'vue-property-decorator'
import { Form, Field, Button, Cell, Toast, Checkbox } from 'vant'
import { mapActions } from 'vuex'
@Component({
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [Toast.name]: Cell,
    [Checkbox.name]: Checkbox

  },
  methods: {
    ...mapActions({
      addbank: 'home/addbank',
      modifybank: 'home/modifybank',
      bankdetails: 'home/bankdetails',
      banklist: 'home/banklist'
    }),

    onFailed (errorInfo) {
      console.log('failed', errorInfo)
    }
  }
})
export default class extends Vue {
  protected addbank!: any
  protected modifybank!: any
  protected bankdetails!: any
  protected banklist!: any
  checked = 0
  value1 = ''
  value2 = ''
  bankLen = []
  isDisabled: any = false
  // value3 = ''
  // value4 = ''
  // nextStatus = [false, false, false, false]
  nextStatus = [false, false]
  // phoneRules = [{
  //   required: true,
  //   validator: (val) => {
  //     const status = /^1[3|7|8]\d{9}$|^19[8-9]\d{8}$|^166\d{8}|^15[0-3|5-9]\d{8}|^14[5|7]\d{8}$/.test(val)
  //     this.setNextStatus(status, 0)
  //     return status
  //   },
  //   message: '手机号格式错误'
  // }]

  bankaccount = [{
    // required: true,
    validator: (val) => {
      val = val.replace(/\s+/g, '')
      const status = /^([0-9]{1})(\d{7,29})$/.test(val)
      this.setNextStatus(status, 0)
      if (val === '') {
        return true
      }
      return status
    },
    message: '银行账号格式不正确'
  }]

  // contacts = [{
  //   required: true,
  //   validator: (val) => {
  //     const status = /[\u4e00-\u9fa5]{2,}$/.test(val)
  //     this.setNextStatus(status, 2)
  //     return status
  //   },
  //   message: '请输入正确内容'
  // }]

  openBank = [{
    // required: true,
    validator: (val) => {
      const status = /[\u4e00-\u9fa5]{2,}$/.test(val)
      this.setNextStatus(status, 1)
      if (val === '') {
        return true
      }
      return status
    },
    message: '请输入正确内容'
  }]

  created () {
    const isId = this.$route.query.id
    if (isId !== undefined) {
      this.bankdetails(`id=${this.$route.query.id}`).then((res: any) => {
        console.log(res)
        this.value1 = res.data.data.code
        if (/\S{5}/.test(this.value1)) {
          this.value1 = this.value1.replace(/\s/g, '').replace(/(.{4})/g, '$1 ')
        }
        this.value2 = res.data.data.branch
        // this.value3 = res.data.data.person
        // this.value4 = res.data.data.phone
        // this.nextStatus = [true, true, true, true]
        this.checked = res.data.data.main
        console.log(this.checked)
        this.nextStatus = [true, true]
      })
    }
  }

  mounted () {
    this.getBankList()
  }

  setNextStatus (status: boolean, i: number) {
    this.nextStatus.splice(i, 1, status)
  }

  get NextStatus () {
    return this.nextStatus.every((v: boolean) => v)
  }

  changeBox (val) {
    if (val) {
      val = 1
    } else {
      val = 0
    }
    console.log(val)
    this.checked = val
  }

  // 银行卡输入加空格,为空完成按钮置灰
  addempty (e) {
    if (/\S{5}/.test(e)) {
      this.value1 = e.replace(/\s/g, '').replace(/(.{4})/g, '$1 ')
    }
    if (e === '') {
      this.setNextStatus(false, 0)
    } else {
      this.setNextStatus(true, 0)
    }
  }

  // 开户行为空完成按钮置灰
  inputBank (val) {
    console.log(val)
    if (val === '') {
      this.setNextStatus(false, 1)
    } else {
      this.setNextStatus(true, 1)
    }
  }

  // 联系人为空完成按钮置灰
  // inputContacts (val) {
  //   if (val === '') {
  //     this.setNextStatus(false, 2)
  //   } else {
  //     this.setNextStatus(true, 2)
  //   }
  // }

  // 联系电话为空完成按钮置灰
  // inputPhone (val) {
  //   if (val === '') {
  //     this.setNextStatus(false, 0)
  //   } else {
  //     this.setNextStatus(true, 0)
  //   }
  // }

  // 点击完成
  complete () {
    const isId = location.search.split('?')[1]
    // this.value1 = this.value1.replace(/\s+/g, '')
    const account = this.value1.replace(/\s+/g, '')
    if (isId !== undefined) {
      this.modifybank(
        `id=${isId.split('=')[1]}&bank_code=${account}&bank_name=${this.value2}&main=${this.checked}`
      ).then((res: any) => {
        console.log(res)
        if (res.data.status === 1) {
          Toast.success('修改成功')
          setTimeout(() => {
            this.$router.back()
          }, 1500)
        } else if (res.data.status === 0) {
          Toast(res.error_msg)
        } else if (res.data.status === -1) {
          Toast(res.error_msg)
        }
      })
    } else {
      console.log(this.bankLen.length, '当前银行账户数量')
      // 判断当前账户列表数量  为0时 默认选中为主账户，不为0时不选中
      if (this.bankLen.length === 0) {
        this.addBank(account, 1)
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        // const that = this
        // Toast({
        //   message: '您只有一个银行账户 默认为主账户',
        //   onClose () {
        //     that.addBank(account, 1)
        //   }
        // })
      } else {
        this.addBank(account, this.checked)
      }
    }
  }

  // 添加账户
  addBank (a: string, m: number) {
    const toast1 = Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0
    })
    this.addbank(
      `bank_code=${a}&bank_name=${this.value2}&main=${m}`
    ).then((res: any) => {
      console.log(res)
      if (res.data.data.status === 1) {
        toast1.clear()
        Toast.success('添加成功')
        setTimeout(() => {
          this.$router.back()
        }, 1500)
      } else if (res.data.data.status === 0) {
        toast1.clear()
        Toast(res.error_msg)
      } else if (res.data.data.status === -1) {
        toast1.clear()
        Toast(res.error_msg)
      }
    })
  }

  // 获取银行账户列表
  getBankList () {
    this.banklist().then((res: any) => {
      console.log(res.data.data)
      this.bankLen = res.data.data
      console.log(this.bankLen.length, '账户数量')
      if (res.data.data.length === 0) {
        this.checked = 1
        this.isDisabled = true
      } else {
        this.isDisabled = false
      }
    })
  }
}
</script>
<style lang="scss">
.bank {
  .van-field--error::placeholder, .van-field__control::placeholder{
    color: #9B9CA3;
  }
  .van-field--error .van-field__control, .van-field--error .van-field__control::placeholder{
    color: #9B9CA3;
  }
  .van-field__control{
    color: #171826;
  }
}
</style>
<style lang="scss" >
.bank{
  width: 100%;
  height: 100%;
  background: #F5F6F7;
  .van-item{
    width: 100%;
    min-height: 54px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:0 16px;
    .van-field__label{
      font-size: 15px;
      span{
          font-size: 15px;
          color: #5F5E64;
      }
      .van-icon-arrow{
        font-size:20px;
        color:#C0C4CC;
      }
    }
    .van-field__control{
      font-size: 15px;
    }
    .van-cell__value{
        font-size: 14px;
        color: #2ABED1;
    }
  }
  .van-button{
    width: 343px;
    height: 46px;
    border-radius: 8px;
  }
  .van-button__text{
      font-size: 18px;
      color: #fff;
  }
  .addcomplate{
    height: 66px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top:24px
  }
}
.gray{
  color: #9B9CA3;
}
.checkbox{
  background: #fff;
  padding: 16px 18px;
}
.van-checkbox__label{
  margin-left: 15px;
  font-size: 16px;
  line-height: 24px;
  color: #2ABED1;
}
.van-checkbox__icon--disabled .van-icon {
    background-color: #2ABED1;
    border-color: #2ABED1;
}
.van-checkbox__icon--disabled.van-checkbox__icon--checked .van-icon {
    color: #fff;
}
.van-button--info{
  border: 0;
}
</style>
