<template>
  <layout class="confirm">
    <template v-slot:main>
      <van-notice-bar wrapable :scrollable="false">
        足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。
      </van-notice-bar>
      <div class="make-collections">
        <van-cell-group title="收款账户信息" class="j-cell">
          <van-cell center title="银行账号" :value="info.cardNumber" />
          <van-cell center title="开户行" :value="info.depositBank" />
          <van-cell center title="联系人" :value="info.name" />
          <van-cell center title="联系方式" :value="info.tel" />
        </van-cell-group>
      </div>
      <div class="make-collections">
        <van-cell-group title="收款账户信息" class="j-cell">
          <van-cell center title="银行账号" :value="info.cardNumber" />
          <van-cell center title="开户行" :value="info.depositBank" />
          <van-cell center title="联系人" :value="info.name" />
          <van-cell center title="联系方式" :value="info.tel" />
        </van-cell-group>
      </div>
    </template>
  </layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Cell, CellGroup, NoticeBar } from 'vant'
import { mapActions } from 'vuex'

@Component({
  name: '',
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [NoticeBar.name]: NoticeBar
  },
  methods: {
    ...mapActions({
      index: 'home/index'
    })
  }
})

export default class extends Vue {
  protected index!: any

  info = {
    cardNumber: '6222 2222 2222 2222',
    depositBank: '中国建设银行郑州市黄河支行',
    name: '张三',
    tel: 132555555555
  }

  created (): void {
    // console.log(this)
  }
}
</script>

<style lang="scss">
.confirm {
  .van-cell-group__title {
    background-color: #F5F6F7;
  }
  .make-collections {
    .van-cell__value {
      text-align: right!important;
    }
  }
}
</style>
