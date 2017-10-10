import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios'
import Login from './components/fullPage/login/login.vue';
import DashBoardPage from './components/DashBoardPage/DashBoardPage.vue';
import Goods from './components/DashBoardPage/goods/goods.vue';
import Seller from './components/DashBoardPage/seller/seller.vue';
import Ratings from './components/DashBoardPage/ratings/ratings.vue';
Vue.use(VueRouter);
const router = new VueRouter({
	mode:'history',
	linkActiveClass:'active',
	routes:[
		{
			path:'/login',
			name:'eleme-login',
			component:Login
		},
		{
			path:'/',
			meta: { requiresAuth: true },
			component:DashBoardPage,
			redirect:{name:'eleme-goods'},
			children:[
				{
					path:'goods',
					name:'eleme-goods',
					meta: { requiresAuth: true },
					component:Goods
				},
				{
					path:'seller',
					name:'eleme-seller',
					meta: { requiresAuth: true },
					component:Seller
				},
				{
					path:'ratings',
					name:'eleme-ratings',
					meta: { requiresAuth: true },
					component:Ratings
				}
			]
		}

	]

});

export default router;