<template>
  <layout class="bankAcount">
    <template v-slot:main>
      <div class="make-collections">
        <van-cell-group title="" class="j-cell">
          <van-cell center title="银行账号" :value="info.cardNumber" />
          <van-cell center title="开户行" :value="info.depositBank" />
          <!-- <van-cell center title="联系人" :value="info.name" /> -->
          <!-- <van-cell center title="联系方式" :value="info.tel" /> -->
        </van-cell-group>
      </div>
    </template>
    <template v-slot:footer>
      <div class="add_company">
        <button class="del_company_button" @click="delaccount()">删除</button>
        <button class="mod_company_button" @click="modifyaccount()">修改</button>
      </div>
    </template>
  </layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Cell, CellGroup, NoticeBar, Dialog, Toast } from 'vant'
import { mapActions } from 'vuex'

@Component({
  name: 'bankAcount',
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [NoticeBar.name]: NoticeBar
  },
  methods: {
    ...mapActions({
      bankdetails: 'home/bankdetails',
      delbank: 'home/delbank'
    })
  }
})

export default class extends Vue {
  protected bankdetails!: any
  protected delbank!: any

  info = {
    cardNumber: '',
    depositBank: '',
    name: '',
    tel: '',
    id: ''
  }

  created (): void {
    const pid = this.$route.query.id
    this.bankdetails(`id=${pid}`).then((res: any) => {
      console.log(res)
      const datas = res.data.data
      this.info.cardNumber = datas.code.replace(/\s/g, ' ').replace(/(.{4})/g, '$1 ')
      this.info.depositBank = datas.branch
      this.info.name = datas.person
      this.info.tel = datas.phone
      this.info.id = pid + ''
    })
  }

  delaccount () {
    Dialog.confirm({
      title: '删除银行账号',
      message: '该银行账号即将被删除',
      confirmButtonText: '删除',
      confirmButtonColor: '#2ABED1',
      cancelButtonColor: '#2ABED1'
    }).then(() => {
      // on confirm
      const pid = this.$route.query.id
      this.delbank(`id=${pid}`).then((res: any) => {
        console.log(res)
        if (res.data.data.status === 1) {
          Toast.success('删除成功')
          setTimeout(() => {
            this.$router.back()
          }, 1500)
        } else if (res.data.data.status === -1) {
          Toast(res.data.error_msg)
        } else {
          Toast(res.data.error_msg)
        }
      })
    }).catch(() => {
      // on cancel
    })
  }

  modifyaccount () {
    this.$router.replace('/bank?id=' + this.info.id)
    // location.replace('/ent/bank?id=' + this.info.id)
  }
}
</script>

<style lang="scss">
.bankAcount {
  .van-cell{
    padding: 15px 16px;
  }
  .van-cell-group__title {
    background-color: #F5F6F7;
  }
  .van-cell__title{
    flex-shrink: 0;
    flex: none;
    min-width: 100px;
    font-size: 16px;
  }
  .van-cell__value{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 14px;
  }
  .make-collections {
    .van-cell__value {
      text-align: right!important;
    }
  }
  // 底部按钮
    .add_company{
        width: 100%;
        height: 66px;
        background: #fff;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .del_company_button{
            width: 165px;
            height: 40px;
            // margin: 8px 0 12px 0;
            background: #EDEFF2;
            border-radius: 8px;
            font-size: 18px;
            color: #5F5E64;
            text-align: center;
            line-height: 26px;
        }
        .mod_company_button{
            width: 165px;
            height: 40px;
            // margin: 8px 0 12px 0;
            background: #2ABED1;
            border-radius: 8px;
            font-size: 18px;
            color: #F7F9FA;
            text-align: center;
            line-height: 26px;
        }
    }
}

</style>
