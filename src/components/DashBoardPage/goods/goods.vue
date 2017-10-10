<style lang="scss">
	@import '../../../common/style/maxin.scss';
	.goods{
		display:flex;
		position:absolute;
		top:174px;
		bottom:46px;
		width:100%;
		overflow:hidden;
		.menu-wrapper{
			flex:0 0 80px;   //第一个是等分，第二个是内容缩放情况，第三个是占位的空间。
			width:80px;
			background-color:#f3f5f7;
			.menu-item{
				display:table;
				height:54px;
				width:56px;
				line-height:14px;
				padding:0 12px;
				&.current{
					position:relative;
					z-index:10;
					margin-top:-1px;
					background:#fff;
					font-weight:700;
					.text{
						@include border-none();
					}
				}
				.text{
					display:table-cell;
					text-align:center;
					vertical-align:middle;
					width:56px;
					font-size:12px;
		    		@include border-1px(rgba(7,17,27,0.1));
					.icon{
					display:inline-block;
					vertical-align:middle;
					width:12px;
					height:12px;
					margin-right:2px;
					background-size:12px 12px;
					background-repeat:no-repeat;
					&.decrease{
						@include bg-image('decrease_3');
					}
					&.discount{
						@include bg-image('discount_3');
					}
					&.guarantee{
						@include bg-image('guarantee_3');
					}
					&.invoice{
						@include bg-image('invoice_3');
					}
					&.special{
						@include bg-image('special_3');
					}
				}
				}
			}
		}
		.foods-wrapper{
			flex:1;
			.title{
				padding-left:14px;
				height:26px;
				line-height:26px;
				border-left:2px solid #d9dde1;
				font-size:12px;
				color:rgb(147,153,159);
				background:#f3f5f7;
			}
			.food-item{
				display:flex;
				margin:18px;
				padding-bottom:18px;
				@include border-1px(rgba(7,17,27,0.1));
				&:last-child{
					@include border-none();
					margin-bottom:0;
				}
				.icon{
					flex:0 0 57px;
					margin-right:10px;
				}
				.content{
					flex:1;
					.name{
						margin:2px 0 8px 0;
						height:14px;
						line-height:14px;
						font-size:14px;
						color:rgb(7,17,27);
					}
					.desc{
						margin-bottom:8px;
						line-height:10px;
						font-size:10px;
						color:rgb(147,153,159);
					}
					.extra{
						line-height:10px;
						font-size:10px;
						color:rgb(147,153,159);
						&.conunt{
							margin-right:12px;
						}
					}
					.price{
						font-weight:700;
						line-height:24px;
						.now{
							margin-right:8px;
							font-size:14px;
							color:rgb(240,20,20);
						}
						.old{
							text-decoration:line-through;//删除线
							font-size:10px;
							color:rgb(147,153,159);
						}
					}
					.cartControl-wrapper{
						position:absolute;
						right:0;
						bottom:12px;
					}
				}
			}
		}
	}
</style>
<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li v-for="(item,index) in goods" :key="item.type" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
					<span class="text border-1px">
						<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
						{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="foodsWrapper">
			<ul>
				<li v-for="item in goods" class="food-list food-list-hook">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li v-for="food in item.foods" @click.stop.prevent="selectFood(food,$event)" class="food-item border-1px">
							<div class="icon">
								<img width="57" height="57" :src="food.icon" alt="">
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span class="count">月售{{food.sellCount}}份</span>
									<span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="now">¥{{food.price}}</span>
									<span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
								</div>
								<div class="cartControl-wrapper">
									<cartControl :food="food"></cartControl>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<shopCart v-if="seller" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectFoods="selectFoods"></shopCart>
		<food :food="selectedFood" ref="food"></food>
	</div>
</template>

<script type="ecmascript-6">
	import BScroll from 'better-scroll';
	import shopCart from '../shopCart/shopCart.vue';
	import cartControl from '../cartControl/cartControl.vue';
	import food from '../food/food.vue';
	const CODE_OK=0;
	export default{
		components:{
			shopCart,
			cartControl,
			food
		},
		props:["seller"],
		data(){
			return{
				goods:[],
				classMap:['decrease','discount','guarantee','invoice','special'],
				listHeight:[],
				scrollY:0,
				selectedFood:{}
				// selectFoods:[
				// 	{
				// 		price:10,
				// 		count:1
				// 	},
				// ]
			};
		},
		computed:{
			//遍历currentIndex到时候做映射
			currentIndex(){
				for(let i=0;i<this.listHeight.length;i++){
					let height1=this.listHeight[i];
					let height2=this.listHeight[i+1];
					if((!height2)||(this.scrollY>=height1&&this.scrollY<height2)){
						return i;
					}
				}
				return 0;
			},
			selectFoods(){
				let foods=[];
				this.goods.forEach((good)=>{
					good.foods.forEach((food)=>{
						if(food.count){
							foods.push(food);
						}
					})
				});
				return foods;
			}
		},
		methods:{
			_initScroll(){
				this.menuScroll=new BScroll(this.$refs.menuWrapper,{
					click:true
				});
				this.foodsScroll=new BScroll(this.$refs.foodsWrapper,{
					click:true,
					probeType:3//能够实时的告诉我们滚动的位置
				});
				this.foodsScroll.on('scroll',(pos)=>{
					this.scrollY=Math.abs(Math.round(pos.y));
				})
			},
			_calculateHeight(){
				let foodList=this.$refs.foodsWrapper.querySelectorAll(".food-list-hook");
				let height=0;
				this.listHeight.push(height);
				for(let i=0;i<foodList.length;i++){
					let item=foodList[i];
					height+=item.clientHeight;
					this.listHeight.push(height);
				}
			},
			selectMenu(index,event){
				if(!event._constructed){
					return;
				}
				let foodList=this.$refs.foodsWrapper.querySelectorAll(".food-list-hook");
				this.foodsScroll.scrollToElement(foodList[index],300);
			},
			selectFood(food,event){
				if(!event._constructed){
					return;
				}
				console.log("this.$refs=",this.$refs);
				this.$refs.food.shows();

			}
		},
		beforeCreate(){
			this.$http.get('/api/goods').then(response=>{
				response=response.body;
				if(response.code===CODE_OK){
					this.goods=response.data;
					let vm=this;
					this.$nextTick(function(){
						vm._initScroll();
						vm._calculateHeight();
					})
				}
			})
		},
		mounted(){

		},
		updated(){
			// this._initScroll();
		}
	}

</script>
