<template>
  <view class="content">
    <dorpdown-menu>
      <dorpdown-item :options="options" v-model="value"></dorpdown-item>
      <dorpdown-item :options="options2" v-model="value2"></dorpdown-item>
    </dorpdown-menu>
    
    <navigator
      url="/pages/test"
      open-type="navigate"
      hover-class="none">
      test
    </navigator>
  </view>
</template>

<script>

import popup from "../../components/popup";

import dorpdownItem from "../../components/src/dorpdown-item/index.vue";
import dorpdownMenu from ".../../components/src/dropdown-menu/index.vue";

export default {
  components: { popup, dorpdownMenu, dorpdownItem },
  data() {
    return {
      title: "Hello",
      show: false,
      options: [
        {
          text: "a",
          value: "a",
        },
        {
          text: "b",
          value: "b",
        },
        {
          text: "c",
          value: "c",
        },
        {
          text: "d",
          value: "d",
        },
      ],
      options2: [
        {
          text: "4e324",
          value: "4324",
        },
        {
          text: "23432",
          value: "2344b",
        },
        {
          text: "432",
          value: "32432",
        },
        {
          text: "d43242",
          value: "4324d",
        },
      ],
      value: "a",
      value2: "4324d",
    };
  },
  onLoad() {},
  methods: {},
};
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 200px;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
