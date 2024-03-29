import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { URL_BACKEND as URL } from "./views/constant/url";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;

Vue.prototype.$backUrl = function (api) {
    return URL + api;
};

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
