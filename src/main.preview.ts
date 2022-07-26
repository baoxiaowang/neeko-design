import { createApp } from 'vue';
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
import ElScrollbar from '@/components/scrollbar';

const preApp = createApp(PreviewApp);
preApp.component('ElScrollbar', ElScrollbar);
preApp.use(ArcoVue, {});
preApp.use(ArcoVueIcon);
preApp.mount('#pre_app');
