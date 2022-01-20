<!--
Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
-->
<!-- Created by Tw93 on 16/10/25. -->
<!--A popup box with customized contents.-->

<template>
  <view :class="[wrapperClass]" class="wrapper" v-if="show">
    <wxc-overlay
      :show="show"
      ref="overlay"
      v-bind="overlayCfg"
      :duration="duration"
      @overlayBodyClicking="overlayBodyClicking"
      :customStyle="overlayStyle"
    ></wxc-overlay>
    <view
      ref="popup"
      v-if="show"
      :height="_height"
      :hack="isNeedShow"
      @touchstart="noop"
      @touchmove="noop"
      @touchend="noop"
      :class="['popup', pos]"
      :style="[padStyle, customStyle]"
    >
      <slot></slot>
    </view>
  </view>
</template>

<style scoped>
.popup {
  position: fixed;
  width: 750px;
  background-color: pink;
 
}

.wrapper {
  box-sizing: border-box;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
}

.top {
  left: 0;
  right: 0;
}

.bottom {
  left: 0;
  right: 0;
}

.left {
  bottom: 0;
  top: 0;
}

.right {
  bottom: 0;
  top: 0;
}
</style>

<script>
const animation = weex.requireModule("animation");
import WxcOverlay from "../overlay/index.vue";
import { noop } from "../utils";

export default {
  components: {
    WxcOverlay,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    pos: {
      type: String,
      default: "bottom",
    },
    popupColor: {
      type: String,
      default: "#FFFFFF",
    },
    overlayCfg: {
      type: Object,
      default: () => ({
        hasAnimation: true,
        timingFunction: ["ease-in", "ease-out"],
        opacity: 0.6,
      }),
    },
    duration: {
      type: [Number, String],
      default: 300,
    },
    height: {
      type: [Number, String],
      default: 840,
    },
    standOut: {
      type: [Number, String],
      default: 0,
    },
    width: {
      type: [Number, String],
      default: 750,
    },
    animation: {
      type: Object,
      default: () => ({
        timingFunction: "ease-in",
      }),
    },
    top: {
      type: [Number, String],
      default: 0,
    },
    overlayStyle: {
      type: Object,
      default() {
        return {};
      },
    },
    customStyle: {
      type: Object,
      default() {
        return null;
      },
    },
    wrapperClass: {
      type: String,
    },
    customAnimateStyles: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data: () => ({
    haveOverlay: true,
    isOverShow: true,
    showPopup: false,
  }),
  computed: {
    isNeedShow() {
      setTimeout(() => {
        this.appearPopup(this.show);
      }, 50);
         console.log(this.show,'show');
      return this.show;
    },
    _height() {
      this.appearPopup(this.show, 150);
      return this.height;
    },
    padStyle() {
      const { pos, width, height, popupColor, standOut, top, customStyle } = this;

      if (customStyle) {
        return {};
      }

      const stand = parseInt(standOut, 10);
      let style = {
        width: `${width}px`,
        backgroundColor: popupColor,
      };
      pos === "top" &&
        (style = {
          ...style,
          top: `${-height + stand }px`,
          height: `${height}px`,
        });
      pos === "bottom" &&
        (style = {
          ...style,
          bottom: `${-height + stand}px`,
          height: `${height}px`,
        });
      pos === "left" &&
        (style = {
          ...style,
          left: `${-width + stand}px`,
        });
      pos === "right" &&
        (style = {
          ...style,
          right: `${-width + stand}px`,
        });
      return style;
    },
  },
  beforeCreate() {
    this.noop = noop;
  },
  mounted() {},
  methods: {
    handleTouchEnd(e) {
      // 在支付宝上面有点击穿透问题
      const { platform } = weex.config.env;
      platform === "Web" && e.preventDefault && e.preventDefault();
    },
    hide() {
      this.appearPopup(false);
      this.$refs.overlay.appearOverlay(false);
    },
    overlayBodyClicking() {
      this.isShow && this.appearPopup(false);
    },
    appearPopup(bool) {
      const duration = this.duration || 300
      this.isShow = bool;
      const popupEl = this.$refs["popup"];
      if (!popupEl) {
        return;
      }
    
      let styles = {};
      // 自定义动画
      if (this.customAnimateStyles) {
        if (bool) {
          styles = this.customAnimateStyles.enter;
        } else {
          styles = this.customAnimateStyles.leave;
        }
      } else {
        styles = {
          transform: this.getTransform(this.pos, this.width, this.height, !bool),
        };
      }

      animation.transition(
        popupEl,
        {
          styles,
          duration,
          delay: 0,
          ...this.animation,
        },
        () => {
          if (!bool) {
            console.log('popupOverlayClickedpopupOverlayClicked');
            this.$emit("popupOverlayClicked", {
              pos: this.pos,
            });
            this.showPopup = false;
          } else {
            this.$emit("opend");
          }
        }
      );
    },
    getTransform(pos, width, height, bool) {
      let _size = pos === "top" || pos === "bottom" ? height : width;
      bool && (_size = 0);
      let _transform;
      switch (pos) {
        case "top":
          _transform = `translateY(${_size}px)`;
          break;
        case "bottom":
          _transform = `translateY(-${_size}px)`;
          break;
        case "left":
          _transform = `translateX(${_size}px)`;
          break;
        case "right":
          _transform = `translateX(-${_size}px)`;
          break;
      }
      return _transform;
    },
  },
};
</script>
