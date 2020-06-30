<template>
  <layout>
    <template v-slot:main>
      <div class="process-info">
        <van-cell-group class="j-cell">
          <van-cell class="main-header">
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
              <van-tag type="plain">已认证</van-tag>
              <span class="com-name">南京招投标管理有限公司</span>
            </template>
            <template #right-icon>
              <div class="header-right icon-exchange"></div>
            </template>
          </van-cell>
          <van-cell center class="s-code" title="统一社会信用代码" :label="info.sCode" />
          <van-cell center title="所属街道" :value="info.address" />
          <van-cell center title="办公地址" :value="info.officeAddress" />
          <van-cell center title="联系人" :value="info.name" />
          <van-cell center title="联系电话" :value="info.phone" />
        </van-cell-group>
        <div class="j-button-confirm donot-click">申请流程</div>
        <steps :stepList="stepList" :active="stepActive"></steps>
      </div>
    </template>
  </layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapActions } from 'vuex'
import { Tag, Cell, CellGroup } from 'vant'
import steps from '@/components/steps-vertical.vue'

@Component({
  components: {
    [Tag.name]: Tag,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    steps
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
    sCode: '92371624MA55DLD696N',
    address: '花园路街道办事处',
    officeAddress: '河南省郑州市金水区花园路66号院 河南省郑州市金水区花园路66号院',
    name: '张丽红',
    phone: '18956565656'
  }

  // 从0开始，最大为List的stepList的长度-1
  stepActive = 2
  stepList = [
    {
      title: '上传收据',
      desc: '根据收据模板，完成收据填写后上传接受人工审核。',
      defaultActionText: '去填写',
      completeActionText: '查看',
      actionLink: '/application/receipts',
      completeLink: '/application/receipts'
    },
    {
      title: '递交纸质材料',
      desc: '收据信息审核完成后，系统将通知您前往科技局递交相关纸质材料。',
      defaultActionText: '去递交',
      completeActionText: '查看',
      actionLink: '/application/materials',
      completeLink: '/application/materials'
    },
    {
      title: '确认收款',
      desc: '纸质材料审核完毕，财政扶持金将打款至对公账号，收款后需对财政资金到账信息进行确认。',
      defaultActionText: '去确认',
      completeActionText: '已确认',
      actionLink: '/application/confirm',
      completeLink: '/application/confirm'
    }
  ]

  created (): void {
    // console.log(this)
  }

  mounted (): void {
    // this.index().then((res: any) => {
    //   console.log(res)
    // })
  }
}
</script>
<style lang="scss">
  .process-info {
    background-color: #fff;
    .main-header {
      padding-top: 15px;
      padding-bottom: 15px;
      justify-content: space-between;
      .com-name {
        margin-left: 8px;
        color: #171826;
        font-size: 16px;
        line-height: 24px;
      }
    }
  }

  .j-button-confirm.donot-click {
    height: 40px;
    background: #2ABED1;
    text-align: center;
    color: #fff;
    border-radius: 0;
  }

  .van-tag {
    height: 16px;
  }
  .van-tag--plain {
    color: #2ABED1;
    border: 1px solid #2ABED1;
    border-radius: 16px;
  }

  .van-cell {
    &.s-code {
      padding-top: 15px;
      padding-bottom: 15px;
    }
  }
</style>
