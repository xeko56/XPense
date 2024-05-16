import './assets/output.css'

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { BiTrashFill } from "oh-vue-icons/icons";
import { createApp } from 'vue'
import App from './App.vue'

addIcons(BiTrashFill);
const app = createApp(App);
app.component("v-icon", OhVueIcon);

app.mount('#app')
