<template>
  <layout>
    <template v-slot:main>
      <van-cell-group title="收款银行账户" class="account-list-container">
        <van-cell v-if="accountList.length === 0" center title="添加银行账户" @click="toadd()" is-link />
        <div v-else class="account-list">
          <van-cell center is-link  @click="viewdeails(item.id)" v-for="(item, index) in accountList" :key="index">
            <template #title>
              <div class="deposit-bank">
                <span>{{item.branch}}</span>
                <em v-if="item.main == 1" class="main-account">主账户</em>
              </div>
              <div class="card-number">{{item.code.replace(/\s/g, ' ').replace(/(.{4})/g, '$1 ')}}</div>
            </template>
            <!-- <template #label>
              <span class="icon-person"></span>
              <span class="info-name">{{item.person}}</span>
              <span class="info-tel">{{item.phone}}</span>
            </template> -->
          </van-cell>
        </div>
      </van-cell-group>
    </template>
    <template v-slot:footer>
      <div class="j-button-group">
        <button class="j-button-confirm" @click="toadd()">添加</button>
      </div>
    </template>
  </layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapActions } from 'vuex'
import { Cell, CellGroup } from 'vant'

@Component({
  name: 'bankList',
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  methods: {
    ...mapActions({
      banklist: 'home/banklist'
    })
  }
})

export default class extends Vue {
  protected banklist!: any

  accountList: any = []

  created () {
    this.banklist().then((res: any) => {
      console.log(res)
      this.accountList = res.data.data
    })
  }

  mounted (): void {
    // console.log(this)
  }

  // 添加银行账户
  toadd () {
    this.$router.push('/bank')
  }

  // 查看详细信息
  viewdeails (id) {
    this.$router.push('/bankdetail?id=' + id)
  }
}
</script>
<style lang="scss">
.account-list-container {
  background: transparent;
  .van-cell {
    padding: 16px;
    margin-bottom: 10px;
  }
  .deposit-bank{
    display: flex;
    align-items: center;
    font-size: 12px;
  }
  .card-number{
    margin-bottom: 0;
  }
}
.main-account{
  display: inline-block;
  min-width: 55px;
  margin-left: 16px;
  padding: 2px 8px;
  color: #2ABED1;
  font-size: 13px;
  border: 0.5px solid #2ABED1;
  box-sizing: border-box;
  border-radius: 14px;
  white-space: nowrap;
}
</style>
