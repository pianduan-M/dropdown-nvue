<template>
	<view class="dropdown-menu">
		<view v-if="opened" class="dropdown-menu__mask" @tap.stop.prevent="onClickOutside"
			@touchmove.stop.prevent="noop"></view>

		<slot />

		<view class="dropdown-menu__bar" ref="bar">
			<view v-for="(item, index) in children" :key="index" class="dropdown-menu__item" @tap="toggleItem(index)"
				@touchmove.stop.prevent="noop">
				<view :style="item.showPopup ? 'color:' + activeColor : ''" class="dropdown-menu__title">
					<text class="ellipsis">
						{{ item.displayTitle }}
					</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export function getScrollTop(el) {
		const top = "scrollTop" in el ? el.scrollTop : el.pageYOffset;

		// iOS scroll bounce cause minus scrollTop
		return Math.max(top, 0);
	}

	export default {
		provide() {
			return {
				dropdownMenu: this,
			};
		},
		props: {
			zIndex: [Number, String],
			activeColor: String,
			overlay: {
				type: Boolean,
				default: true,
			},
			duration: {
				type: [Number, String],
				default: 0.2,
			},
			direction: {
				type: String,
				default: "down",
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
			};
		},

		computed: {
			scroller() {
				return "";
			},

			opened() {
				return this.children.some((item) => item.showWrapper);
			},

			barStyle() {
				if (this.opened && isDef(this.zIndex)) {
					return {
						zIndex: 1 + this.zIndex,
					};
				}
			},
		},
		methods: {
			async updateOffset() {
				if (!this.$refs.bar) {
					return;
				}
				const dom = uni.requireNativePlugin("dom");

				dom.getComponentRect(this.$refs.bar, (res) => {
					this.offset = res.size.bottom;
				});
				// this.offset = rect.bottom + systemInfo.windowTop;

				// if (this.direction === "down") {

				// } else {
				//   this.offset = window.innerHeight - rect.top;
				// }
			},

			toggleItem(active) {
				console.log(this.children);
				this.children.forEach((item, index) => {
					if (index === active) {
						item.toggle();
					} else if (item.showPopup) {
						debugger
						item.toggle(false, {
							immediate: true
						});
					}
				});
			},

			onClickOutside() {
				this.children.forEach((item) => {
					item.toggle(false);
				});
			},
			noop() {},
		},
	};
</script>

<style lang="scss" scoped>
	.dropdown-menu {
		width: 750rpx;

		&__mask {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
		}

		&__bar {
			position: relative;
			z-index: 1000;
			background-color: red;
			display: flex;
			justify-content: space-around;
			align-items: center;
			flex-direction: row;
		}

		&__item {
			flex: 1;
			text-align: center;
		}
	}
</style>
