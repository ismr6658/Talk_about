<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "chat"
};
</script>

<style>
/* CSS */
body {
  margin: 0px;
  padding: 0px;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
 
}
* {
  box-sizing: border-box;
}
a,
a:link,
a:visited,
a:hover,
a:active {
  color: inherit;
  text-decoration: none;
  outline: none;
  border: none;
}
.mint-field .mint-cell-title {
  width: 40px !important;
}
.mint-cell-wrapper{
  background-image:  none !important;
}
</style>
