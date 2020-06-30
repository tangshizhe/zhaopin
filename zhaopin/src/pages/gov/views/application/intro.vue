<template>
  <layout>
    <template v-slot:main>
      <div class="intro">
        <div class="g-title">2020年财政扶持资金政策</div>
        <div class="g-intro-text">
          为全面落实中央和省市统筹推进疫情防控和经济社会发展的各项决策部署，确保疫情防控和经济社会发展双胜利。金水区科技局助力科技企业复工复产，从加强疫情排查防控、优化科技服务流程、加强资金项目支持等方面，强化4项具体政策措施，致力于帮助企业渡过难关，有序做好复工复产工作，确保疫情防控和科技创新发展两手抓、两手硬，双推进、双见效。
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <div class="j-button-group">
        <router-link tag="button" class="j-button-confirm" to="/application/process">立即申请</router-link>
      </div>
    </template>
  </layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapActions } from 'vuex'

@Component({
  name: '',
  components: {},
  methods: {
    ...mapActions({
      index: 'home/index'
    })
  }
})

export default class extends Vue {
  protected index!: any

  created () {
    // console.log(this)
  }

  mounted (): void {
    this.index().then((res: any) => {
      console.log(res)
    })
  }
}
</script>
<style lang="scss">
  .intro {
    height: 100%;
    padding: 0 16px;
    background-color: #fff;
  }
  .g-title {
    display: flex;
    align-items: center;
    height: 54px;
    font-size: 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
  .g-intro-text {
    padding-top: 16px;
    font-size: 15px;
    line-height: 22px;
    color: #5F5E64;
  }
</style>
