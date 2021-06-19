import Vue from "vue";
import App from "./App.vue";
import firebase from "@/plugins/firebase";

Vue.config.productionTip = false;

new Vue({
  firebase,
  render: (h) => h(App),
}).$mount("#app");
