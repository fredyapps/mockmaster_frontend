import { createApp } from 'vue'
import App from './App.vue'
import router from './router'



const app = createApp(App)

app.config.globalProperties.api_url = 'https://tmmbackend.herokuapp.com';

//app.config.globalProperties.api_url = 'http://localhost:9000';

app.use(router)

app.mount('#app')
