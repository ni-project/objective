import { createApp } from 'vue'
import App from '@/App.vue'
import AppStylesCommon from '@/assets/styles/app.scss'

const app = createApp(App);

app.use(AppStylesCommon);
app.mount('#app');
