import './style.css'

import { createApp } from 'vue'
import router from './router'
import App from './app.vue'

// Creates the app instance
const app = createApp(App)

// Use Vue Router
app.use(router)

// Create the app container DOM
const el = document.createElement('div')
el.classList.add('app')
document.body.appendChild(el)

// Mount app to the container DOM
app.mount(el)
