import {createApp} from 'vue'
import App from './App.vue'
import components from '@/components/UI'
import router from "@/router/router";
import Toaster from "@meforma/vue-toaster";

const app = createApp(App)

components.forEach(
  component => {
    app.component(component.name, component)
  }
)

app.use(Toaster).use(router)


window.onerror = function (message, source, lineno, colno, error) {
  app.$toast.error(message);
  console.log(message, source, lineno, colno, error)
}

app.config.errorHandler = function (err, vm, info) {
  app.$toast.error(err.message);
  console.log(err, vm, info)
}
app.mount('#app')
