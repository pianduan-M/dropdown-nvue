<template>
  <view class="dropdown-menu dropdown-menu--top-bottom custom-class">
    <view
      v-for="(item,index) in itemListData"
      :key="index"
      :class="['dropdown-menu__item', item.disabled ? 'disabled' : '']"
      @tap.stop.prevent="onTitleTap(index)"
    >
      <view
        :class="[item.titleClass, 'dropdown-menu__title', item.showPopup ? 'active' : '', { down: item.showPopup === (direction === 'down') }]"
        :style="item.showPopup ? 'color:' + activeColor : ''"
      >
        <view class="ellipsis">{{ displayTitle(item) }}</view>
      </view>
    </view>

    <slot />
  </view>
</template>

<script>
let ARRAY = [];

function getRect(
  context,
  selector
) {
  return new Promise(
    (resolve) => {
      uni.createSelectorQuery()
        .in(context)
        .select(selector)
        .boundingClientRect()
        .exec((rect = []) => resolve(rect[0]));
    }
  );
}

export default {
  props: {
    activeColor: {
      type: String,
    },
    overlay: {
      type: Boolean,
      default: true,
    },
    zIndex: {
      type: Number,
      default: 10,
    },
    duration: {
      type: Number,
      default: 200,
    },
    direction: {
      type: String,
      default: 'down',
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true,
    },
    closeOnClickOutside: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      itemListData: []
    }
  },
  beforeCreate() {
    const { windowHeight } = uni.getSystemInfoSync();;
    this.windowHeight = windowHeight;
    ARRAY.push(this);
  },
  destroyed() {
    ARRAY = ARRAY.filter((item) => item !== this);
  },
  mounted() {
    this.updateItemListData()
  },
  methods: {
    updateItemListData() {
      console.log(this.$children);
      this.itemListData = this.$children[0].$children.map((child) => child)
    },

    updateChildrenData() {
      this.$children.forEach((child) => {
        child.updateDataFromParent();
      });
    },

    toggleItem(active) {
     this.$children[0].$children.forEach((item, index) => {
        const { showPopup } = item;
        if (index === active) {
          item.toggle();
        } else if (showPopup) {
          item.toggle(false, { immediate: true });
        }
      });
    },

    close() {
      this.$children.forEach((child) => {
        child.toggle(false, { immediate: true });
      });
    },

    getChildWrapperStyle() {
      const { zIndex, direction } = this;

      return getRect(this, '.dropdown-menu').then((rect) => {
        console.log(rect,'rect');
        const { top = 0, bottom = 0 } = rect;
        const offset = direction === 'down' ? bottom : this.windowHeight - top;

        let wrapperStyle = `z-index: ${zIndex};`;

        // if (direction === 'down') {
        //   wrapperStyle += `top: ${addUnit(offset)};`;
        // } else {
        //   wrapperStyle += `bottom: ${addUnit(offset)};`;
        // }

        return wrapperStyle;
      });
    },

    onTitleTap(index) {
    
      const child = this.$children[index];

      if (!child.disabled) {
        ARRAY.forEach((menuItem) => {
          if (
            menuItem &&
            menuItem.closeOnClickOutside &&
            menuItem !== this
          ) {
            menuItem.close();
          }
        });

        this.toggleItem(index);
      }
    },
    displayTitle(item) {
      if (item.title) {
        return item.title;
      }
      console.log(item.options,'ssss');
      var match = item.options.filter(function (option) {
        return option.value === item.value;
      });
      var displayTitle = match.length ? match[0].text : '';
      return displayTitle;
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdown-menu {
  width: 750rpx;
  display: flex;
  justify-content: space-around;
  position: relative;
}

</style>
