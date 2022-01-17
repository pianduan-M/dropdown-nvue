<template>
	<view class="dropdown">
		<view class="dropdown-item" v-if="showWrapper" :style="wrapperStyle">
			<view class="mask" @click.stop.prevent="close">

			</view>
			<view class="popup" :style="wrapperStyle">
				<view class="overlay" @click.stop.prevent="close"></view>
				<view class="popup-content">
					<view class="item" v-for="(item,index) in options" v-if="shows[index]">
						<view class="dropdown-item__title" @click.stop.prevent="toggle(index,index2,option.value)"
							v-for="(option,index2) in item">
							<text>{{option.text}}</text>
						</view>

					</view>



				</view>
			</view>
		</view>

		<view class="dropdown-menu">
			<view class="dropdown-menu__bar" ref="bar">
				<view class="dropdown-menu__title" v-for="(item,index) in value"
					@click.stop.prevent="toggleItem(index)">
					<text>{{item}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				options: [
					[{
							text: "a",
							value: "a",
						},
						{
							text: "b",
							value: "b",
						},
						{
							text: "c",
							value: "c",
						},
						{
							text: "d",
							value: "d",
						},
					],
					[{
							text: "4e324",
							value: "4324",
						},
						{
							text: "23432",
							value: "2344b",
						},
						{
							text: "432",
							value: "32432",
						},
						{
							text: "d43242",
							value: "4324d",
						},
					]
				],
				shows: [false, false],
				value: ['adsa', 'dsadsa'],
				showWrapper: false,
				offset: 0
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.updateOffset()
			})
		},
		methods: {
			toggleItem(active) {
				this.updateOffset()
				console.log(this.shows);
				this.shows.map((show, index) => {
					const shows = this.shows
					if (index === active) {
						shows.splice(index, 1, !show)
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
					console.log(res);
					this.offset = res.size.bottom;
				});
			},
			noop() {},
			close() {
				this.showWrapper = false
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
					top: this.offset + "rpx",
				};
			},
		}
	}
</script>

<style lang="scss" scoped>
	.dropdown {
		position: relative;


	}

	.dropdown-item {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;

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
	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;


	}

	.popup-content {
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
