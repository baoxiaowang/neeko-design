import { createApp } from 'vue';
// import RenderWidget from '@/widgets/render/render-widget.vue';
// import WidgetMaker from '@/components/design/widget-mark/index.vue';
// import MessagePipe from './message/message';
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import PreviewApp from './PreviewApp.vue';

const preApp = createApp(PreviewApp);
// preApp.use(ElementPlus, { size: 'default', zIndex: 3000 })
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   preApp.component(key, component)
// }
// preApp.component('render-widget', RenderWidget)
// preApp.config.compilerOptions.isCustomElement = tag => tag.includes('-')
preApp.use(ArcoVue, {});
preApp.use(ArcoVueIcon);
preApp.mount('#app');
