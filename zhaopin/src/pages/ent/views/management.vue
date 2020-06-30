<template>
  <layout>
    <template v-slot:main>
      <div class="management">
        <div class="van-list">
          <van-cell-group>
            <van-cell class="van-item com_name" title="" >
              <template slot="title">
                <div class="van-item-left">
                  <img src = '@/assets/image/company.png' alt="" style="width:24px;height:24px;margin-right:12px">
                  <span>{{enterprisename}}</span>
                </div>
              </template>
            </van-cell>
          </van-cell-group>
          <van-cell-group v-if="isAdmin">
            <van-cell class="van-item" title="更换管理员" is-link @click="changeManage()"/>
            <van-cell class="van-item" title="所属行业" is-link @click="changeInstury(enterpriseid)" />
            <van-cell class="van-item" title="企业邮箱" is-link @click="changeEmail(enterpriseid)" />
            <van-cell class="van-item" title="银行账户" is-link @click="addbank(enterpriseid)"/>
          </van-cell-group>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <div class="add_company">
        <button class="cancellation" @click="cancellation()">注销企业</button>
      </div>
    </template>
  </layout>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Cell, CellGroup, Dialog, Toast } from 'vant'
import { mapActions } from 'vuex'
@Component({
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  methods: {
    ...mapActions({
      dissolution: 'home/dissolution',
      banklist: 'home/banklist',
      getPhone: 'home/getPhone',
      entinfo: 'home/entinfo'
    })
  }
})
export default class extends Vue {
  protected dissolution!: any
  protected getPhone!: any
  protected banklist!: any
  protected entinfo!: any
  enterprisename = ''
  enterpriseid = ''
  boundphone = ''
  loading = false
  isAdmin = true
  created () {
    this.enterprisename = this.$route.query.name + ''
    this.enterpriseid = this.$route.query.id + ''
    this.getPhone().then((res: any) => {
      console.log(res)
      this.boundphone = res.data.phone
    })
    this.entinfo().then((res: any) => {
      console.log(res)
      if (res.data.data.admin_system === false) {
        this.isAdmin = false
      } else {
        this.isAdmin = true
      }
    })
  }

  //   注销企业弹窗
  cancellation () {
    console.log(this)
    Dialog.confirm({
      title: '注销企业',
      message: '注销后，您企业内的所有数据将会全部丢失',
      confirmButtonText: '注销',
      cancelButtonColor: '#2ABED1',
      confirmButtonColor: '#2ABED1'
    }).then(() => {
      // on confirm
      this.dissolution(`id=${this.enterpriseid}`).then((res: any) => {
        console.log(res)
        if (res.data.data.status === 1) {
          Toast.success('注销成功')
          setTimeout(() => {
            this.$router.replace({ path: '/enterprise' })
          }, 1500)
        } else if (res.data.data.status === 2) {
          Toast('所购买商机管理功能暂未到期，尚无法解散企业。')
        } else {
          Toast('注销失败')
          // setTimeout(() => {
          //   this.$router.replace('/')
          // }, 1500)
        }
      })
    }).catch(() => {
    // on cancel
    })
  }

  // 更换管理员
  changeManage () {
    this.$goAnotherPage('/phone/changeManage?tel=' + this.boundphone)
  }

  // 更换企业邮箱
  changeEmail (id) {
    this.$goAnotherPage('/phone/setemail?id=' + id)
  }

  // 所属行业
  changeInstury (id) {
    this.$router.push({
      path: '/instury',
      query: { id: id }
    })
  }

  // 银行账户
  addbank () {
    const toat1 = Toast.loading({
      message: '加载中...',
      forbidClick: true
    })
    this.banklist().then((res: any) => {
      console.log(res)
      toat1.clear()
      this.loading = true
      if (res.data.data.length === 0) {
        this.$router.push('/bank')
      } else {
        this.$router.push('/banklist')
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.management{
  width: 100%;
  height: 100%;
  background: #F5F6F7;
}
.van-item{
  width: 100%;
  height: 54px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 16px;
  .van-cell__title{
    flex: 2;
    padding-left: 17px;
    .van-item-left{
      display:flex;
      align-items:center;
      span{
        font-size: 16px;
        color: #171826;
      }
    }
    span{
        font-size: 16px;
        color: #171826;
    }
    .van-icon-arrow{
      font-size:20px;
      color:#C0C4CC;
    }
  };
  .van-cell__value{
      font-size: 14px;
      color: #2ABED1;
  }
}
.com_name{
    margin-bottom: 10px;
}
.business{
    width: 100%;
    height: 40px;
    background: #F5F6F7;
    line-height: 40px;
    padding-left: 16px;
    font-size: 16px;
    color: #9B9CA3;
}
// 底部按钮
.add_company{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: modify(0.08rem) modify(0.16rem) modify(0.12rem);
  background-color: #fff;
  .cancellation{
    width: 343px;
    height: 46px;
    margin: 8px 0 12px 0;
    background: #ffffff;
    font-size: 18px;
    color: #FB483D;
    text-align: center;
    line-height: 26px;
  }
}
</style>
