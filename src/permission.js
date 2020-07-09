import Vue from "vue";
import router from "./router";
// import store from "./store";

import NProgress from "nprogress"; // progress bar
import "@/components/NProgress/nprogress.less"; // progress bar custom style
// import notification from 'ant-design-vue/es/notification'
// import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN } from "@/store/mutation-types";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

// const whiteList = ['login', 'register', 'registerResult'] // no redirect whitelist
// const defaultRoutePath = '/dashboard/workplace'

// router.beforeEach((to, from, next) => {
//   NProgress.done().start()
//   let toName = to.name
//   // let fromName = from.name
//   let is_login = store.state.user_info.login

//   if (!is_login && toName !== 'login') {
//     next({
//       name: 'login'
//     })
//   } else {
//     if (is_login && toName === 'login') {
//       next({
//         path: '/'
//       })
//     } else {
//       next()
//     }
//   }
// })

router.beforeEach((to, from, next) => {
  // console.log(to);
  NProgress.start(); // start progress bar
  let toName = to.name;
  // if(!store.state.user.token && toName !== 'login') {
  //   console.log(to.path, 'totototototototo2');
  //   next({name: '/user'})
  // }else{
  //   next({ path: '/' })
  // }

  // let toName = to.name;

  // if (store.state.user.token) {
  //   /* has token */
  //   if (to.path === '/user/login') {
  //     next({ path: '/' })
  //     NProgress.done()

  //   }
  // } else {
  //   next({ path: '/user/login', query: { redirect: to.fullPath } })
  //   NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
  // }
  // console.log(store)
  // console.log(Vue.ls.get(ACCESS_TOKEN))
  
  if (!Vue.ls.get(ACCESS_TOKEN) && toName !== "login" && toName !== "register") {
    // console.log(1)
    next({
      name: "login"
    }); 
  } else {
    // console.log(2)
    if (Vue.ls.get(ACCESS_TOKEN) && toName === "login") {
      // console.log(3)
      next({
        path: "/"
      });
    } else {
      // console.log(4)
      next();
    }
  }
  NProgress.done();
});

router.afterEach(() => {
  NProgress.done(); // finish progress bar
});
