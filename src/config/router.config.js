// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
export const asyncRouterMap = [{
        path: '/',
        name: 'index',
        component: BasicLayout,
        meta: { title: '首页' },
        redirect: '/statistics/owner',
        children: [

            {
                path: '/statistics',
                name: 'statistics',
                component: RouteView,
                redirect: '/statistics/owner',
                meta: { title: '统计', icon: 'bar-chart' },
                children: [{
                        path: '/statistics/owner',
                        name: 'Owner',
                        component: () =>
                            import ('@/pages/statistics/owner'),
                        meta: { title: '业主分析' },
                    },
                    {
                        path: '/statistics/society',
                        name: 'Society',
                        component: () =>
                            import ('@/pages/statistics/society'),
                        meta: { title: '缴费分析' }
                    },
                    // {
                    //     path: '/statistics/repair',
                    //     name: 'Repair',
                    //     component: () =>
                    //         import ('@/pages/statistics/repair'),
                    //     meta: { title: '报修分析' }
                    // },
                    // {
                    //     path: '/statistics/serpersonal',
                    //     name: 'Serpersonal',
                    //     component: () =>
                    //         import ('@/pages/statistics/serpersonal'),
                    //     meta: { title: '门禁分析' }
                    // },

                ]
            },
            {
                path: '/manage',
                name: 'manage',
                component: PageView,
                redirect: '/manage/userManage/roprietor-list',
                meta: { title: '管理', icon: 'table' },
                children: [{
                        path: '/manage/userManage',
                        name: 'userManage',
                        component: BlankLayout,
                        redirect: '/manage/userManage/roprietor-list',
                        meta: { title: '用户管理' },
                        children: [{
                                path: '/manage/userManage/proprietor-list',
                                name: 'ProprietorList',
                                component: () =>
                                    import ('@/pages/manage/userManage/proprietor-list'),
                                meta: { title: '业主管理' }
                            },
                            {
                                path: '/manage/userManage/personnel-list',
                                name: 'PersonnelList',
                                component: () =>
                                    import ('@/pages/manage/userManage/personnel-list'),
                                meta: { title: '物业人员管理' }
                            },
                            {
                                path: '/manage/userManage/search',
                                name: 'SearchList',
                                component: () =>
                                    import ('@/pages/manage/userManage/society-list'),
                                meta: { title: '缴费管理' }
                            },
                        ]
                    },
                    {
                        path: '/manage/functionalManage',
                        name: 'functionalManage',
                        component: BlankLayout,
                        redirect: '/manage/functionalManage/roprietor-list',
                        meta: { title: '功能管理' },
                        children: [{
                                path: '/manage/functionalManage/banner-list',
                                name: 'BannerList',
                                component: () =>
                                    import ('@/pages/manage/functionalManage/banner-list'),
                                meta: { title: 'banner管理' }
                            },
                            {
                                path: '/manage/functionalManage/dynamic-list',
                                name: 'DynamicList',
                                component: () =>
                                    import ('@/pages/manage/functionalManage/dynamic-list'),
                                meta: { title: '动态管理' }
                            },
                            {
                                path: '/manage/functionalManage/repair-list',
                                name: 'RepairList',
                                component: () =>
                                    import ('@/pages/manage/functionalManage/repair-list'),
                                meta: { title: '报修管理' }
                            },
                            {
                                path: '/manage/functionalManage/hosting-list',
                                name: 'HostingList',
                                component: () =>
                                    import ('@/pages/manage/functionalManage/hosting-list'),
                                meta: { title: '托管管理' }
                            },
                            {
                                path: '/manage/functionalManage/running-list',
                                name: 'RunningList',
                                component: () =>
                                    import ('@/pages/manage/functionalManage/running-list'),
                                meta: { title: '跑腿管理' }
                            },
                            {
                                path: '/manage/functionalManage/opinion-list',
                                name: 'OpinionList',
                                component: () =>
                                    import ('@/pages/manage/functionalManage/opinion-list'),
                                meta: { title: '意见管理' }
                            },
                            {
                                path: '/manage/functionalManage/call-list',
                                name: 'CallList',
                                component: () =>
                                    import ('@/pages/manage/functionalManage/call-list'),
                                meta: { title: '一键呼叫记录' }
                            },
                            {
                                path: '/manage/functionalManage/housing-list',
                                name: 'HousingList',
                                component: () =>
                                    import ('@/pages/manage/functionalManage/housing-list'),
                                meta: { title: '房源管理' }
                            },
                        ]
                    },
                    {
                        path: '/manage/configManage/search/role-set',
                        name: 'RoleSet',
                        component: () =>
                            import ('@/pages/config/role-set'),
                        meta: { title: '平台设置' }
                    },
                    // {
                    //     path: '/manage/owner-list',
                    //     name: 'OwnerlList',
                    //     component: () =>
                    //         import ('@/pages/manage/owner-list'),
                    //     meta: { title: '业主审核' }
                    // },
                    // {
                    //     path: '/manage/serve-list',
                    //     name: 'ServeList',
                    //     component: () =>
                    //         import ('@/pages/manage/serve-list'),
                    //     meta: { title: '服务管理' }
                    // },
                    // {
                    //     path: '/manage/search',
                    //     name: 'SearchList',
                    //     component: () =>
                    //         import ('@/pages/manage/society-list'),
                    //     meta: { title: '缴费管理' }
                    // },
                    // {
                    //     path: '/manage/search',
                    //     name: 'SearchList',
                    //     component: () =>
                    //         import ('@/views/list/search/SearchLayout1'),
                    //     redirect: '/manage/search/society-list',
                    //     hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
                    //     meta: { title: '缴费管理', keepAlive: true, permission: ['table'] },
                    //     children: [{
                    //             path: '/manage/search/society-list',
                    //             name: 'SocietyList',
                    //             hidden: true,
                    //             component: () =>
                    //                 import ('@/pages/manage/society-list'),
                    //             meta: { title: '缴费列表' }
                    //         },
                    //         {
                    //             path: '/manage/search/call-list',
                    //             name: 'CallList',
                    //             hidden: true,
                    //             component: () =>
                    //                 import ('@/pages/manage/call-list'),
                    //             meta: { title: '缴费列表' }
                    //         }
                    //     ]
                    // },
                    // {
                    //     path: '/manage/activity-list',
                    //     name: 'ActivityList',
                    //     component: () =>
                    //         import ('@/pages/manage/activity-list'),
                    //     meta: { title: '活动管理' }
                    // },
                    // {
                    //     path: '/manage/dynamic-list',
                    //     name: 'DynamicList',
                    //     component: () =>
                    //         import ('@/pages/manage/dynamic-list'),
                    //     meta: { title: '动态管理' }
                    // },
                    // {
                    //     path: '/manage/leaving-list',
                    //     name: 'LeavingList',
                    //     component: () =>
                    //         import ('@/pages/manage/leaving-list'),
                    //     meta: { title: '留言管理' }
                    // },
                    // {
                    //     path: '/manage/renting-list',
                    //     name: 'RentingList',
                    //     component: () =>
                    //         import ('@/pages/manage/renting-list'),
                    //     meta: { title: '租房管理' }
                    // },

                ]
            },
            // {
            //     path: '/finance',
            //     name: 'finance',
            //     component: PageView,
            //     redirect: '/finance/pay-set',
            //     meta: { title: '财务', icon: 'strikethrough' },
            //     children: [{
            //             path: '/finance/pay-set',
            //             name: 'PaySet',
            //             component: () =>
            //                 import ('@/pages/finance/pay-set'),
            //             meta: { title: '支付设置' }
            //         },
            //         {
            //             path: '/finance/pay-list',
            //             name: 'PayList',
            //             component: () =>
            //                 import ('@/pages/finance/pay-list'),
            //             meta: { title: '支付列表' }
            //         },

            //     ]
            // },
            // {
            //     path: '/config',
            //     name: 'Config',
            //     component: PageView,
            //     redirect: '/config/info-set',

            //     meta: { title: '设置', icon: 'setting' },
            //     children: [{
            //             path: '/config/info-set',
            //             name: 'InfoSet',
            //             component: () =>
            //                 import ('@/pages/config/info-set'),
            //             meta: { title: '平台信息' }
            //         },
            //         {
            //             path: '/config/search/role-set',
            //             name: 'RoleSet',
            //             component: () =>
            //                 import ('@/pages/config/role-set'),
            //             meta: { title: '平台设置' }
            //         },
            //         // {  
            //         //     path: '/config/search/role-set',
            //         //     name: 'RoleSet',
            //         //     redirect: '/config/search/role-set',
            //         //     hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            //         //     component: () =>
            //         //         import ('@/views/list/search/SearchLayout2'),
            //         //     meta: { title: '平台设置' },
            //         //     children: [{
            //         //             path: '/config/search/role-set',
            //         //             name: 'SearchRoleSet',
            //         //             hidden: true,
            //         //             component: () =>
            //         //                 import ('@/pages/config/role-set'),
            //         //             meta: { title: '角色设置' }
            //         //         },
            //         //         {
            //         //             path: '/config/search/coordinate-set',
            //         //             name: 'CoordinateSet',
            //         //             hidden: true,
            //         //             component: () =>
            //         //                 import ('@/pages/config/coordinate-set'),
            //         //             meta: { title: '坐标设置' }
            //         //         },
            //         //         {
            //         //             path: '/config/search/door-set',
            //         //             name: 'DoorSet',
            //         //             hidden: true,
            //         //             component: () =>
            //         //                 import ('@/pages/config/door-set'),
            //         //             meta: { title: '门锁设置' }
            //         //         },
            //         //         {
            //         //             path: '/config/search/community-set',
            //         //             name: 'CommunitySet',
            //         //             hidden: true,
            //         //             component: () =>
            //         //                 import ('@/pages/config/community-set'),
            //         //             meta: { title: '社区切换' }
            //         //         },

            //         //         // {
            //         //         //   path: '/config/search/integral-set',
            //         //         //   name: 'IntegralSet',
            //         //         //   hidden: true,
            //         //         //   component: () => import('@/pages/config/integral-set'),
            //         //         //   meta: { title: '积分设置'}
            //         //         // },
            //         //     ]
            //         // },
            //         {
            //             path: '/config/apply-set',
            //             name: 'ApplySet',
            //             component: () =>
            //                 import ('@/pages/config/apply-set'),
            //             meta: { title: '申请管理' }
            //         },
            //         {
            //             path: '/config/introduce-set',
            //             name: 'IntroduceSet',
            //             component: () =>
            //                 import ('@/pages/config/introduce-set'),
            //             meta: { title: '物业介绍' }
            //         },
            //         {
            //             path: '/config/committee-set',
            //             name: 'CommitteeSet',
            //             component: () =>
            //                 import ('@/pages/config/committee-set'),
            //             meta: { title: '业主委员会' }
            //         },


            //     ]
            // },
            // Exception
            {
                path: '/exception',
                name: 'exception',
                hidden: true,
                component: RouteView,
                redirect: '/exception/403',
                meta: { title: '异常页', icon: 'warning', permission: ['exception'] },
                children: [{
                        path: '/exception/403',
                        name: 'Exception403',
                        component: () =>
                            import ( /* webpackChunkName: "fail" */ '@/pages/exception/403'),
                        meta: { title: '403', permission: ['exception'] }
                    },
                    {
                        path: '/exception/404',
                        name: 'Exception404',
                        component: () =>
                            import ( /* webpackChunkName: "fail" */ '@/pages/exception/404'),
                        meta: { title: '404', permission: ['exception'] }
                    },
                    {
                        path: '/exception/500',
                        name: 'Exception500',
                        component: () =>
                            import ( /* webpackChunkName: "fail" */ '@/pages/exception/500'),
                        meta: { title: '500', permission: ['exception'] }
                    }
                ]
            },

            // account
        ]
    },
    {
        path: '*',
        redirect: '/404',
        hidden: true
    }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [{
        path: '/user',
        component: UserLayout,
        redirect: '/user/login',
        hidden: true,
        children: [{
                path: 'login',
                name: 'login',
                component: () =>
                    import ( /* webpackChunkName: "user" */ '@/pages/account/Login')
            },
            {
                path: 'register',
                name: 'register',
                component: () =>
                    import ( /* webpackChunkName: "user" */ '@/pages/account/Register')
            },
        ]
    },

    {
        path: '/404',
        component: () =>
            import ( /* webpackChunkName: "fail" */ '@/pages/exception/404')
    }

]