<template>
  <layout>
    <template v-slot:main>
      <div>
        <div class="real">
          <van-cell title="实名认证" value="已认证" to="personalAuthResult?result=success" />
        </div>
        <div class="tel">
          <van-cell title="手机号" :value="phone" is-link @click="goPhone" />
        </div>
      </div>
    </template>
    <template v-slot:footer></template>
  </layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Cell } from 'vant'
import { mapActions } from 'vuex'
@Component({
  components: {
    [Cell.name]: Cell
  },
  methods: {
    ...mapActions({
      userInfo: 'home/userInfo'
    })
  }
})
export default class extends Vue {
  protected userInfo!: any
  phone = ''
  created () {
    this.userInfo().then((res: any) => {
      console.log(res)
      if (res.data.personalauth === 1) {
        this.phone = res.data.bondphone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
      } else {
        this.$router.push({ path: '/personalAuth?from=ent' })
      }
    })
  }

  goPhone () {
    this.$goAnotherPage('/phone/bindPhone')
  }
}
</script>
<style lang="scss" >
.real,.tel{
  margin-bottom: 16px;
  .van-cell{
    padding: 14px 17px;
  }
  .van-cell__title{
    font-size: 16px;
    line-height: 24px;
    color: #171826;
  }
  .van-cell__value{
    font-size: 14px;
  }
}
.real{
  .van-cell__value{
    color: #2ABED1;
  }
}
</style>
