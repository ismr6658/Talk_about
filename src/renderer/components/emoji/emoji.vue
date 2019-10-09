<template>
  <div class="out">
    <div class="nopic" @click.stop="isHave = false" v-if="isHave">
      请稍后再试
    </div>
    <div class="cont">
      <img
        v-for="li in list"
        :key="li.emoji_id"
        :src="li.emoji_img"
        alt=""
        @click="$emit('send', li.emoji_id)"
      />
    </div>
  </div>
</template>
<script>
var _ = require("lodash");
export default {
  data() {
    return {
      isHave: false,
      list: []
    };
  },
  methods: {},
  mounted() {
    var list = this.$store.state.emoji;
    // list=_.take(list,10)
    // _.forEach(list,function(o){
    //     o.emoji_img='data:image/png;base64,'+o.emoji_img
    // })
    this.list = list;
    if (this.list.length == 0) {
      this.isHave = true;
    } else {
      this.isHave = false;
    }
    // var len=list.length

    //  this.list=_.fill(Array(20),1)
  }
};
</script>
<style lang="less" scoped>
.out {
  width: 355px;
  // height:290px;
  background-color: white;
  box-shadow: 0 0 16px 2px rgba(10, 10, 10, 0.2);
  padding: 5px;
  position: relative;
}
.nopic {
  color: #ccc;
  background: rgba(0, 0, 0, 0.5);
  line-height: 10px;
  text-align: center;
  font-size: 12px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.cont {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  padding: 5px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background-color: white;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #dddddd;
    display: none;
  }
  img {
    display: block;
    height: 20px;
    width: 20px;
    margin: 5px;
  }
}
.cont:hover {
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #dddddd;
    display: block;
  }
}
</style>
