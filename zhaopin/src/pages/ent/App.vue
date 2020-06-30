<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    width: 100%;
    height: 100%;
    position: relative;
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
