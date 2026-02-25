import { opts as PageTest } from './test.vue'
registerLazyVuePage(PageTest, () => import('./test.vue'));

function registerLazyVuePage(opts, loader)
{
	console.log(opts)
	loader();
}
