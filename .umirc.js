import { resolve } from 'path';

export default {
  alias: {
    'assets': resolve(__dirname, 'src/assets'),
    'components': resolve(__dirname, 'src/components'),
    'layouts': resolve(__dirname, 'src/layouts'),
    'utils': resolve(__dirname, 'src/utils'),
    'models': resolve(__dirname, 'src/models'),
    'services': resolve(__dirname, 'src/services'),
    'noform-components': resolve(__dirname, 'src/utils/noform'),
  },
  extraBabelPlugins: [
    ['wrapper', {}],
  ],
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: {
        hmr: true,
      },
      targets: {
        ie: 9,
      },
      dynamicImport: true,
      routes: {
        exclude: [/(.*)\/(assets|components|models|services)\/(.*)/],
      },
    }],
    ["babel-plugin-import", {
      libraryName: 'ant-design-pro',
      libraryDirectory: 'lib',
      style: true,
      camel2DashComponentName: false,
    }]
  ],
  hash: true,
  targets: {
    ie: 11,
  },
  ignoreMomentLocale: true,
}
