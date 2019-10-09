<template>
  <div class="taling">
    <div
      class="item item-class-contact"
      v-for="(li, index) in list"
      :class="{ act: act == li.username }"
      @click="msg(li)"
      :key="index"
      @contextmenu.stop="menu"
    >
      <img src="~@/assets/head.jpg" alt="" />
      <div class="t1">{{ li.nickname }}</div>
      <!-- <div class="t2">{{li.t2}}</div>-->
      <div class="t3">{{ li.lastTalk }}</div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  data: function() {
    return {
      act: 1,
      list: [],
     
    };
  },
  methods: {
    update_list() {
      var _this = this;

      var ipc = this.$electron.ipcRenderer;
      ipc.send("find-contact", "find-contact");
      ipc.on("find-contact-ret", (event, args) => {
        console.log('每个人的最后一条消息');
        _this.$store.dispatch("add_talk_list", args.list);
        _this.list = _this.$store.state.talk_list;

        /* 添加每个联系人的最后一条消息 */
        var everyMsg = _this.$store.state.msgs.slice();
        for (var i = 0; i < _this.list.length; i++) {
          var newStr = '';
          var item = _this.list[i];
          for (var j = 0; j < everyMsg.length; j++) {
            if (item.username == everyMsg[j].user) {
              newStr = everyMsg[j].text
            }
          }
          console.log(newStr);
          item["lastTalk"] = newStr;
        }

        console.log(_this.list);
      });
    },
    msg(o) {
      var _this = this;
      _this.act = o.username;
      _this.$store.dispatch("setCurrent_talker", o);
      _this.$emit("up");
      console.log(_this.$store.state.msgs);
      console.log(_this.$store.state.talk_list);
      console.log(_this.$store.state.current_talker);
    },
    set_act() {
      this.act = this.$store.state.current_talker.username;
    },
    menu(e) {
      const remote = this.$electron.remote;
      const Menu = remote.Menu;
      const MenuItem = remote.MenuItem;

      var menu = new Menu();
      menu.append(
        new MenuItem({
          label: "置顶",
          click: function(e) {
            console.log("item 1 clicked");
          }
        })
      );
      menu.append(new MenuItem({ label: "消息免打扰" }));
      menu.append(new MenuItem({ label: "删除聊天" }));

      menu.popup(remote.getCurrentWindow());
    }
  },
  mounted() {
    var _this = this;
    _this.update_list();
  }
};
</script>

<style lang="less" scoped>
.item {
  width: 100%;
  height: 64px;
  position: relative;
  user-select: none;
  img {
    width: 40px;
    height: 40px;
    position: absolute;
    left: 12px;
    top: 12px;
    border-radius: 3px;
  }
  .t1 {
    font-size: 14px;
    // line-height: 14px;
    // width: 130px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    position: absolute;
    left: 62px;
    right: 10px;
    top: 16px;
    color: #111;
  }
  .t2 {
    font-size: 12px;
    line-height: 14px;
    position: absolute;
    right: 12px;
    top: 16px;
    color: #999;
  }
  .t3 {
    font-size: 12px;
    line-height: 14px;
    // width: 130px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    position: absolute;
    left: 62px;
    right: 10px;
    bottom: 13px;
    color: #999;
  }
}
.item.act {
  background: #cac8c6;
}
</style>
