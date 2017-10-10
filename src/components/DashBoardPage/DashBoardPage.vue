<template>
  <div id="app">
    <v-header :seller="seller.data"></v-header>
    <div class="tab border-1px">
        <div class="tab-item"><router-link :to="{path:'goods'}"  tag="div" class="tab-item-i">商品</router-link></div>
        <div class="tab-item"><router-link :to="{path:'ratings'}" tag="div" class="tab-item-i">评价</router-link></div>
        <div class="tab-item"><router-link :to="{path:'seller'}" tag="div" class="tab-item-i">商家</router-link></div>
    </div>
    <router-view :seller="seller.data"></router-view>
  </div>
</template>

<script type="ecmascript-6">
import header from './header/header.vue';
export default {
  name: 'app',
  components: {
    'v-header':header
  },
  data(){
    return{
      goods:{},
      seller:{}
    }
  },
  cpmputed:{

  },
  created(){
    this.$http.get('/api/goods').then(response=>{
      this.goods=response.body;
      if(this.goods.code===0){
        // console.log(this.goods.data);
      }
    });
    this.$http.get('/api/seller').then(response=>{
      this.seller=response.body;
      if(this.seller.code===0){
        // console.log(this.seller.data);
      }
    });
  }
};
</script>

<style lang="scss" scoped>
// @import 'common/style/index.scss';
@import '../../common/style/maxin.scss';
#app .tab{
    display:flex;
    width:100%;
    height:40px;
    line-height:40px;
    @include border-1px(rgba(7,17,27,0.1));
    .tab-item{
      flex:1;
      text-align:center;
      .tab-item-i{
        font-size:14px;
        color:rgb(77,85,93);
        cursor:pointer;
      }
      .active{
          color:rgb(240,20,20);
      }
    }
}

</style>
