import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRoutes = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
]
export const asyncRoutes = [
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  // {
  //   path: '/person',
  //   component: Layout,
  //   redirect: '/person/list',
  //   name: '人员管理',
  //   meta: { title: '人员管理', icon: 'example',roles: ['4'] },
  //   children: [
  //     {
  //       path: 'list',
  //       name: '人员管理',
  //       component: () => import('@/views/person/list'),
  //       meta: { title: '人员管理', icon: 'table' }
  //     }
  //     ,
  //     {
  //       path: 'update/:id',
  //       name: '人员编辑',
  //       component: () => import('@/views/person/update'),
  //       meta: { title: ' 人员修改',  icon: 'table'  },
  //       hidden: true
  //     }, 
  //   ]
  // },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/userlist',
    name: '小程序后台管理',
    meta: { title: '小程序后台管理', icon: 'example'},
    alwaysShow: true,
    children: [
      {
        path: 'user/userlist',
        name: '用户列表',
        component: () =>import('@/views/user/userlist'),
        meta: { title: '用户列表', icon: 'table'}
      }  
      ,
      {
        path: 'user/order',
        name: '订单列表',
        component: () => import('@/views/user/order'),
        meta: { title: ' 订单列表',  icon: 'table'  },
      }, 
      {
        path: 'user/appointinfo',
        name: '预约列表',
        component: () => import('@/views/user/appointinfo'),
        meta: { title: ' 预约列表',  icon: 'table'  },
      }, 
      {
        path: 'user/policyinfo',
        name: '防疫政策列表',
        component: () => import('@/views/user/policyinfo'),
        meta: { title: ' 防疫政策列表',  icon: 'table'  },
      }, 
      {
        path: 'user/shopOrderList',
        name: '电商订单列表',
        component: () => import('@/views/user/shopOrderList'),
        meta: { title: ' 电商订单列表',  icon: 'table'  },
      },
      {
        path: 'user/shoppingList',
        name: '电商商品编辑',
        component: () => import('@/views/user/shoppingList'),
        meta: { title: ' 电商商品编辑',  icon: 'table'  },
      },
      {
        path: 'user/couponpList',
        name: '电商优惠券',
        component: () => import('@/views/user/couponpList'),
        meta: { title: ' 电商优惠券',  icon: 'table'  },
      },
      {
        path: 'user/bannerList',
        name: 'banner设置',
        component: () => import('@/views/user/bannerList'),
        meta: { title: ' banner设置',  icon: 'table'  },
      }, 
    ]
  },
  // {
  //   path: '/point',
  //   component: Layout,
  //   redirect: '/point/point',
  //   name: '采样点设置管理',
  //   meta: { title: '采样点设置管理', icon: 'example',roles: ['2'] },
  //   children: [
  //     {
  //       path: 'updatepoint/:id',
  //       name: '修改采样点',
  //       component: () => import('@/views/point/updatepoint'),
  //       hidden: true,
  //       meta: { title: '修改采样点', icon: 'table'  }
  //     },
  //     {
  //       path: 'point',
  //       name: '采样点列表',
  //       component: () => import('@/views/point/point'),
  //       meta: { title: '采样点列表', icon: 'table' ,roles: ['2'] }
  //     },    
  //     {
  //       path: 'scheduling',
  //       name: '班次列表',
  //       component: () => import('@/views/point/scheduling'),
  //       meta: { title: '班次列表', icon: 'table',roles: ['10']  }
  //     } 
  //     ,     
  //     {
  //       path: 'updatesch',
  //       name: '人员编辑',
  //       component: () => import('@/views/point/updatesch'),
  //       meta: { title: ' 班次修改', icon: 'table' },
  //       hidden: true
  //     },   
  //     {
  //       path: 'paiban/:channelId',
  //       name: '人员排班',
  //       component: () => import('@/views/point/paiban'),
  //       meta: { title: ' 采样点排班', icon: 'table' ,roles: ['10'] },
  //       // hidden: true
  //     }, 
  //   ]
  // },

  {
    path: 'external-link',
    component: Layout,
    hidden:true,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },



   { path: '*', redirect: '/404', hidden: true }
]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router


// export default new Router({
//   // mode: 'history', //后端支持可开
//   scrollBehavior: () => ({ y: 0 }),
//   routes: constantRouterMap
// })
