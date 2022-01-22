<template>
  <view>
    <view
      class="dropdown-item__wrapper"
      ref="wrapper"
      :style="wrapperStyle"
      v-if="showWapper"
      @touchstart="noop"
      @touchmove="noop"
      @touchend="noop"
    >
      <!-- 边界 -->
      <view
        @touchstart="onOutsideClick"
        @touchmove="noop"
        @touchend="noop"
        class="dropdown-outsilde"
        :style="outsideStyle"
      ></view>

      <Popup
        ref="popupRef"
        :show="showPopup"
        wrapperClass="popup-container"
        :customStyle="popupStyles"
        :overlayStyle="overlayStyle"
        :customAnimateStyles="popupAnimateStyles"
        :pos="position"
        :duration="duration"
        :top="this.parent.offset"
        @popupOverlayClicked="onOverlayClicked"
        @open="onOpen"
        @close="onClose"
        :overlay="showOverlay"
        :closeOnClickOverlay="closeOnClickOverlay"
        @opened="onOpened"
        @closed="onClosed"
      >
        <view
          v-for="item in options"
          @touchstart="onClick(item)"
          :key="item.value"
          class="dropdwon-item__title"
          :class="[titleClass]"
        >
          <!-- <image
            class="dropdown-item__icon"
            :src="item.icon"
            mode="scaleToFill"
            v-if="item.icon"
          /> -->
          <text
            :style="value === item.value ? activeStyle : ''"
            class="dropdwon-item__label"
          >{{ item.text }}</text>
          <view v-if="value === item.value">
            <slot name="active-icon"></slot>
          </view>
        </view>
        <slot></slot>
      </Popup>
    </view>
  </view>
</template>

<script>
import Popup from "../popup";
import { sortChildren,noop } from "../utils";


export default {
  components: {
    Popup,
  },
  inject: {
    dropdownMenu: {
      default: null,
    },
  },

  props: {
    value: null,
    title: String,
    titleClass: String,
    options: {
      type: Array,
      default: () => [],
    },
    customPopupStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      transition: true,
      showPopup: false,
      showWapper: false,

    };
  },

  computed: {
    parent() {
      if (this.disableBindRelation) {
        return null;
      }

      return this.dropdownMenu;
    },

    displayTitle() {
      if (this.title) {
        return this.title;
      }
      const match = this.options.filter((option) => option.value === this.value);
      return match.length ? match[0].text : "";
    },

    wrapperStyle() {
      if (this.position === "top") {
        return {
          top: this.parent.offset + "px",
        };
      }

      if (this.position === "bottom") {
        return {
          top: 0,
          // bottom:this.parent.barRect.top + 'px'
          height: this.parent.barRect.top + 'px'
        };
      }
    },

    popupStyles() {
      if (this.position === "top") {
        return { position: "absolute", top: 0, transform: `translateY(-100%)`, ...this.customPopupStyle };
      }

      if (this.position === "bottom") {
        return { position: "absolute", transform: `translateY(100%)`, bottom: 0, ...this.customPopupStyle };
      }
    },
    overlayStyle() {
      return { position: 'absolute' }
    },

    popupAnimateStyles() {
      if (!this.transition) return {};

      if (this.position === "top") {
        return {
          enter: { transform: `translateY(0)` },
          leave: {
            transform: `translateY(-100%)`,
          },
        };
      }

      if (this.position === "bottom") {
        return {
          enter: { transform: `translateY(0)` },
          leave: {
            transform: `translateY(100%)`,
          },
        };
      }
    },

    position() {
      if (this.parent.direction) {
        return this.parent.direction === 'up' ? 'bottom' : 'top';
      }
      return "top";
    },

    duration() {
      return this.parent.duration || 300;
    },

    outsideStyle() {
      let styles = {

      }

      if (this.position === "top") {
        styles = { top: 0, height: this.parent.barRect.top + 'px', }
      }

      if (this.position === "down") {
        styles = { top: this.parent.barRect.bottom + 'px', bottom: 0 }
      }

      console.log(styles, 'styles');

      return styles
    },

    activeStyle() {
      return `color:${this.parent.activeColor};`
    },

    showOverlay() {
      return this.parent.overlay || true
    },

    closeOnClickOverlay() {
      return this.parent.closeOnClickOverlay || true
    }
  },

  mounted() {
    this.bindRelation();
  },

  beforeCreate() {
    const createEmitter = (eventName) => () => this.$emit(eventName);

    this.onOpen = createEmitter("open");
    this.onClose = createEmitter("close");
    this.onOpened = createEmitter("opened");
    this.onClosed = createEmitter("closed");
    this.noop = noop;
  },

  methods: {
    bindRelation() {
      if (!this.parent || this.parent.children.indexOf(this) !== -1) {
        return;
      }
      const children = [...this.parent.children, this];

      sortChildren(children, this.parent);

      this.parent.children = children;
    },

    toggle(show = !this.showPopup, options = { immediate: false }) {

      if (show === this.showPopup) {
        return;
      }

      this.transition = !options.immediate;

      if (!show) {
        this.$refs.popupRef.hide()
        return
      } 

      this.showPopup = show;

      if (show) {
        this.parent.updateOffset();
        this.showWapper = true
      }
    },

    onOverlayClicked() {
      this.showPopup = false
      this.showWapper = false
    },

    onClick(item) {
      this.toggle(false)
      this.parent.onChange(item);
      this.$emit("input", item.value);
    },

    onOutsideClick(e) {
      this.noop(e)

      if (!this.parent.closeOnClickOutside) return
      this.$refs.popupRef.hide()
    }
  },
};
</script>

<style scoped>
.dropdown-item__wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  box-sizing: border-box;
}
.dropdown-outsilde {
  position: fixed;
  left: 0;
  right: 0;
}

.dropdwon-item__title {
  box-sizing: border-box;
  padding: 10px 20rpx;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 750rpx;
}

.dropdwon-item__title .dropdwon-item__label {
  font-size: 26rpx;
  color: #333;
  /* max-width: 710rpx; */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/* 
.dropdwon-item__title  .dropdown-item__icon {
  width: 50rpx;
  height: 50rpx;
} */
 
</style>
