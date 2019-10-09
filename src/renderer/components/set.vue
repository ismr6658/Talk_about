<template>
  <div class="mai">
    <div class="area"></div>

    <div class="title">设置</div>

    <div class="t4">
      <img src="~@/assets/关闭.svg" alt="" @click="close" />
    </div>

    <div class="left">
      <router-link class="item" :to="{ name: 'count' }">账号设置</router-link>
      <router-link class="item" :to="{ name: 'common' }">通用设置</router-link>
      <router-link class="item" :to="{ name: 'quick' }">快捷设置</router-link>
      <router-link class="item" :to="{ name: 'about' }">关于IM</router-link>
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import minMax from "@/components/minMax/minMax";
export default {
  components: {
    minMax
  },
  methods: {
    close: function() {
      this.$electron.remote.getCurrentWindow().hide();
    }
  }
};
</script>
<style lang="less" scoped>
.mai {
  width: 100%;
  height: 100%;
  position: relative;
  background: #f5f5f5;
  .title {
    color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 50px;
    background: #2e89ef;
    line-height: 50px;
    padding-left: 20px;
  }
  .left {
    position: absolute;
    left: 0px;
    bottom: 0px;
    top: 50px;
    width: 120px;
    border-right: 1px solid #ddd;
    padding-top: 15px;
    .item {
      display: block;
      text-align: center;
      height: 30px;
      font-size: 14px;
      line-height: 30px;
      text-align: center;
      color: #333333;
      position: relative;
    }
    .link-act {
      color: #2e89ef;
    }
    .link-act:after {
      content: "";
      background: #2e89ef;
      position: absolute;
      right: -2px;
      top: 5px;
      bottom: 7px;
      display: block;
      width: 3px;
    }
  }
  .right {
    position: absolute;
    left: 120px;
    right: 0px;
    bottom: 0px;
    top: 50px;
    padding: 15px 20px;
  }
}

.area {
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  height: 60px;
  -webkit-app-region: drag;
}

.t4 {
  -webkit-app-region: no-drag;
  width: 14px;
  height: 14px;
  img {
    width: 100%;
  }
  position: absolute;
  right: 20px;
  top: 14px;
  &:hover {
    background: #4D9CF4;
  }
}
</style>
