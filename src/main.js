import { createApp } from "vue";
import App from "./App.vue";
//imported packages
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

// import { library } from "@fortawesome/fontawesome-svg-core";
// import { faPhone } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
// import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
library.add(fas, far);
dom.watch();
import router from "./router";
createApp(App)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
