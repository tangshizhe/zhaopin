<template>
  <div id="app">
    <router-view/>
    <keep-alive>
      <FooterGuideVue></FooterGuideVue>
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FooterGuideVue from '../../components/FooterGuide.vue'
import { Icon } from 'vant'
@Component({
  components: {
    FooterGuideVue,
    [Icon.name]: Icon
  },
  methods: {}
})
export default class Components extends Vue {

}
</script>

<style lang="scss">
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    width: 100%;
    height: 100%;
    position: relative;
    .footer_guide{
      position: absolute;
      bottom: 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      height: 66px;
      background: #fff;
      .on{
        color: #2AB;
      }
      .guide_item{
        display: flex;
        flex-direction: column;
        justify-items: center;
        align-items: center;
        .item_text{
          font-size: .4rem;
        }
      }
    }
  }
</style>
