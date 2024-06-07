import { createApp } from "vue";
import { Quasar, Notify } from "quasar";
import quasarLang from "quasar/lang/pl";
import quasarIconSet from "quasar/icon-set/svg-fontawesome-v6";
import { router } from "./router/index";

import "@quasar/extras/roboto-font/roboto-font.css";
import "@quasar/extras/material-icons/material-icons.css";

import "quasar/src/css/index.sass";

import App from "./App.vue";

const myApp = createApp(App);

myApp.use(router);
myApp.use(Quasar, {
  plugins: {
    Notify,
  }, // import Quasar plugins and add here
  lang: quasarLang,
  iconSet: quasarIconSet,
});
// Assumes you have a <div id="app"></div> in your index.html
myApp.mount("#app");
