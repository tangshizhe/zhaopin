<template>
  <layout>
    <template v-slot:main>
      <van-cell-group title="递交内容" class="j-cell">
        <van-cell center>
          <template #title>
            <span class="highlight-text">1. </span>
            <span>收据纸质版</span>
            <span class="highlight-text">（加盖公章）</span>
          </template>
        </van-cell>
        <van-cell center>
          <template #title>
            <span class="highlight-text">2. </span>
            <span>对公账号信息纸质版</span>
            <span class="highlight-text">（加盖公章）</span>
          </template>
        </van-cell>
      </van-cell-group>
      <van-cell-group title="递交地址" class="j-cell materials">
        <van-cell title="河南省郑州市金水区东风路16号" label="1号楼6楼606室" center />
      </van-cell-group>
      <van-cell-group title="递交时间" class="j-cell materials">
        <van-cell title="2020.04.01 — 2020.04.30" label="周一至周五8:00-17:00" center />
      </van-cell-group>
    </template>
  </layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Cell, CellGroup } from 'vant'

@Component({
  name: '',
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  methods: {}
})

export default class extends Vue {
  created (): void {
    // console.log(this)
  }
}
</script>

<style lang="scss">
.materials {
  .van-cell__title {
    font-size: 16px;
    font-weight: bold;
    color: #171826;
  }
  .van-cell__label {
    font-size: 16px;
    font-weight: normal;
    color: #5F5E64;
  }
}
</style>
