<style lang="scss">
	body{
		.login{
			position:fixed;
			display:table-cell;
			text-align:center;
			vertical-align:middle;
			top:40%;
			width:100%;
			height:100%;
			// margin:0 auto;
			.login-wrapper{
				display:inline-block;
				vertical-align:middle;
				.userName{
					display:flex;
					padding-bottom:5%;
					span{
						flex:0 0 40%;
						width:40%;
					}
					input{
						border:1px solid #ccc;
					}
				}
				.passWord{
					display:flex;
					padding-bottom:5%;
					span{
						flex:0 0 40%;
						width:40%;
					}
					input{
						border:1px solid #ccc;
					}
				}
				.submit{
					display:flex;
					justify-content:center;
					position:relative;
					left:10%;
					background:rgba(0,255,160,0.8);
					cursor:pointer;
					input{
						display:inline-block;
						background:rgba(0,255,160,0.8);
						cursor:pointer;
					}
				}
			}
		}
	}
</style>
<template>
	<div class="login">
		<div class="login-wrapper">
			<form class="form" id="loginForm">
				<div class="userName">
					<span>用户名：</span><input type="text" v-model="userName">
				</div>
				<div class="passWord">
					<span>密&nbsp&nbsp&nbsp&nbsp码：</span><input type="text" v-model="passWord">
				</div>
				<div class="submit" @click="submit">
					<input type="button" value="登录">
				</div>
			</form>
		</div>
	</div>
</template>

<script type="ecmascript-6">
	export default{
		props:["seller"],
		data(){
			return{
				userName:'',
				passWord:'',
				userInfo:null
			}
		},
		methods:{
			submit() {
				var data={
					userName:this.userName,
					passWord:this.passWord
				};
				this.axios.post('/api/login', data).then(response=>{
					console.log(1111);
					this.userInfo=response.body;
					 console.log(this.userInfo);
					if(this.userInfo.code===0){
						this.$router.push({path:'/'});
					}
				})
			}
		},
		mounted(){
		}
	}

</script>