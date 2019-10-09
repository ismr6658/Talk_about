<template>
  <div>
    <div class="t1" style="display:none;">
      <img src="~@/assets/setting.svg" alt="" @click="top" />
    </div>
    <div class="t2">
      <img src="~@/assets/最小化.svg" alt="" @click="mini" />
    </div>
    <div class="t3">
      <img src="~@/assets/最大化.svg" @click="toggle_size" alt="" v-show="!isMaxMin"/>
      <img src="~@/assets/nomax.svg" @click="toggle_size" alt="" v-show="isMaxMin"/>
    </div>
    <div class="t4"><img src="~@/assets/关闭.svg" alt="" @click="close" /></div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      isMaxMin: false
    };
  },
  methods: {
    toggle_size: function() {
      if (this.isMaxMin) {
        this.isMaxMin = false;
        this.$electron.ipcRenderer.send("toggle_size", true);
      } else {
        this.isMaxMin = true;
        this.$electron.ipcRenderer.send("toggle_size", false);
      }
    },
    close: function() {
      this.$electron.remote.getCurrentWindow().hide();
    },
    mini: function() {
      this.$electron.remote.getCurrentWindow().minimize();
    },
    top: function() {
      var _this = this;
      if (_this.$electron.remote.getCurrentWindow().isAlwaysOnTop()) {
        _this.$electron.remote.getCurrentWindow().setAlwaysOnTop(false);
      } else {
        _this.$electron.remote.getCurrentWindow().setAlwaysOnTop(true);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.t1,
.t2,
.t3,
.t4 {
  -webkit-app-region: no-drag;
  width: 14px;
  height: 14px;
  img {
    width: 100%;
  }
  position: absolute;
  right: 110px;
  top: 10px;
  &:hover {
    background: rgba(255, 0, 0, 0.74);
  }
}
.t2 {
  right: 80px;
}
.t3 {
  right: 50px;
}
.t4 {
  right: 20px;
  width: 13px;
  height: 13px;
}
</style>
