import { mergeConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import vueSetupExtend from 'vite-plugin-vue-setup-extend-plus';
import baseConfig from './vite.config.base';

export default mergeConfig(
  {
    mode: 'development',
    server: {
      host: '0.0.0.0', // 通过ip的形式访问
      port: 5050, // 端口号
      open: true,
      fs: {
        strict: true,
      },
    },
    plugins: [
      eslint({
        cache: false,
        include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
        exclude: ['node_modules'],
      }),
      vueSetupExtend(),
    ],
  },
  baseConfig
);
