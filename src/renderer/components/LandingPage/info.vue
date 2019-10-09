<template>
  <div class="infoBox">
    <div class="topInfo">
      <div class="tleft">
        <h3>{{name}}</h3>
        <h5>账号：{{name}}</h5>
      </div>
      <img src="~@/assets/head.jpg" alt="" class="header"/>
    </div>
    <ul class="bottomInfo">
      <li>昵称<span>{{name}}</span></li>
      <li>性别<span>男</span></li>
      <li>电话<span>133363123456</span></li>
      <li>邮箱<span>hello@qq.com</span></li>
      <li>地区<span>山东 烟台</span></li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name:this.$store.state.user
    };
  },
 
  mounted(){
    console.log(this.$store.state.peopleInfo)
  }
};
</script>

<style scoped lang="less">
.infoBox {
  width: 298px;
  height: 375px;
  background: #fff;
  border-radius: 3px;
  position: absolute;
  top: 55px;
  left: 20px;
  padding: 30px;
  z-index: 11;
  
  .topInfo {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .tleft {
      h3 {
        font-size: 18px;
        color: #111;
        line-height: 36px;
        margin: 0;
        font-family: MicrosoftYaHei;
      }
      h5 {
        font-size: 14px;
        color: #999;
        font-family: MicrosoftYaHei;
        line-height: 16px;
        margin: 0;
        font-weight: 100;
      }
    }
    .header{
      width: 60px;
      height: 60px;
      display: block;
    }
  }
  .bottomInfo{
    padding: 0;
    padding-top: 30px;
    border-top: 1px solid #E0E0E0;
    li{
      list-style: none;
      font-size: 14px;
      color: #999;
      margin-bottom: 19px;
      font-family: MicrosoftYaHei;
      span{
        color: #111;
        margin-left: 20px;
        font-family: MicrosoftYaHei;
      }
    }
  }
}
</style>
