import { createRouter, createWebHistory } from 'vue-router'
import {
  getStoredToken,
  getCachedAuthProvider,
  storeToken,
  storeRefreshToken,
  setAuthToken,
} from '../api/auth'

import HomePage from '../pages/HomePage.vue'
import ChatPage from '../pages/ChatPage.vue'
import SkillsPage from '../pages/SkillsPage.vue'
import SkillDetailPage from '../pages/SkillDetailPage.vue'
import ToolsPage from '../pages/ToolsPage.vue'
import ToolDetailPage from '../pages/ToolDetailPage.vue'
import ScienceToolDetail from '../pages/ScienceToolDetail.vue'
import TasksPage from '../pages/TasksPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import MainLayout from '../pages/MainLayout.vue'
import SharePage from '../pages/SharePage.vue'
import ShareLayout from '../pages/ShareLayout.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/chat',
      component: MainLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          component: HomePage,
          alias: ['/', '/home'],
          meta: { requiresAuth: true },
        },
        {
          path: ':sessionId',
          component: ChatPage,
          meta: { requiresAuth: true },
        },
        {
          path: 'skills',
          component: SkillsPage,
          meta: { requiresAuth: true },
        },
        {
          path: 'skills/:skillName',
          component: SkillDetailPage,
          meta: { requiresAuth: true },
        },
        {
          path: 'tools',
          component: ToolsPage,
          meta: { requiresAuth: true },
        },
        {
          path: 'tools/:toolName',
          component: ToolDetailPage,
          meta: { requiresAuth: true },
        },
        {
          path: 'science-tools/:toolName',
          component: ScienceToolDetail,
          meta: { requiresAuth: true },
        },
        {
          path: 'tasks',
          component: TasksPage,
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: '/share',
      component: ShareLayout,
      children: [
        {
          path: ':sessionId',
          component: SharePage,
        },
      ],
    },
    {
      path: '/login',
      component: LoginPage,
    },
  ],
})

router.beforeEach(async (to, _, next) => {
  const accessTokenFromQuery = typeof to.query.access_token === 'string' ? to.query.access_token : ''
  const refreshTokenFromQuery = typeof to.query.refresh_token === 'string' ? to.query.refresh_token : ''

  if (accessTokenFromQuery && refreshTokenFromQuery) {
    storeToken(accessTokenFromQuery)
    storeRefreshToken(refreshTokenFromQuery)
    setAuthToken(accessTokenFromQuery)

    const cleanedQuery = { ...to.query }
    delete (cleanedQuery as any).access_token
    delete (cleanedQuery as any).refresh_token

    next({
      path: to.path,
      query: cleanedQuery,
      hash: to.hash,
      replace: true,
    })
    return
  }

  const requiresAuth = to.matched.some((record: any) => record.meta?.requiresAuth)
  const hasToken = !!getStoredToken()

  if (requiresAuth) {
    const authProvider = await getCachedAuthProvider()

    if (authProvider === 'none') {
      next()
      return
    }

    if (!hasToken) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      })
      return
    }
  }

  if (to.path === '/login' && hasToken) {
    next('/')
  } else {
    next()
  }
})

export default router
