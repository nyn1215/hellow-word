import Vue from "vue";
import axios from "axios"; //导入axios
import router from '@/router';
import store from "@/store";
// import qs from "qs";
import { ACCESS_TOKEN, USER_INFO } from '@/store/mutation-types'
// import router from "@/router";
// import store from "@store";
import { DEV_HOST } from "./config";

const instance = axios.create({
  // 设置默认根地址
  baseURL: DEV_HOST,
  // 设置请求超时设置
  timeout: 10000,
  // 设置请求时的header
  header: {
    //  "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    //  "Content-Type": "application/json",
    hwh: "916879598@qq.com"
  },
  // 公用参数
  data: {
    // communityId: loc.get('propertyId')
  }
});

// POST传参序列化

instance.interceptors.request.use(
  config => {
    const token = Vue.ls.get(ACCESS_TOKEN);
    const user = Vue.ls.get(USER_INFO);
    // console.log(config)
    // console.log(token);
    // console.log(user);
    if (token) {
      config.headers['Authorization'] = token;
      config.data.communityId = user.propertyId;
    }
    if (config.method === "post") {
      // config.data = qs.stringify(config.data);
    }
    // config.headers['token'] = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMzg4ODg4ODg4OCIsImlzcyI6IkdlbnQuTmkiLCJleHAiOjE1NzQ1MDc1MjAsImlhdCI6MTU3NDUwMzkyMCwidG9rZW5JbmZvIjp7ImlkIjoiMSIsImNyZWF0ZVRpbWUiOm51bGwsInVwZGF0ZVRpbWUiOm51bGwsImRlbGV0ZVRpbWUiOm51bGwsInN0YXR1cyI6Ik5PUk1BTCIsInBhZ2VJbmRleCI6bnVsbCwicGFnZVNpemUiOm51bGwsIm5hbWUiOm51bGwsInBhc3N3b3JkIjoiYmI5NmRjOTllNGM0YmYxMzA3MmI1ZDAyNzlkOWI5MmYiLCJhZGRyZXNzIjpudWxsLCJpbWFnZUFkZHJlc3MiOm51bGwsImVudHJ5RGF0ZSI6bnVsbCwiY29tbXVuaXR5SWQiOiIxIiwidGVsZXBob25lIjoiMTM4ODg4ODg4ODgiLCJ0eXBlIjpudWxsLCJyb2xlTGlzdCI6W119fQ.qMx59kroVXTihdIaGdJIRlowQyFEI60g5SYAhoEkd5eqMyx-aPGF24LmZQzjNgrk5cqq3VBNP-xD23i1Gzrggw';
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 返回状态判断
instance.interceptors.response.use(
  res => {
    // console.log(res);
    if (res.data.httpCode === '998' || res.data.httpCode === '999') {
      store.dispatch('login', null)
      router.replace({
          path: '/user',
          // query: {redirect: router.currentRoute.fullPath}
      })
      return false;
      // console.log(1);
    } else {
      // return Promise.reject(res);
    }
    return res;
  },
  err => {
    // console.log(err);
    if (err == "Error: timeout of 5000ms exceeded") {
      //接口超时处理，设置了timeout: 5000,
      // Toast("接口超时:5000ms");
    }
    if (err.response) {
      console.log(err.response);
    }
    // if (err && err.response) {
    //     console.log(err)
    //     console.log(err.config)
    // }
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = "请求错误";
          break;

        case 401:
          err.message = "未授权，请登录";
          break;

        case 403:
          err.message = "拒绝访问";
          break;

        case 404:
          err.message = `请求地址出错: ${err.response.config.url}`;
          break;

        case 408:
          err.message = "请求超时";
          break;

        case 500:
          err.message = "服务器内部错误";
          break;

        case 501:
          err.message = "服务未实现";
          break;

        case 502:
          err.message = "网关错误";
          break;

        case 503:
          err.message = "服务不可用";
          break;

        case 504:
          err.message = "网关超时";
          break;

        case 505:
          err.message = "HTTP版本不受支持";
          break;

        default:
      }
    }
    return Promise.reject(err);
  }
);

export default options => {
  return new Promise((resolve, reject) => {
    instance(options)
      .then(
        response => {
          // console.log(response);
          // console.log(response.data);
          resolve(response.data);
        },
        err => {
          reject(err);
        }
      )
      .catch(error => {
        reject(error);
      });
  });
};
