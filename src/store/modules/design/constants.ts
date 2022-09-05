import { Widget } from '@/widgets/types';
import { styleObjToCode } from '@/widgets/utils';
import widgetConfig from '@/widgets/config.index';
import { ToolWidgetGroupItem } from './types';

// const temp1 = [
//   {
//     type: 'root',
//     key: 'root',
//     codeStyle:
//       '{\n\tmin-height:100vh;\n\tbackground:#f2f3f5;\n\toverflow: hidden;\n}',
//     children: [
//       {
//         type: 'container',
//         key: 'container_yZkb',
//         codeStyle:
//           '{\n  width: 100%;\n  min-height: 200px;\n  position: relative;\n  display: flex;\n  align-items: center;\n  background-image: url(https://img.alicdn.com/tfs/TB1rHgL4QY2gK0jSZFgXXc5OFXa-2360-400.png);\n  background-repeat: no-repeat; \n  background-size: cover;\n  background-position: right;\n  margin-bottom: 12px;\n  border-radius: 8px\n}',
//         config: {},
//         children: [
//           {
//             type: 'text',
//             key: 'text_4laq',
//             config: { text: '资产管理' },
//             codeStyle:
//               '{\n  position: absolute;\n  width: 40%;\n  font-size: 40px;\n  line-height: 56px;\n  color: #ffffff;\n  text-overflow: -o-ellipsis-lastline;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  line-clamp: 2;\n  -webkit-box-orient: vertical;\n  margin: 16px;\n}',
//           },
//         ],
//       },
//       {
//         type: 'row',
//         key: 'row_t55b',
//         title: '行块',
//         codeStyle:
//           '{\n  justify-content: space-between;\n  margin-bottom: 10px;\n}',
//         config: {},
//         children: [
//           {
//             type: 'container',
//             key: 'container_BoUD',
//             codeStyle:
//               '{\n  width: calc(33.3% - 7px);\n  background: #FFF;\n  height: 116px;\n  padding: 20px;\n  box-sizing: border-box;\n}',
//             config: {},
//             children: [
//               {
//                 type: 'row',
//                 key: 'row_uViZ',
//                 title: '行块',
//                 codeStyle: '{\n  align-items: center;\n}',
//                 config: {},
//                 children: [
//                   {
//                     type: 'column',
//                     key: 'column_np1b',
//                     title: '列块',
//                     codeStyle:
//                       '{\n  height: 100%;\n  justify-content: space-between;\n}',
//                     config: {},
//                     children: [
//                       {
//                         type: 'text',
//                         key: 'text_AiK1',
//                         config: { text: '待我处理' },
//                         codeStyle: '',
//                       },
//                       {
//                         type: 'text',
//                         key: 'text_KycD',
//                         config: { text: '21' },
//                         codeStyle:
//                           '{\n  font-size: 32px;\n  color: #1f3858;\n  line-height: 42px;\n}',
//                       },
//                     ],
//                   },
//                   {
//                     type: 'image',
//                     key: 'image_1wGf',
//                     title: '图片',
//                     codeStyle: '{\n  height: 48px;\n  width: 48px;\n}',
//                     config: {
//                       url: 'https://img.alicdn.com/tfs/TB1H9UJ4FT7gK0jSZFpXXaTkpXa-200-200.png',
//                     },
//                   },
//                 ],
//               },
//             ],
//           },
//           {
//             type: 'container',
//             key: 'container_oAR0',
//             codeStyle:
//               '{\n  width: calc(33.3% - 7px);\n  background: #FFF;\n  height: 116px;\n  padding: 20px;\n  box-sizing: border-box;\n}',
//             config: {},
//             children: [
//               {
//                 type: 'row',
//                 key: 'row_b9wc',
//                 title: '行块',
//                 codeStyle: '{\n  align-items: center;\n}',
//                 config: {},
//                 children: [
//                   {
//                     type: 'column',
//                     key: 'column_QVJL',
//                     title: '列块',
//                     codeStyle:
//                       '{\n  height: 100%;\n  justify-content: space-between;\n}',
//                     config: {},
//                     children: [
//                       {
//                         type: 'text',
//                         key: 'text_QyDU',
//                         config: { text: '我创建的' },
//                         codeStyle: '',
//                       },
//                       {
//                         type: 'text',
//                         key: 'text_gdQh',
//                         config: { text: '16' },
//                         codeStyle:
//                           '{\n  font-size: 32px;\n  color: #1f3858;\n  line-height: 42px;\n}',
//                       },
//                     ],
//                   },
//                   {
//                     type: 'image',
//                     key: 'image_2Fr4',
//                     title: '图片',
//                     codeStyle: '{\n  height: 48px;\n  width: 48px;\n}',
//                     config: {
//                       url: 'https://img.alicdn.com/tfs/TB1cN.y4QL0gK0jSZFtXXXQCXXa-200-200.png',
//                     },
//                   },
//                 ],
//               },
//             ],
//           },
//           {
//             type: 'container',
//             key: 'container_rSzj',
//             codeStyle:
//               '{\n  width: calc(33.3% - 7px);\n  background: #FFF;\n  height: 116px;\n  padding: 20px;\n  box-sizing: border-box;\n}',
//             config: {},
//             children: [
//               {
//                 type: 'row',
//                 key: 'row_oHSn',
//                 title: '行块',
//                 codeStyle: '{\n  align-items: center;\n}',
//                 config: {},
//                 children: [
//                   {
//                     type: 'column',
//                     key: 'column_zRmL',
//                     title: '列块',
//                     codeStyle:
//                       '{\n  height: 100%;\n  justify-content: space-between;\n}',
//                     config: {},
//                     children: [
//                       {
//                         type: 'text',
//                         key: 'text_fd79',
//                         config: { text: '转发给我' },
//                         codeStyle: '{\n  font-size: 14px;\n}',
//                       },
//                       {
//                         type: 'text',
//                         key: 'text_twCc',
//                         config: { text: '12' },
//                         codeStyle:
//                           '{\n  font-size: 32px;\n  color: #1f3858;\n  line-height: 42px;\n}',
//                       },
//                     ],
//                   },
//                   {
//                     type: 'image',
//                     key: 'image_TAGT',
//                     title: '图片',
//                     codeStyle: '{\n  height: 48px;\n  width: 48px;\n}',
//                     config: {
//                       url: 'https://img.alicdn.com/tfs/TB1yy3K4UY1gK0jSZFMXXaWcVXa-200-200.png',
//                     },
//                   },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//       {
//         type: 'row',
//         key: 'row_6xVL',
//         title: '行块',
//         codeStyle:
//           '{\n  justify-content: space-between;\n  margin-bottom: 10px;\n}',
//         config: {},
//         children: [
//           {
//             type: 'column',
//             key: 'column_0gX3',
//             title: '列块',
//             codeStyle: '{\n  width: calc(33.3% - 7px);\n  background: #fff;\n}',
//             config: {},
//             children: [
//               {
//                 type: 'container',
//                 key: 'container_N0p6',
//                 codeStyle:
//                   '{\n  height: 45px;\n  color: #171a1d;\n  font-size: 18px;\n  font-weight: 700;\n  line-height: 45px;\n  padding-left: 20px;\n  border-bottom: 1px solid #eee;\n}',
//                 config: {},
//                 children: [
//                   {
//                     type: 'text',
//                     key: 'text_Gy1Y',
//                     config: { text: '采购管理' },
//                     codeStyle: '',
//                   },
//                 ],
//               },
//               {
//                 type: 'row',
//                 key: 'row_8beY',
//                 title: '行块',
//                 codeStyle:
//                   '{\n  padding: 24px;\n  width: 100%;\n  box-sizing: border-box;\n  flex-wrap: wrap;\n  padding-bottom: 10px;\n}',
//                 config: {},
//                 children: [
//                   {
//                     type: 'column',
//                     key: 'column_kJK8',
//                     title: '列块',
//                     codeStyle:
//                       '{\n  width: 33.3%;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 18px;\n}',
//                     config: {},
//                     children: [
//                       {
//                         type: 'image',
//                         key: 'image_Wd0Z',
//                         title: '图片',
//                         codeStyle:
//                           '{\n  height: 32px;\n  width: 32px;\n  margin-bottom: 12px;\n}',
//                         config: {
//                           url: 'https://img.alicdn.com/tfs/TB1SAJyq5pE_u4jSZKbXXbCUVXa-200-200.png',
//                         },
//                       },
//                       {
//                         type: 'text',
//                         key: 'text_BJ3t',
//                         config: { text: '采购申请' },
//                         codeStyle:
//                           '{\n  color: #1f3858;\n  text-align: center;\n  font-size: 12px;\n}',
//                       },
//                     ],
//                   },
//                   {
//                     type: 'column',
//                     key: 'column_hezP',
//                     title: '列块',
//                     codeStyle:
//                       '{\n  width: 33.3%;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 18px;\n}',
//                     config: {},
//                     children: [
//                       {
//                         type: 'image',
//                         key: 'image_THxj',
//                         title: '图片',
//                         codeStyle: '{\n  height: 32px;\n  width: 32px;\n}',
//                         config: {
//                           url: 'https://img.alicdn.com/tfs/TB1WBB9qmslXu8jSZFuXXXg7FXa-200-200.png',
//                         },
//                       },
//                       {
//                         type: 'text',
//                         key: 'text_DyYZ',
//                         config: { text: '采购合同' },
//                         codeStyle:
//                           '{\n  color: #1f3858;\n  text-align: center;\n  font-size: 12px;\n}',
//                       },
//                     ],
//                   },
//                   {
//                     type: 'column',
//                     key: 'column_VSZq',
//                     title: '列块',
//                     codeStyle:
//                       '{\n  width: 33.3%;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 18px;\n}',
//                     config: {},
//                     children: [
//                       {
//                         type: 'image',
//                         key: 'image_ssYA',
//                         title: '图片',
//                         codeStyle: '{\n  height: 32px;\n  width: 32px;\n}',
//                         config: {
//                           url: 'https://img.alicdn.com/tfs/TB1Qy73ulBh1e4jSZFhXXcC9VXa-200-200.png',
//                         },
//                       },
//                       {
//                         type: 'text',
//                         key: 'text_E8CY',
//                         config: { text: '采购订单' },
//                         codeStyle:
//                           '{\n  color: #1f3858;\n  text-align: center;\n  font-size: 12px;\n}',
//                       },
//                     ],
//                   },
//                   {
//                     type: 'column',
//                     key: 'column_mGWR',
//                     title: '列块',
//                     codeStyle:
//                       '{\n  width: 33.3%;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 18px;\n}',
//                     config: {},
//                     children: [
//                       {
//                         type: 'image',
//                         key: 'image_Ec8A',
//                         title: '图片',
//                         codeStyle:
//                           '{\n  height: 32px;\n  width: 32px;\n  margin-bottom: 12px;\n}',
//                         config: {
//                           url: 'https://img.alicdn.com/tfs/TB18jjzqiDsXe8jSZR0XXXK6FXa-200-200.png',
//                         },
//                       },
//                       {
//                         type: 'text',
//                         key: 'text_YGP5',
//                         config: { text: '到票登记' },
//                         codeStyle:
//                           '{\n  color: #1f3858;\n  text-align: center;\n  font-size: 12px;\n}',
//                       },
//                     ],
//                   },
//                   {
//                     type: 'column',
//                     key: 'column_RxZw',
//                     title: '列块',
//                     codeStyle:
//                       '{\n  width: 33.3%;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 18px;\n}',
//                     config: {},
//                     children: [
//                       {
//                         type: 'image',
//                         key: 'image_9KCw',
//                         title: '图片',
//                         codeStyle: '{\n  height: 32px;\n  width: 32px;\n}',
//                         config: {
//                           url: 'https://img.alicdn.com/tfs/TB14lB9qmslXu8jSZFuXXXg7FXa-200-200.png',
//                         },
//                       },
//                       {
//                         type: 'text',
//                         key: 'text_u3TO',
//                         config: { text: '付款申请' },
//                         codeStyle:
//                           '{\n  color: #1f3858;\n  text-align: center;\n  font-size: 12px;\n}',
//                       },
//                     ],
//                   },
//                   {
//                     type: 'column',
//                     key: 'column_BZs4',
//                     title: '列块',
//                     codeStyle:
//                       '{\n  width: 33.3%;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 18px;\n}',
//                     config: {},
//                     children: [
//                       {
//                         type: 'image',
//                         key: 'image_UjBq',
//                         title: '图片',
//                         codeStyle: '{\n  height: 32px;\n  width: 32px;\n}',
//                         config: {
//                           url: 'https://img.alicdn.com/tfs/TB12gwH4KH2gK0jSZJnXXaT1FXa-200-200.png',
//                         },
//                       },
//                       {
//                         type: 'text',
//                         key: 'text_ZURS',
//                         config: { text: '付款单据' },
//                         codeStyle:
//                           '{\n  color: #1f3858;\n  text-align: center;\n  font-size: 12px;\n}',
//                       },
//                     ],
//                   },
//                 ],
//               },
//             ],
//           },
//           {
//             type: 'column',
//             key: 'column_hQyj',
//             title: '列块',
//             codeStyle:
//               '{\n  width: calc(33.3% - 7px);\n  background: #fff;\n  height: max-content;\n}',
//             config: {},
//             children: [
//               {
//                 type: 'container',
//                 key: 'container_zeMD',
//                 codeStyle:
//                   '{\n  height: 45px;\n  font-size: 18px;\n  font-weight: 700;\n  line-height: 45px;\n  padding-left: 20px;\n  border-bottom: 1px solid #eee;\n}',
//                 config: {},
//                 children: [
//                   {
//                     type: 'text',
//                     key: 'text_Xakv',
//                     config: { text: '库存管理' },
//                     codeStyle: '',
//                   },
//                 ],
//               },
//               {
//                 type: 'row',
//                 key: 'row_wRxM',
//                 title: '行块',
//                 codeStyle:
//                   '{\n  padding: 24px;\n  width: 100%;\n  box-sizing: border-box;\n  flex-wrap: wrap;\n  padding-bottom: 10px;\n}',
//                 config: {},
//                 children: [
//                   {
//                     type: 'column',
//                     key: 'column_5nfq',
//                     title: '列块',
//                     codeStyle:
//                       '{\n  width: 33.3%;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 18px;\n}',
//                     config: {},
//                     children: [
//                       {
//                         type: 'image',
//                         key: 'image_73Oq',
//                         title: '图片',
//                         codeStyle:
//                           '{\n  height: 32px;\n  width: 32px;\n  margin-bottom: 12px;\n}',
//                         config: {
//                           url: 'https://img.alicdn.com/tfs/TB1X5d5rMgP7K4jSZFqXXamhVXa-200-200.png',
//                         },
//                       },
//                       {
//                         type: 'text',
//                         key: 'text_C26a',
//                         config: { text: '采购入库' },
//                         codeStyle:
//                           '{\n  color: #1f3858;\n  text-align: center;\n  font-size: 12px;\n}',
//                       },
//                     ],
//                   },
//                   {
//                     type: 'column',
//                     key: 'column_L3Bt',
//                     title: '列块',
//                     codeStyle:
//                       '{\n  width: 33.3%;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 18px;\n}',
//                     config: {},
//                     children: [
//                       {
//                         type: 'image',
//                         key: 'image_RrZo',
//                         title: '图片',
//                         codeStyle: '{\n  height: 32px;\n  width: 32px;\n}',
//                         config: {
//                           url: 'https://img.alicdn.com/tfs/TB1ncAW4KL2gK0jSZFmXXc7iXXa-200-200.png',
//                         },
//                       },
//                       {
//                         type: 'text',
//                         key: 'text_7R0m',
//                         config: { text: '入库检验' },
//                         codeStyle:
//                           '{\n  color: #1f3858;\n  text-align: center;\n  font-size: 12px;\n}',
//                       },
//                     ],
//                   },
//                   {
//                     type: 'column',
//                     key: 'column_obb3',
//                     title: '列块',
//                     codeStyle:
//                       '{\n  width: 33.3%;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 18px;\n}',
//                     config: {},
//                     children: [
//                       {
//                         type: 'image',
//                         key: 'image_gRak',
//                         title: '图片',
//                         codeStyle: '{\n  height: 32px;\n  width: 32px;\n}',
//                         config: {
//                           url: 'https://img.alicdn.com/tfs/TB1LuAzrPMZ7e4jSZFOXXX7epXa-200-200.png',
//                         },
//                       },
//                       {
//                         type: 'text',
//                         key: 'text_2Rur',
//                         config: { text: '生产领用' },
//                         codeStyle:
//                           '{\n  color: #1f3858;\n  text-align: center;\n  font-size: 12px;\n}',
//                       },
//                     ],
//                   },
//                 ],
//               },
//             ],
//           },
//           {
//             type: 'column',
//             key: 'column_2E9n',
//             title: '列块',
//             codeStyle:
//               '{\n  width: calc(33.3% - 7px);\n  background: #fff;\n  height: max-content;\n}',
//             config: {},
//             children: [
//               {
//                 type: 'container',
//                 key: 'container_kQwb',
//                 codeStyle:
//                   '{\n  height: 45px;\n  font-size: 18px;\n  font-weight: 700;\n  line-height: 45px;\n  padding-left: 20px;\n  border-bottom: 1px solid #eee;\n}',
//                 config: {},
//                 children: [
//                   {
//                     type: 'text',
//                     key: 'text_ht8F',
//                     config: { text: '财务管理' },
//                     codeStyle: '',
//                   },
//                 ],
//               },
//               {
//                 type: 'row',
//                 key: 'row_r3iB',
//                 title: '行块',
//                 codeStyle:
//                   '{\n  padding: 24px;\n  width: 100%;\n  box-sizing: border-box;\n  flex-wrap: wrap;\n  padding-bottom: 10px;\n}',
//                 config: {},
//                 children: [
//                   {
//                     type: 'column',
//                     key: 'column_BY7R',
//                     title: '列块',
//                     codeStyle:
//                       '{\n  width: 33.3%;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 18px;\n}',
//                     config: {},
//                     children: [
//                       {
//                         type: 'image',
//                         key: 'image_m8q7',
//                         title: '图片',
//                         codeStyle:
//                           '{\n  height: 32px;\n  width: 32px;\n  margin-bottom: 12px;\n}',
//                         config: {
//                           url: 'https://img.alicdn.com/tfs/TB14aAW4Rr0gK0jSZFnXXbRRXXa-200-200.png',
//                         },
//                       },
//                       {
//                         type: 'text',
//                         key: 'text_GHRf',
//                         config: { text: '库存档案' },
//                         codeStyle:
//                           '{\n  color: #1f3858;\n  text-align: center;\n  font-size: 12px;\n}',
//                       },
//                     ],
//                   },
//                   {
//                     type: 'column',
//                     key: 'column_TgzF',
//                     title: '列块',
//                     codeStyle:
//                       '{\n  width: 33.3%;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 18px;\n}',
//                     config: {},
//                     children: [
//                       {
//                         type: 'image',
//                         key: 'image_bNqX',
//                         title: '图片',
//                         codeStyle: '{\n  height: 32px;\n  width: 32px;\n}',
//                         config: {
//                           url: 'https://img.alicdn.com/tfs/TB1aN.y4QL0gK0jSZFtXXXQCXXa-200-200.png',
//                         },
//                       },
//                       {
//                         type: 'text',
//                         key: 'text_48Me',
//                         config: { text: '货品资料' },
//                         codeStyle:
//                           '{\n  color: #1f3858;\n  text-align: center;\n  font-size: 12px;\n}',
//                       },
//                     ],
//                   },
//                   {
//                     type: 'column',
//                     key: 'column_Oi7y',
//                     title: '列块',
//                     codeStyle:
//                       '{\n  width: 33.3%;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 18px;\n}',
//                     config: {},
//                     children: [
//                       {
//                         type: 'image',
//                         key: 'image_jeac',
//                         title: '图片',
//                         codeStyle: '{\n  height: 32px;\n  width: 32px;\n}',
//                         config: {
//                           url: 'https://img.alicdn.com/tfs/TB12GAW4Rr0gK0jSZFnXXbRRXXa-200-200.png',
//                         },
//                       },
//                       {
//                         type: 'text',
//                         key: 'text_BhzE',
//                         config: { text: '供应商' },
//                         codeStyle:
//                           '{\n  color: #1f3858;\n  text-align: center;\n  font-size: 12px;\n}',
//                       },
//                     ],
//                   },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
// ];

