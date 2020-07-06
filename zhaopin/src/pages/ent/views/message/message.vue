<template>
  <layout>
    <template v-slot:main></template>
    <template v-slot:footer>
      <keep-alive>
        <FooterGuideVue></FooterGuideVue>
      </keep-alive>
    </template>
  </layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Cell, CellGroup } from 'vant'
import { mapActions } from 'vuex'
import FooterGuideVue from '@/components/FooterGuide.vue'
@Component({
  components: {
    FooterGuideVue,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  methods: {
    ...mapActions({
      indexpage: 'home/indexpage'
    })
  }
})
export default class extends Vue {
  protected indexpage!: any
  list = []
  imglink = ''
  sum = 0
  adminIndex = 0
  loading = false
  created () {
    // 通过首次使用接口查询是否绑定手机号、是否有认证企业
    this.indexpage().then((res: any) => {
      console.log(res)
    })
  }
}
</script>
<style lang="scss" scoped>

.j-tag{
  display: flex;
  justify-content: center;
  align-items: center;
  height:22px;
  line-height: normal;
  padding: 0 8px;
  border: 1px solid #2ABED1;
  color: #2ABED1;
  border-radius:11px;
  font-size: 13px;
  white-space: nowrap;
}
.tag-danger {
  color:#FB483D;
  border-color: #FB483D;
}
.tag-fail {
  color:#C0C4CC;
  border-color: #C0C4CC;
}
.enterprise{
  width: 100%;
  height: 100%;
  background: #F5F6F7;
}
.van-item{
  width: 100%;
  padding: 16px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 16px;
  font-size: 16px;
  color: #171826;
  .van-cell__title{
    padding-left: 17px;
    .van-item-left{
      display:flex;
      align-items:center;
    }
    .van-icon-arrow{
      font-size:20px;
      color:#C0C4CC;
    }
  }
}

</style>
