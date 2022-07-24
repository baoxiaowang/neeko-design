import { createApp } from 'vue';
// import RenderWidget from '@/widgets/render/render-widget.vue';
// import WidgetMaker from '@/components/design/widget-mark/index.vue';
// import MessagePipe from './message/message';
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import PreviewApp from '@/AppPreview.vue';
import '@arco-design/web-vue/dist/arco.css';
import '@/assets/style/global.less';
import '@/api/interceptor';
// import '@arco-design/web-vue/dist/arco.less';
import '@arco-themes/vue-neeko/index.less';
// eslint-disable-next-line import/no-unresolved
import 'virtual:svg-icons-register';
import '@arco-design/web-vue/dist/arco.less';

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
