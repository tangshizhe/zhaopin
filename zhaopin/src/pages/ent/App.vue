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
@Component({
  components: {
    FooterGuideVue
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
      .guide_item{
        display: flex;
        justify-items: center;
        align-items: center;
        .item_text{
          font-size: .4rem;
        }
      }
    }
  }
</style>
