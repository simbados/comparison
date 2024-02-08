import './assets/main.css'

import { createApp, onBeforeMount, onBeforeUnmount } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.directive('click-outside', (el, binding) => {
  onBeforeMount(() => {
    el.clickOutsideEvent = (event: Event) => {
      if (!(event.target === el || el.contains(event.target))) {
        binding.value();
      }
    }
    document.addEventListener('click', el.clickOutsideEvent);
  });
  onBeforeUnmount(() => {
    document.removeEventListener('click', el.clickOutsideEvent);
  });
});

app.mount('#app')
