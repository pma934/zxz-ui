## 起步

CDN 引入 
```
<!-- import Vue.js -->
<script src="//vuejs.org/js/vue.min.js"></script>
<!-- import stylesheet -->
<link rel="stylesheet" href="https://unpkg.com/zxz-ui@1.0.1/dist/zxz-ui.css">
<!-- import zxz-ui -->
<script src="https://unpkg.com/zxz-ui@1.0.1/dist/zxz-ui.js"></script>
```
NPM 安装 
```
$ npm install zxz-ui --save
```
```
import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import ZxzUi from "zxz-ui";
import "zxz-ui/dist/zxz-ui.css";

Vue.use(ZxzUi);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
```

---

## 组件

#### 旋转卡片
![image](https://s2.ax1x.com/2019/07/26/euZR5F.png)

- vue示例: https://39zzw.csb.app/#/rotate-card
```vue
<template>
  <div>
    <rotate-card
      :cardsUrl="images"
      :radius="300"
      :cardWidth="200"
      :cardHeight="340"
      :clockwise="false"
      :cycle="30"
      :isDrag="true"
    ></rotate-card> 
  </div>
</template>

<script>
export default {
  name: "use-rotate-card",
  data() {
    return {
      images: [
        "https://s2.ax1x.com/2019/06/16/VToxQH.jpg",
        "https://s2.ax1x.com/2019/06/23/Z9z7DK.jpg",
        "https://s2.ax1x.com/2019/06/23/Z9zHHO.jpg",
        "https://s2.ax1x.com/2019/06/23/Z9zLUe.jpg",
        "https://s2.ax1x.com/2019/06/23/Z9zO4H.jpg",
        "https://s2.ax1x.com/2019/06/23/Z9zqED.jpg"
      ]
    };
  },
  components: {
  }
};
</script>

```

- html示例: https://codepen.io/pma934/pen/YmGJOe

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
</head>

<body>
  <div id="app">
    <rotate-card :cards-url="images" :radius="300" :card-width="200" :card-height="340" :clockwise="false" :cycle="30" :is-spin="true" :is-drag="true" :card-click-event="(url,index)=>{window.open(url)}" />
  </div>
  <script src="https://vuejs.org/js/vue.min.js"></script>
  <script src="https://unpkg.com/zxz-ui@1.0.1/dist/zxz-ui.js"></script>
  <link rel="stylesheet" href="https://unpkg.com/zxz-ui@1.0.1/dist/zxz-ui.css">
  <script>
    new Vue({
      el: "#app",
      data: {
      },
    });
  </script>
</body>

</html>
```
- API

属性|说明|类型|默认值
---|---|---|---
cards-url|图片url|Array|[,,,,]
radius|半径(组件高为2倍radius，宽为3倍radius)|Number|200
card-width|卡片宽|Number|120
card-height|卡片高|Number|180
clockwise|顺时针旋转|Boolean|false
cycle|旋转一圈时间(秒)|Number|60
is-spin|是否自旋|Boolean|true
is-drag|是否可拖动|Boolean|false
card-click-event|卡片点击事件(参数一是图片url，参数二是序号)|Function|() => {}
