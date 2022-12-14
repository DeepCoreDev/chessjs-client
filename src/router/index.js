import { createRouter, createWebHistory } from 'vue-router'
import store from "../store.js";

import Home from "../views/HomeView.vue";
import Callback from '../views/CallbackView.vue';
import PrivacyPolicy from '../views/PrivacyPolicy.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: "Home"
      }
    },
    {
      path: '/callback',
      component: Callback
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: PrivacyPolicy,
      meta: {
        title: "Privacy"
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: "About"
      }
    },
    {
      path: '/library',
      name: 'library',
      component: () => import("../views/LibraryView.vue"),
      meta: {
        title: "Library"
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        title: "Login"
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/LoginView.vue'),
      meta: {
        title: "Signup"
      }
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('../views/ForgotPasswordView.vue'),
      meta: {
        title: "Forgot Password"
      }
    },
    {
      path: '/pricing',
      name: 'pricing',
      component: () => import('../views/PricingView.vue'),
      meta: {
        title: "Pricing"
      }
    },
    {
      path: '/create',
      name: 'create',
      component: () => import("../views/CreateView.vue"),
      meta: {
        title: "Create"
      }
    },
    {
      path: '/play',
      name: 'play',
      component: () => import("../../app/BeginPlayView.vue"),
      meta: {
        title: "Play"
      }
    },
    {
      path: '/play/:play_id',
      component: () => import('../../app/PlayingView.vue'),
      meta: {
        title: "Playing"
      }
    },
    {
      path: '/user',
      name: 'user',
      redirect: to => {
        if (store.state.userData) {
          return { path: '/user/' + store.state.userData.username };
        } else {
          return { path: '/login' };
        }
      }
    },
    {
      path: '/variant/:variant_id',
      component: () => import('../views/VariantView.vue'),
      props: {
        preview: false
      },
      children: [
        {
          path: '',
          component: () => import('../../app/varianteditor/Home.vue')
        },
        {
          path: 'preview',
          component: () => import('../views/VariantView.vue'),
          props: {
            preview: true
          },
        },
        {
          path: 'inbox',
          component: () => import('../../app/varianteditor/Inbox.vue')
        },
        {
          path: 'reports',
          component: () => import('../../app/varianteditor/Reports.vue')
        },
        {
          path: 'analytics',
          component: () => import('../../app/varianteditor/Analytics.vue')
        },
        {
          path: 'settings',
          component: () => import('../../app/varianteditor/Settings.vue')
        },
        {
          path: 'engine',
          component: () => import('../../app/varianteditor/Engine.vue')
        },
        // Divider
        {
          path: 'code',
          component: () => import('../../app/varianteditor/Code.vue')
        },
        {
          path: 'docs',
          component: () => import('../../app/varianteditor/Docs.vue')
        },
        {
          path: 'help',
          component: () => import('../../app/varianteditor/Help.vue')
        },
        {
          path: 'danger',
          component: () => import('../../app/varianteditor/Danger.vue')
        },
      ]
    },
    {
      path: '/user/:username',
      beforeEnter(to, from, next){
        window.location.href = `//${store.state.deepcoreServer}${to.fullPath}`;
      }
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import("../views/NotFound.vue"),
      meta: {
        title: "Not Found"
      }
    },
  ]
});

router.afterEach((to, from) => {
  document.title = (to.meta.title || "Loading...") + " | ChessJS";
})

export default router
