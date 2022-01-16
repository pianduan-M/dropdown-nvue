<template>
  <view v-if="showWrapper" :class="['dropdown-item', direction]" :style="wrapperStyle">
    <popup
      :show="showPopup"
      :custom-style="'position: absolute;' "
      overlay-style="position: absolute;"
      :overlay="overlay"
      :duration="transition ? duration : 0"
      :close-on-click-overlay="closeOnClickOverlay"
      @enter="onOpen"
      @leave="onClose"
      @close="toggle"
      @after-enter="onOpened"
      @after-leave="onClosed"
    >
      <view
        class="cell dropdown-item__option"
        v-for="item in options"
        :key="item.value"
        :class="[item.value === value ? 'active' : '']"
        @tap.stop.prevent="onOptionTap(item)"
      >
        <view
          class="dropdown-item__title"
          :style="[item.value === value ? 'color:' + activeColor : '']"
        >{{ item.text }}</view>
        <view
          class="dropdown-item__icon"
          v-if="item.value === value"
          :style="['color:' + activeColor]"
        />
      </view>

      <slot />
    </popup>
  </view>
</template>

<script>
import popup from '../popup'

export default {
  components: { popup },
  props: {
    value: {
      type: String,

    },
    title: {
      type: String,

    },
    disabled: Boolean,
    titleClass: {
      type: String,

    },
    options: {
      type: Array,
      default() {
        return []
      },

    },
    popupStyle: String,
  },
  data() {
    return {
      transition: true,
      showPopup: false,
      showWrapper: false,
      displayTitle: '',
    }
  },
  methods: {
    rerender() {
      this.$nextTick(() => {
        this.$parent.$parent?.updateItemListData();
      });
    },

    updateDataFromParent() {
      if (this.$parent.$parent) {
        const {
          overlay,
          duration,
          activeColor,
          closeOnClickOverlay,
          direction,
        } = this.$parent.$parent;

        this.overlay = overlay
        this.duration = duration
        this.activeColor = activeColor
        this.closeOnClickOverlay = closeOnClickOverlay
        this.direction = direction
      
      }
    },

    onOpen() {
      this.$emit('open');
    },

    onOpened() {
      this.$emit('opened');
    },

    onClose() {
      this.$emit('close');
    },

    onClosed() {
      this.$emit('closed');
      this.showWrapper = false
    },

    onOptionTap(option) {

      const { value } = option

      const shouldEmitChange = this.value !== value;
      this.showPopup = false
      this.value = value
      this.$emit('close');

      this.rerender();

      if (shouldEmitChange) {
        this.$emit('change', value);
      }
    },

    toggle(show, options = {}) {

      if (typeof show !== 'boolean') {
        this.show = !this.showPopup;
        this.showPopup = this.show
      }

      if (show === this.showPopup) {
        return;
      }

      this.transition=!this.options.immediate

      if (this.show) {
        console.log(this.$parent.$parent);
        this.$parent.$parent?.getChildWrapperStyle().then((wrapperStyle) => {
          this.wrapperStyle = wrapperStyle
          this.showWrapper = true
          this.rerender();
        });
      } else {
        this.rerender();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.dropdown-item__option {
  width: 750rpx;
  padding: 20rpx;
  background-color: #fff;
}

</style>