<template>
	<view class="content ">
	 <dorpdown-menu>
	 
	 		<dorpdown-item :options="options" :value="value" ></dorpdown-item>
	 		<dorpdown-item :options="options" :value="value" ></dorpdown-item>
	 </dorpdown-menu>
	</view>
</template>

<script>
	import overlay from '../../components/overlay'
	import popup from '../../components/popup'
	import DorpdownItem from '../../components/dorpdown-item'
	import DorpdownMenu from '../../components/dropdown-menu'


	export default {
		components:{popup,DorpdownMenu,DorpdownItem},
		data() {
			return {
				title: 'Hello',
				show:false,
				options:[
					{
						text:'a',
						value:'a'
					},
					{
						text:'b',
						value:'b'
					},
					{
						text:'c',
						value:'c'
					},
					{
						text:'d',
						value:'d'
					},
				],
				value:'a'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 500px;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
