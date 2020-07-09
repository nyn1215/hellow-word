<template>
  <div class="main">
    <a-form
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
      :form="form"
      @submit="handleSubmit"
    >
      <a-form-item>
        <a-input
          size="large"
          type="text"
          placeholder="请输入账号"
          v-decorator="[
                'telephone',
                {rules: [{ required: true, message: '请输入账号' }], validateTrigger: 'change'}
              ]"
        >
          <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input
          size="large"
          type="password"
          autocomplete="false"
          placeholder="请输入密码"
          v-decorator="[
                'password',
                {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}
              ]"
        >
          <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-checkbox v-decorator="['rememberMe']">记住账号</a-checkbox>
        <!--<router-link
          :to="{ name: 'register', params: { user: 'aaa'} }"
          class="forge-password"
          style="float: right;"
        >注册账户</router-link>-->
      </a-form-item>

      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="loginBtn"
          :disabled="loginBtn"
        >登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { login,queryMenu } from "@/api";
// import menuList from "@/common/js/menuList";
export default {
  components: {},
  data() {
    return {
      loginBtn: false,
      form: this.$form.createForm(this)
    };
  },
  created() {
    const user = this.$ls.get("ACCOUNT");
    if (user) {
      this.$nextTick(() => {
        this.form.setFieldsValue({
          telephone: user.account,
          // password: user.password
        });
      });
    }
  },
  methods: {
    ...mapActions(["login", "logout", "setInfo"]),
    // handler
    async handleLogin(form) {
      const { result, httpCode, message } = await login(form);

      if (httpCode === 200) {
        this.login(result.token);
        let that = this
        queryMenu({}).then((res)=>{
          that.setInfo({ 
            name: result.propertyName,
            avatar: result.propertyHeadUrl,
            propertyId: result.propertyId,
            staffId: result.staffId,
            menuList: res.result
          });
        })
        // this.setInfo({ 
          // name: result.propertyName,
          // avatar: result.propertyHeadUrl,
          // propertyId: result.propertyId,
          // staffId: result.staffId,
          // menuList: result.functionList
          // menuList: result.functionList
        // });
        // console.log(JSON.stringify(result.functionList))
        if (form.rememberMe) {
          this.$ls.set("ACCOUNT", {
            account: form.telephone,
            // password: form.password
          });
        }
        this.$notification.success({
          message: "提示",
          description: "登录成功!"
        });
        setTimeout(() => {
          this.$router.replace("/");
        }, 500);
      } else {
        this.$notification.error({
          message: "提示",
          description: message
        });
      }
      setTimeout(() => {
        this.loginBtn = false;
      }, 1000);
    },

    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          // console.log(values);
          this.loginBtn = true;
          this.handleLogin(values);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
