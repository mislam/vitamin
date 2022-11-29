import { Router, createRouter, createWebHistory } from 'vue-router'
import ErrorPage from './router.error.vue'

const routes = [{ path: '/:pathMatch(.*)', component: ErrorPage }]

const views = import.meta.globEager('../app/**/*.vue')
Object.entries(views).forEach(([viewPath, viewModule]: any) => {
  // get all vue files from `/app` directory
  let routePath = viewPath.replace(new RegExp('^../app'), '').replace(new RegExp('.\\w+$'), '')

  // skip all non-page files
  if (!new RegExp('/page$').test(routePath)) return

  routePath = routePath
    .replace(new RegExp('/\\((\\w+)\\)', 'g'), '') // ignore all (label)
    .replace(new RegExp('\\[(\\w+)\\]', 'g'), ':$1') // all [slug] -> :slug
    .replace(new RegExp('/page$'), '') // only take the path without trailing /page

  // bind the route path with the vue component (page.vue)
  routes.push({
    path: routePath,
    component: viewModule.default,
  })
})

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
