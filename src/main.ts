import { createApp } from 'vue';
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import globalComponents from '@/components';
import SvgIcon from '@/components/svg-icon/index.vue';
import Sortable from 'sortablejs';
import router from './router';
import store from './store';
import i18n from './locale';
import directive from './directive';
import './mock';
import App from './App.vue';
import '@arco-design/web-vue/dist/arco.css';
import '@/assets/style/global.less';
import '@/api/interceptor';
// import '@arco-design/web-vue/dist/arco.less';
import '@arco-themes/vue-neeko/index.less';
// eslint-disable-next-line import/no-unresolved
import 'virtual:svg-icons-register';
import 'src/assets/icon-font/iconfont.css';

//

(window as any).Sortable = Sortable; // 注入同一个Sortable 函数
// const IconFont = Icon.addFromIconFontCn({
//   src: 'src/assets/icon-font/iconfont.js',
// });

const app = createApp(App);
app.component('SvgIcon', SvgIcon);
app.use(ArcoVue, {});
app.use(ArcoVueIcon);
// app.component('IconFont', IconFont);

app.use(router);
app.use(store);
app.use(i18n);
app.use(globalComponents);
app.use(directive);

app.mount('#app');