export const toolWidgetGroupMap = {
  form: [
    {
      label: '基础字段',
      list: [
        widgetConfig.input,
        widgetConfig.textarea,
        widgetConfig['input-number'],
        widgetConfig['date-picker'],
        widgetConfig['radio-group'],
        widgetConfig['checkbox-group'],
        widgetConfig.select,
        widgetConfig['select-group'],
        widgetConfig.rate,
        widgetConfig.divider,
      ],
    },
    {
      label: '高级字段',
      list: [
        widgetConfig.address,
        widgetConfig.location,
        widgetConfig['image-upload'],
        widgetConfig['file-upload'],
        widgetConfig.subform,
      ],
    },
    // {
    //   label: '高级字段',
    //   list: [
    //     widgetConfig.address,
    //     widgetConfig.location,
    //     widgetConfig['image-upload'],
    //     widgetConfig['file-upload'],
    //   ],
    // },
    // {
    //   label: '组织架构',
    //   list: [],
    // },
  ] as ToolWidgetGroupItem[],
  page: [
    {
      label: '布局组件',
      list: [widgetConfig.container, widgetConfig.row, widgetConfig.column],
    },
    {
      label: '数据展示',
      list: [widgetConfig.image, widgetConfig.text],
    },
  ] as ToolWidgetGroupItem[],
};

export function createFormData(): Widget[] {
  return [
    {
      type: 'form',
      key: 'form',
      codeStyle: styleObjToCode({
        minHeight: '100%',
      }),
      children: [],
    },
  ];
}
export function createCustomePage(): Widget[] {
  // return temp1 as Widget[];
  return [
    {
      type: 'root',
      key: 'root',
      codeStyle: styleObjToCode({
        minHeight: '100vh',
        background: '#f2f3f5',
      }),
      children: [],
    },
  ];
}
