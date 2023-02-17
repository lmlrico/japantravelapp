import { createApp } from 'vue'
import store from './store'
import router from './router'
import './index.css'
import App from './App.vue'
import VueGoogleMaps from '@fawmi/vue-google-maps'
createApp(App)
    .use(router)
    .use(store)
    .use(VueGoogleMaps, {
        load: {
            key: '***REMOVED***',
            libraries: "places"
        },
    })
    .mount('#app')
