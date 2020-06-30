<template>
  <div class="application">
    <router-view/>
  </div>
</template>

<style lang="scss">
  $color_main: #2ABED1;
  .application {
    height: 100%;
  }

  .icon-exchange {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: #fff url(~@/assets/image/icon-exchange.png) no-repeat center;
    background-size: contain;
  }

  .icon-person {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: transparent url(~@/assets/image/icon-person.png) no-repeat center;
    background-size: contain;
  }

  // 自定义单元格
  .van-cell {
    min-height: 54px;
  }
  .j-main .van-cell-group__title {
    padding: 8px 16px;
    font-size: 16px;
    line-height: 24px;
  }
  .j-cell {
    font-size: 16px;
    color: #171826;
    .van-cell {
      .van-cell__title {
        flex: none;
        min-width: 22%;
        color: #5F5E64;
        font-size: 15px;
        line-height: 22px;
      }
      .van-cell__value,
      .van-cell__label {
        text-align: left;
        color: #171826;
        font-size: 16px;
        line-height: 24px;
      }
      .van-cell__label {
        margin-top: 8px;
      }
    }
  }
  // 自定义上传样式
  .upload {
    display: flex;
    justify-content: center;
    margin: 20px auto;
    width: 222px;
    height: 154px;
    background: transparent url(~@/assets/image/card-back.png) no-repeat center;
    background-size: contain;
    .van-uploader {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }
    .van-uploader__input,
    .van-uploader__input-wrapper {
      width: 100%;
      height: 100%;
    }
    .van-uploader__wrapper,
    .van-uploader__preview-image {
      width: 190px;
      height: 122px;
    }
    .upload-text {
      position: absolute;
      left: 50%;
      top: 50%;
      padding: 5px 14px;
      color: #fff;
      font-size: 15px;
      white-space: nowrap;
      background: #2ABED1;
      border-radius: 16px;
      transform: translate(-50%,-50%);
      opacity: 0.9;
    }
  }
</style>
