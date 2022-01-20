<template>
  <view>
    <view ref="bar" :style="barStyle" class="dropdown-menu__bar" @touchstart="noop" @touchmove="noop" @touchend="noop">
      <view
        class="dropdown-menu__title"
        v-for="(item,index) in children"
        @click="toggleItem(index)"
        :key="index"
      >
        <text
          class="dropdown-menu__title__text"
          :style="{ color: activeColor }"
        >{{ item.displayTitle }}</text>
      </view>
    </view>
    <slot></slot>
  </view>
</template>

<script>
const dom = uni.requireNativePlugin("dom");
import {noop} from './utils'

export default {
  name: 'dropdown-menu',
  provide() {
    return {
      dropdownMenu: this,
    };
  },
  props: {

    activeColor: String,
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
      if (this.opened) {
        return {
          zIndex: 1 + this.zIndex,
        };
      }
    },
  },

  components: {
  },
  methods: {
    updateOffset() {
      if (!this.$refs.bar) {
        return;
      }
      dom.getComponentRect(this.$refs.bar, (res) => {
        this.barRect = res.size || {}
        console.log(this.barRect);
        this.offset = res.size.bottom;
      });
    },

    toggleItem(active) {
      this.children.forEach((item, index) => {
        if (index === active) {
          item.toggle();
        } else if (item.showPopup) {
          item.toggle(false, { immediate: true });
        }
      });
    },
    onChange(item) {
      this.$emit('change', item)
    }
  },
  mounted() {
  },
}
</script>

<style  scoped>
.dropdown-menu__bar {
  box-sizing: border-box;
  width: 750rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 20px;
  justify-content: space-around;
}

.dropdown-menu__bar .dropdown-menu__title {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}

.dropdown-menu__title .dropdown-menu__title__text {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
}

.dropdown-menu__title.active .dropdown-menu__title__text {
  color: #3aa0ff;
}
</style>