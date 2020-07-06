<template>
  <layout>
    <template v-slot:main>
      <button @click="tologin()">登录/注册</button>
    </template>
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

  tologin () {
    this.$router.push('/login')
  }
}
</script>
<style lang="scss" scoped></style>
