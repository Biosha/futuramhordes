import { createApp } from "vue";
import { createPinia } from "pinia";
import { plugin as VueTippy } from "vue-tippy";
import "tippy.js/dist/tippy.css"; // optional for styling
import "tippy.js/themes/translucent.css";
import { mixin } from "./mixin/mixin";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";


import App from "./App.vue";
import router from "./router";

import "./assets/main.css";


const vueTippyProps = {
  directive: "tippy",
  component: "Tippy",
  defaultProps: {
    placement: "bottom-start",
    followCursor: true,
    allowHTML: true,
    inlinePositioning: true,
    duration: [50, 50],
    hideOnClick: false,
    theme: "translucent",
  },
};

const app = createApp(App);

app.use(createPinia().use(piniaPluginPersistedstate));
app.use(router);
app.use(VueTippy, vueTippyProps);
app.mixin(mixin);
console.log("ok");

app.mount("#app");
