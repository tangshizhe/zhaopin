<template>
  <layout>
    <template v-slot:main>
      <van-cell-group title="收据模板" class="j-cell">
        <van-cell center title="今收到" :value="info.lender" />
        <van-cell center title="系付" :value="info.desc" />
        <van-cell class="price" center title="金额">
          <template #right-icon>
            <div class="r-container">
              <div class="price-cn">{{ info.price | upPrice | addSpace }}</div>
              <div class="price-number">
                <span>&yen;：</span>
                <span>{{ info.price + '元' }}</span>
              </div>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
      <van-cell-group class="upload-container" title="收据信息">
        <div class="van-cell-group__title">为了确保一次性审核通过，请根据收据模板信息正确、整齐填写</div>
        <div class="upload">
          <van-uploader v-model="fileList" :after-read="afterRead" :max-count="1">
            <div class="upload-text">上传收据照片</div>
          </van-uploader>
        </div>
      </van-cell-group>
      <van-cell-group title="收款银行账户" class="account-list-container">
        <van-cell v-if="accountList.length === 0" center title="添加银行账户" is-link url="/vant/mobile.html" />
        <div v-else class="account-list">
          <van-cell center is-link url="/vant/mobile.html">
            <template #title>
              <div class="deposit-bank">中国建设银行郑州市黄河支行</div>
              <div class="card-number">12123123123132123132132</div>
            </template>
            <template #label>
              <span class="icon-person"></span>
              <span class="info-name">张丽红</span>
              <span class="info-tel">135623232322</span>
            </template>
          </van-cell>
        </div>
      </van-cell-group>
    </template>
    <template v-slot:footer>
      <div class="j-button-group">
        <button class="j-button-confirm">提交</button>
      </div>
    </template>
  </layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapActions } from 'vuex'
import { Cell, CellGroup, Uploader } from 'vant'

@Component({
  name: '',
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Uploader.name]: Uploader
  },
  methods: {
    ...mapActions({
      index: 'home/index'
    })
  },
  filters: {
    addSpace (v) {
      return v.split('').join(' ')
    }
  }
})

export default class extends Vue {
  protected index!: any

  info = {
    lender: '郑州市金水区科学技术局，项目名称项目名称项目名称项目名称项目名称项目名称项目名称项目名称项目名称项目名称项目名称项目名称',
    desc: '资金名称-项目名称',
    price: 2123123
  }

  accountList: any = [
    {}
  ]

  fileList: any = []

  created () {
    // console.log(this)
  }

  mounted (): void {
    this.index().then((res: any) => {
      console.log(res)
    })
  }

  // 执行文件上传操作
  afterRead (file) {
    console.log(file)
  }
}
</script>
<style lang="scss">
.van-cell {
  .r-container {
    font-size: 16px;
    .price-cn {
      color: #9B9CA3;
    }
    .price-number {
      color: #171826;
    }
  }
}
.upload-container {
  background-color: transparent;
  &:after {
    border-width: 0;
  }
  .van-cell-group__title {
    padding-top: 5px;
  }
}

.account-list-container {
  margin-bottom: 46px;
}

.account-list {
  .deposit-bank {
    color: #5F5E64;
    font-size: 12px;
    line-height: 18px;
  }
  .card-number {
    margin: 8px 0 17px;
    color: #171826;
    font-size: 16px;
    line-height: 20px;
  }
  .van-cell__label {
    display: flex;
    align-items: center;
    color: #9B9CA3;
    font-size: 12px;
    line-height: 18px;
    span {
      margin-right: 8px;
    }
  }
}
</style>
