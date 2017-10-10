<template>
	<div>i am ratings</div>
</template>

<script type="ecmascript-6">
	export default{
		props:["seller"],
		data(){
			return{

			}
		},
		mounted(){
			console.log(document.cookie);
			document.cookie="name='建国'";
			document.cookie="age=30"
		}
	}

</script>

<style>
	
</style>