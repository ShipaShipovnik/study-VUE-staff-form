import "./assets/main.css";
import "./assets/base.css";
import "v-calendar/style.css";

import { createApp } from "vue";
import App from "./App.vue";
import VCalendar from "v-calendar";

const app = createApp(App);
app.use(VCalendar, {
  // Дополнительные опции, если необходимо
});

app.mount("#app");
