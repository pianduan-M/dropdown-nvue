<template>
	<view class="dropdown">
		<view class="dropdown-item" v-if="showWrapper" :style="wrapperStyle">
			<view class="mask" @click.stop.prevent="close" :style="maskStyle">

			</view>
			<view class="popup">

				<view class="overlay" @click.stop.prevent="close"></view>
				<view class="popup-content">
					<view class="popup-list">
						<view class="item" v-for="(item,index) in options" v-if="shows[index]">
							<view class="dropdown-item__title" @click.stop.prevent="toggle(index,index2,option.value)"
								v-for="(option,index2) in item">
								<text :style="textColor(value[index]===option.value)">{{option.text}}</text>
							</view>

						</view>
					</view>



				</view>
			</view>
		</view>

		<view class="dropdown-menu">
			<view class="dropdown-menu__bar" ref="bar">
				<view class="dropdown-menu__title" v-for="(item,index) in value" @click.stop="toggleItem(index,$event)">
					<text :style="textColor(index===active)">{{displayTitle(index,item)}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			options: {
				type: Array,
				default () {
					return []
				}
			},
			value: {
				type: Array,
				default () {
					return []
				}
			},
			activeColor:{
				type:String,
				default:'red'
			}
		},
		data() {
			return {
			
				shows: [],
				
				showWrapper: false,
				offset: 0,
				barReact: {},
				active:''
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.updateOffset()
			})
		},
		created() {
			this.createShowArr()
		},
		methods: {
			textColor(bool) {
				if(bool) {
					return {
						color:this.activeColor
					}
				}
				return {}
			},
			createShowArr() {
				this.options.map(item => {
					this.shows.push(false)
				})
			},
			displayTitle(index,value) {
				const options = this.options[index]
				console.log(this.options);
				if(!options) return
				const option = options.find(item => item.value === value)
				if(option) {
					return option.text
				} else {
					return options[0]?options[0].text : ''
				}
			},
			toggleItem(active, event) {
				event.stopPropagation()

				this.updateOffset()
			
				this.shows.map((show, index) => {
					const shows = this.shows
					if (index === active) {
						shows.splice(index, 1, !show)
						if(!show) {
							this.active = active
						} else {
							this.active = ''
						}

					} else if (show) {
						shows.splice(index, 1, false)
					}
					this.shows = shows
				})

				this.showWrapper = this.shows.some(show => show)

			},
			toggle(active, listIndex, value) {

				this.value.map((item, index) => {
					if (active === index) {
						this.value.splice(index, 1, value)
						this.shows.splice(index, 1, false)
						this.$emit('input', this.value)
					}
				})

				this.close()
			},
			async updateOffset() {

				const dom = uni.requireNativePlugin("dom");

				dom.getComponentRect(this.$refs.bar, (res) => {
					this.barReact = res.size || {}
					this.offset = res.size.bottom;
				});
			},
			noop() {},
			close() {
				this.showWrapper = false
				this.active = ''
				const shows = []
				this.shows.map(item => {
					shows.push(false)
				})
				this.shows = shows
				this.$emit('close', this.value)
			}
		},
		computed: {
			wrapperStyle() {
				return {
					top: this.offset + "px",
				};
			},
			maskStyle() {
				console.log(this.barReact);
				return {
					height: this.barReact.top + "px"
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dropdown {
		position: relative;
		width: 750rpx;
		height: 50px;
	}

	.dropdown-item {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;

	}

	.dropdown-menu {
		position: absolute;
		left: 0;
		top: 0;
	}

	.dropdown-menu__bar {

		flex-direction: row;
		justify-content: space-around;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
	}


	.dropdown-item__title,
	.dropdown-menu__title {
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;
	}




	.popup,
	.overlay,
	.popup-content {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;


	}

	.popup-content {

		overflow: auto;
	}

	.popup-list {
		background-color: #fff;
	}

	.overlay {
		background-color: rgba(0, 0, 0, .7);
	}

	.mask {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
	}
</style>
