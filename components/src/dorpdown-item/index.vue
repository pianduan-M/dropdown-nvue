<template>
  <view
    v-if="showWrapper"
    :class="['dropdown-item', showPopup ? '' : 'dropdown-item__close ']"
    :style="wrapperStyle"
  >
    <popup
      :show="showPopup"
      :custom-style="'position: absolute;'"
      overlay-style="position: absolute;"
      pos="top"
    >
      <view
        class="cell dropdown-item__option"
        v-for="item in options"
        :key="item.value"
        :class="[item.value === value ? 'active' : '']"
        @click.stop.prevent="onOptionTap(item)"
      >
        <text
          class="dropdown-item__title"
          :style="[item.value === value ? 'color:' + parent.activeColor : '']"
          >{{ item.text }}</text
        >
        <!-- <text
          class="dropdown-item__icon"
          v-if="item.value === value"
          :style="['color:' + parent.activeColor]"
        /> -->
      </view>

      <slot />
    </popup>
  </view>
</template>

<script>
import popup from "../../popup";

import { sortChildren } from "../utils/vnodes";

export default {
  inject: {
    dropdownMenu: {
      default: null,
    },
  },

  components: { popup },
  props: {
    value: null,
    title: String,
    disabled: Boolean,
    titleClass: String,
    options: {
      type: Array,
      default: () => [],
    },
    lazyRender: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      transition: true,
      showPopup: false,
      showWrapper: false,
    };
  },

  computed: {
    parent() {
      if (this.disableBindRelation) {
        return null;
      }

      return this.dropdownMenu;
    },
    wrapperStyle() {
      const { zIndex, offset } = this.parent;
      console.log(offset, "offset");
      return {
        zIndex: zIndex,
        top: offset + "px",
      };
    },

    displayTitle() {
      if (this.title) {
        return this.title;
      }

      const match = this.options.filter(
        (option) => option.value === this.value
      );
      return match.length ? match[0].text : "";
    },
  },

  mounted() {
    this.bindRelation();
  },

  beforeDestroy() {
    if (this.parent) {
      this.parent.children = this.parent.children.filter(
        (item) => item !== this
      );
    }
  },

  watch: {
    showPopup(val) {
      // this.bindScroll(val);
    },
  },

  beforeCreate() {
    const createEmitter = (eventName) => () => this.$emit(eventName);
    this.onOpen = createEmitter("open");
    this.onClose = createEmitter("close");
    this.onOpened = createEmitter("opened");
  },

  methods: {
    onOptionTap(option) {
      console.log(option, "option");
      this.showPopup = false;
      if (option.value !== this.value) {
        this.$emit("input", option.value);
        this.$emit("change", option.value);
      }
    },

    bindRelation() {
      if (!this.parent || this.parent.children.indexOf(this) !== -1) {
        return;
      }

      const children = [...this.parent.children, this];

      sortChildren(children, this.parent);

      this.parent.children = children;
    },

    // @exposed-api
    toggle(show = !this.showPopup, options = {}) {
      console.log(show, "show");

      if (show === this.showPopup) {
        return;
      }

      this.transition = !options.immediate;
      this.showPopup = show;

      if (show) {
        this.parent.updateOffset();
        this.showWrapper = true;
      }
    },

    bindScroll(bind) {
      const { scroller } = this.parent;
      const action = bind ? on : off;
      action(scroller, "scroll", this.onScroll, true);
    },

    onScroll() {
      this.parent.updateOffset();
    },

    onClickWrapper(event) {
      // prevent being identified as clicking outside and closed when use get-contaienr
      if (this.getContainer) {
        event.stopPropagation();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.dropdown-item {
  overflow: hidden;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
  background-color: pink;

  &.dropdown-item__close {
    height: 0;
  }
}

.dropdown-item__option {
  width: 750rpx;
  padding: 20rpx;
  background-color: #fff;
}
</style>
