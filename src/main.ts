import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { Icon } from "@iconify/vue";

import "./assets/main.css";
import { useConfetti } from "./composables/useConfetti";
const { init } = useConfetti();
init();

// prettier-ignore
createApp(App)
.use(router)
.component('Icon', Icon)
.mount('#app')
