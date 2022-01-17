<template>
  <view
    @touchmove.stop.prevent="noop"
    @tap.stop.prevent="onClick"
    v-if="show"
    class="overlay"
    :style="[{ 'z-index': zIndex }, customStyle]"
  >
    <slot></slot>
  </view>
</template>

<script>
export default {
  props: {
    show: Boolean,
    customStyle: String,
    duration: {
      type: null,
      default: 300,
    },
    zIndex: {
      type: Number,
      default: 1,
    },
    position: {
      type: String,
      default: "fixed",
    },
  },
  created() {
    console.log(this.customStyle, "ssss");
  },
  methods: {
    onClick() {
      this.$emit("click");
    },
    // for prevent touchmove
    noop() {},
  },
};
</script>

<style scoped>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 750rpx;
  background-color: rgba(0, 0, 0, 0.7);
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

.overlay-enter-to,
.overlay-leave-from {
  opacity: 1;
}
</style>
