import { createWebHistory, createRouter } from 'vue-router'

import Home from '@/views/Home';

const history = createWebHistory();

const router = createRouter({
	history,
	routes: [
		{
			path: '/',
			component: Home
		}
	]
});

export default router;