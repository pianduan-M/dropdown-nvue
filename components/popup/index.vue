<template>
  <view>
    <overlay
      :show="show"
      :z-index="zIndex"
      :customStyle="overlayStyle"
      :duration="duration"
      @click="onClickOverlay"
    />
    <transition
      @transitionend="onTransitionEnd"
      name="fade"
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @enter-cancelled="enterCancelled"
      @before-leave="beforeLeave"
      @leave="leave"
      @after-leave="afterLeave"
      @leave-cancelled="leaveCancelled"
      appear
    >
      <view
        v-if="show"
        class="popup"
        :class="['custom-class', position, round]"
        :style="[{ zIndex }, customStyle]"
        @touchmove.stop.prevent="noop"
        @tap.stop.prevent="noop"
      >
        <slot />
      </view>
    </transition>
  </view>
</template>

<script>
import overlay from "../overlay";

export default {
  components: { overlay },
  props: {
    round: Boolean,
    closeable: Boolean,
    customStyle: String,
    overlayStyle: String,
    transition: {
      type: String,
    },
    zIndex: {
      type: Number,
      default: 100,
    },
    overlay: {
      type: Boolean,
      default: true,
    },
    closeIcon: {
      type: String,
      default: "cross",
    },
    closeIconPosition: {
      type: String,
      default: "top-right",
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true,
    },
    position: {
      type: String,
      default: "center",
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: true,
    },
    safeAreaInsetTop: {
      type: Boolean,
      default: false,
    },
    lockScroll: {
      type: Boolean,
      default: true,
    },
    show: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number,
      default: 300,
    },
  },
  mounted() {
    console.log(this.customStyle,'customStyle');
  },
  methods: {
    beforeEnter() {
      this.$emit('beforeEnter');
    },
    enter() {
      this.$emit('enter');
    },
    afterEnter() {
      this.$emit('afterEnter');
    },

    enterCancelled() {
      this.$emit('enterCancelled');
    },
    beforeLeave() {
      this.$emit('beforeLeave');
    },
    leave() {
      this.$emit('leave');
    },
    afterLeave() {
      this.$emit('afterLeave');
    },
    leaveCancelled() {
      this.$emit('leaveCancelled');
    },

    onClickCloseIcon() {
      this.$emit("close");
    },

    onClickOverlay() {
      this.$emit("click-overlay");

      if (this.closeOnClickOverlay) {
        this.$emit("close");
      }
    },
    // for prevent touchmove
    noop() {},
  },
};
</script>

<style lang="scss" scoped>
.popup {
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  max-height: 100%;
  overflow-y: auto;
  transition-timing-function: ease;
  animation: ease both;
  -webkit-overflow-scrolling: touch;
  background-color: var(--popup-background-color, #fff);

  transition: 0.3s ease transform;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);

  &.round {
    border-radius: 20rpx;
  }
}

.fade-enter-from,
.fade-leave-to {
  transform: translateY(-100%);
}

.fade-enter-to,
.fade-leave-from {
  transform: translateY(0);
}
</style>
