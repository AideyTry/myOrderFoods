<style lang="scss">
	.food{
		position:fixed;
		left:0;
		top:0;
		bottom:48px;
		z-index:30;
		width:100%;
		background:#fff;
	}
</style>

<template>
	<div v-show="showFlag" class="food">
		sdjfksjfdks
	</div>
</template>

<script type="ecmascript-6">
	export default{
		props:['food'],
		data(){
			return{
				showFlag:false
			}
		},
		computed:{

		},
		methods:{
			shows(){
				this.showFlag=true;
			}
		},
		mounted(){
			console.log(this.food);
		}
	}
</script>