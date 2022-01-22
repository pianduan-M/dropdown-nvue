<template>
  <view>
    <view
      ref="bar"
      :style="[barStyle,]"
      class="dropdown-menu__bar"
      @touchstart="noop"
      @touchmove="noop"
      @touchend="noop"
    >
      <view
        class="dropdown-menu__title"
        :class="[item.disabled ? 'dropdown-menu__title__disabled' : '']"
        v-for="(item,index) in children"
        @click="toggleItem(index)"
        :key="index"
      >
        <text
          class="dropdown-menu__title__text"
          :style="item.showPopup ? 'color:' + activeColor : ''"
        >{{ item.displayTitle }}</text>
        <text class="title-icon" :style="titleStyle(item)">&#xe688;</text>
      </view>
    </view>
    <slot></slot>
  </view>
</template>

<script>
const dom = uni.requireNativePlugin("dom");
import {
  noop
} from './utils'

export default {
  name: 'dropdown-menu',
  provide() {
    return {
      dropdownMenu: this,
    };
  },
  props: {

    activeColor: {
      type: String,
      default: '#2878ff'
    },
    overlay: {
      type: Boolean,
      default: true,
    },
    duration: {
      type: [Number, String],
      default: 300,
    },
    direction: {
      type: String,
      default: 'down',
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true,
    },
    customStyle: {
      type: Object,
    },
  },

  beforeCreate() {
    this.noop = noop

    dom.addRule('fontFace', {
      fontFamily: 'arrowicon',
      src: "url('data:application/octet-stream;base64,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')"
    });

  },

  data() {
    return {
      offset: 0,
      children: [],
      active: '',
      barRect: {}
    };
  },

  computed: {

    opened() {
      return this.children.some((item) => item.showWrapper);
    },

    barStyle() {
      // if (this.opened) {
      //   return {
      //     zIndex: 1 + this.zIndex,
      //   };
      // }
      return {
        [this.direction === 'down' ? 'borderBottomWidth' : 'borderTopWidth']: '1px',

        boxShadow: this.direction === 'down' ? '0px 4px 2px rgba(0, 0, 0, 0.01);' : '0px -4px 2px rgba(0, 0, 0, 0.01);'
      }
    },

  },

  components: {},
  methods: {
    updateOffset() {
      if (!this.$refs.bar) {
        return;
      }
      dom.getComponentRect(this.$refs.bar, (res) => {
        this.barRect = res.size || {}
        this.offset = res.size.bottom;
      });
    },

    toggleItem(active) {
      this.children.forEach((item, index) => {
        if (index === active) {
          if (item.disabled) return
          item.toggle();
          this.active = active
        } else if (item.showPopup) {
          item.toggle(false, {
            immediate: true
          });
          this.active = ''
        }
      });
    },
    onChange(item) {
      this.$emit('change', item)
    },

    titleStyle(chidren) {

      let textColor = {}
      if (chidren.showPopup) {
        textColor = { color: this.activeColor }
      }

      const styles = {
        down: {
          transform: chidren.showPopup ? 'rotate(180deg)' : "rotate(0deg)",
          ...textColor
        },
        up: {
          transform: chidren.showPopup ? 'rotate(0deg)' : "rotate(-180deg)",
          ...textColor
        }
      }

      return styles[this.direction]

      // if (this.direction === 'down') {

      //   if (chidren.showPopup) {
      //     return {
      //       color: this.activeColor,
      //       transform: 'rotate(180deg)'
      //     }
      //   } else {
      //     return {
      //       transform: "rotate(0deg)",
      //     }
      //   }

      // }

      // if (this.direction === 'up') {

      //   if (chidren.showPopup) {
      //     return {
      //       color: this.activeColor,
      //       transform: 'rotate(0deg)'
      //     }
      //   } else {
      //     return {
      //       transform: 'rotate(-180deg)'
      //     }
      //   }

      // }

    }
  },
  mounted() { },
}
</script>

<style scoped>
.dropdown-menu__bar {
  box-sizing: border-box;
  width: 750rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 20px;
  justify-content: space-around;
  border-color: #e8e8e8;
  border-style: solid;
  background-color: #fff;
}

.dropdown-menu__bar .dropdown-menu__title {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}

.dropdown-menu__title .dropdown-menu__title__text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
  margin-right: 10rpx;
}
.title-icon {
  color: #333;
  font-family: arrowicon;
  transform: "rotate(0deg)";
  transform-origin: center center;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  transition-property: transform;
  font-size: 28rpx;
}

.dropdown-menu__title__disabled .dropdown-menu__title__text {
  color: #e8e8e8;
}
.dropdown-menu__title__disabled .title-icon {
  color: #e8e8e8;
}
</style>
