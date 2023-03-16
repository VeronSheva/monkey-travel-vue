import {createApp} from 'vue'
import App from './App.vue'
import components from '@/components/UI'
import router from "@/router/router";
import Toaster from "@meforma/vue-toaster";
import InvalidData from "@/Exception/InvalidData";
import Unauthorized from "@/Exception/Unauthorized";

const app = createApp(App)

components.forEach(
  component => {
    app.component(component.name, component)
  }
)

app.use(Toaster).use(router)

app.config.unwrapInjectedRef = true

window.onerror = function (message, source, lineno, colno, error) {
  app.$toast.error(message);
}

window.addEventListener('unhandledrejection', function (event) {
  router.push('/login')
  app.$toast.error(event.reason);
});

app.config.errorHandler = function (err, vm, info) {
  if (err instanceof InvalidData) {
    if (vm["$data"]['errors']) {
      vm["$data"]['errors'] = err.errorFields
    } else {
      console.log(err.errorFields)
      vm['updateErrors'](err.errorFields)
    }
    vm['loading'] = false
  } else if (err instanceof Unauthorized) {
    app.$toast.error(err.message);
    app.$router.push('/login')
  } else {
    app.$toast.error(err.message);
  }
}
app.mount('#app')
