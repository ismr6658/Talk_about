<template>
  <div class="mai">
    <div class="catalog" v-for="(item, index) in list" :key="index">
      <div class="firstCata" @click="item.isFirst = !item.isFirst">
        <img src="~@/assets/right.png" alt="" class="right" />
        <div class="name">{{ item.city }}</div>
      </div>
      <div
        class="catalogli"
        v-for="(secend, index) in item.cityInfo"
        :key="index"
        v-show="item.isFirst"
      >
        <div class="firstCata" @click="secend.isSecend = !secend.isSecend">
          <img src="~@/assets/right.png" alt="" class="right" style="margin-left:14px;"/>
          <div class="name">{{ secend.department }}</div>
        </div>
        <div
          class="catalogli"
          v-for="li in secend.groupInfo"
          :key="li.username"
          v-show="secend.isSecend"
        >
          <div
            class="item"
            @click="showMsg(li)"
            :class="{ act: li.username == act }"
            @contextmenu.stop="menu(li)"
          >
            <img src="~@/assets/head.jpg" alt="" class="head" style="margin-left:30px;"/>
            <div class="name">{{ li.nickname }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import sendMsg from "../mixin/sendMsg.js";
export default {
  mixins: [sendMsg],
  data() {
    return {
      list: [],
      act: ""
    };
  },
  methods: {
    openSecend() {
      alert(1);
    },
    showMsg(o) {
      this.act = o.username;
      this.$store.dispatch("setPeopleInfo", o);
      this.$emit("up");
      console.log("a");
    },
    set_act: function() {
      var act = this.$store.state.current_talker;
      this.act = act.username;
    },
    menu(o) {
      var _this = this;
      var remote=this.$electron.remote
      var menu=remote.Menu
      var menuItem=remote.MenuItem

      var men=new menu()
      men.append(new menuItem({label:'发消息',click:function(){
          _this.sendMsg(o)
      }}))
      men.append(new menuItem({label:'标为星际朋友',click:function(){
          alert('待开发')
      }}))
      men.append(new menuItem({label:'发送名片',click:function(){
          alert('待开发')
      }}))
      men.append(new menuItem({label:'删除好友',click:function(){
          alert('待开发')
      }}))

      men.popup(remote.getCurrentWindow())
    }
  },
  mounted() {
    var _this = this;

    var send={
        action:'user.list',
        page:1,
        page_size:100
    }

    _this.ajax(send,function(data){
        // console.log('______________________________')
        // console.log(data.list)
    })
    _this.list = this.$store.state.map;
  
  }
};
</script>
<style lang="less" scoped>
.mai {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0px;
    color: transparent;
  }
  .catalog {
    .firstCata {
      font-size: 14px;
      line-height: 36px;
      color: #111;
      padding-left: 12px;
      display: flex;
      height: 36px;
      align-items: center;
    }
    .catalogli {
      font-size: 14px;
      line-height: 36px;
      color: #111;
      // padding-left: 14px;
    }
  }
  .item {
    width: 100%;
    height: 60px;
    position: relative;
    display: flex;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #222222;
    align-items: center;
    .head {
      width: 34px;
      height: 34px;
      border-radius: 4px;
      margin: 0 12px;
    }
  }
  .item.act {
    background-color: #c5c4c4;
  }
  .right {
    height: 10px;
    display: block;
    margin-right: 5px;
  }
}
.name{
   user-select:none;
}
</style>
