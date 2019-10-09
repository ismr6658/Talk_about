<template>
  <div class="noticeBox">
    <div class="left">
      <ul>
        <li v-for="(item, index) in 2" :key="index">
          <p>
            <span>未读</span>
          </p>
          <p style="flex:1;margin:0 10px;overflow:hidden">
            <b>公告标题公告标题公告标题公告标题公告标题公告标题</b>
            <i>公告简介</i>
          </p>
          <p>
            <i>15:30</i>
          </p>
        </li>
      </ul>
    </div>
    <div class="right">
      <h3 class="name">公告标题</h3>
      <div class="content">
        <p class="time">2018-09-18</p>
        <p class="noticeInfo">
          公告内容
        </p>
        <p class="department">水利局</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
  mounted: function() {
    var _this = this;
  }
};
</script>
<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
}
.noticeBox {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9;
  .left {
    position: absolute;
    top: 0;
    left: 0;
    width: 250px;
    bottom: 0;
    z-index: 10;
    background: #e4e4e5;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: #dddddd;
      display: none;
    }
    &:hover::-webkit-scrollbar-thumb {
      display: block;
    }
    ul {
      li {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        align-items: center;
        box-sizing: border-box;
        height: 64px;
        p {
          height: 40px;
          span,
          b,
          i {
            display: block;
            font-style: normal;
            font-weight: 500;
          }
          span {
            width: 40px;
            height: 40px;
            background: #489af6;
            text-align: center;
            line-height: 40px;
            color: #fff;
            font-size: 12px;
            border-radius: 3px;
          }
          b {
            font-size: 14px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(17, 17, 17, 1);
            line-height: 18px;
            margin-bottom: 5px;
            text-overflow: ellipsis;
            width: 145px;
            white-space: nowrap;
            overflow: hidden;
          }
          i {
            font-size: 12px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            line-height: 18px;
          }
        }
      }
    }
  }
  .right {
    position: absolute;
    top: 0;
    left: 250px;
    right: 0;
    bottom: 0;
    .name {
      position: absolute;
      left: 0;
      top: 0px;
      font-size: 18px;
      width: 100%;
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #ccc;
      padding-left: 40px;
      background: #f5f5f5;
      z-index: 1;
      margin: 0;
    }
    .content {
      height: 100%;
      overflow-y: scroll;
      padding: 55px 30px;
      &::-webkit-scrollbar {
        width: 5px;
        height: 5px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: #dddddd;
        display: none;
      }
      &:hover::-webkit-scrollbar-thumb {
        display: block;
      }
      .time {
        font-size: 12px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 56px;
      }
      .noticeInfo {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(17, 17, 17, 1);
        text-indent: 2em;
        line-height: 20px;
        margin-bottom: 40px;
      }
      .department {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(17, 17, 17, 1);
        text-align: right;
        line-height: 20px;
      }
    }
  }
}
</style>