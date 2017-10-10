// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
// import vueResource from 'vue-resource';
import axios from 'axios';
import App from './App.vue';
import router from './router.js';
Vue.config.productionTip = false;

import './common/style/index.scss';
// require("./common/style/index.scss");

Vue.use(axios);
// Vue.http.options.emulateJSON = true

/* eslint-disable no-new */
const vm=new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});

router.say=function(){
	console.log("hahahaha");
}

router.say();
router.beforeEach((to,from,next)=>{
	console.log(111)
	if(to.matched.some(r=>r.meta.requiresAuth)){
		console.log(222);
		vm.$http.get('/api/admin').then((response)=>{
			if(response.body.code==="1"){
				next({
					path:'/login',
					query: { redirect: to.fullPath }
				})
			}else{
				next();
			}
		})
	}else{
		next();
	}
})

console.log(1234);
